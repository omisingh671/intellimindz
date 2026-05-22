import { randomUUID } from "node:crypto";
import { z } from "zod";
import {
  DonationInterestStatus,
  CoursePriceType,
  PaymentMode,
  PaymentPurpose,
  PaymentStatus,
  Prisma,
  TaxMode,
  type Course,
  type Coupon,
  type PrismaClient,
} from "@/generated/prisma";
import { prisma } from "@/server/db/prisma";

type TransactionClient = Parameters<
  Parameters<PrismaClient["$transaction"]>[0]
>[0];

const payerSchema = z.object({
  payerName: z.string().trim().min(2),
  payerEmail: z.string().trim().email(),
  payerMobile: z.string().trim().max(20).optional(),
});

const installmentSchema = z.object({
  amountMinor: z.number().int().positive(),
  dueAt: z.string().trim().min(1),
});

const donationPlaceholderSchema = z.object({
  purpose: z.literal("DONATION"),
  amount: z.string().trim().min(1),
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.string().trim().email(),
  mobile: z.string().trim().max(20).optional(),
});

const coursePlaceholderSchema = payerSchema.extend({
  purpose: z.literal("COURSE"),
  mode: z.enum(["FULL", "EMI", "FLEXIBLE"]),
  courseId: z.string().trim().min(1),
  couponId: z.string().trim().min(1).optional(),
  paymentGroupId: z.string().trim().min(1).optional(),
  amountMinor: z.number().int().positive().optional(),
  totalAmountMinor: z.number().int().positive().optional(),
  installments: z.array(installmentSchema).optional(),
});

export const placeholderPaymentSchema = z.discriminatedUnion("purpose", [
  donationPlaceholderSchema,
  coursePlaceholderSchema,
]);

export type PlaceholderPaymentInput = z.infer<typeof placeholderPaymentSchema>;

export class PaymentInputError extends Error {
  status: number;

  constructor(message: string, status = 422) {
    super(message);
    this.name = "PaymentInputError";
    this.status = status;
  }
}

export async function createPlaceholderPayment(input: PlaceholderPaymentInput) {
  if (input.purpose === "DONATION") {
    return createDonationPlaceholderPayment(input);
  }

  return createCoursePlaceholderPayment(input);
}

export async function getPublicPaymentPlaceholder(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      course: {
        select: {
          feeLabel: true,
          id: true,
          slug: true,
          title: true,
        },
      },
      donationInterest: {
        select: {
          email: true,
          firstName: true,
          id: true,
          lastName: true,
        },
      },
    },
  });

  if (!payment) {
    return null;
  }

  return {
    amountMinor: payment.amountMinor,
    course: payment.course,
    currency: payment.currency,
    donationInterest: payment.donationInterest,
    gateway: payment.gateway,
    gatewayStatus: payment.gatewayStatus,
    id: payment.id,
    installmentNo: payment.installmentNo,
    mode: payment.mode,
    paidAt: payment.paidAt,
    payerEmail: payment.payerEmail,
    payerName: payment.payerName,
    paymentGroupId: payment.paymentGroupId,
    purpose: payment.purpose,
    status: payment.status,
    totalAmountMinor: payment.totalAmountMinor,
  };
}

export async function confirmPlaceholderPayment(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    select: {
      donationInterestId: true,
      id: true,
      status: true,
    },
  });

  if (!payment) {
    throw new PaymentInputError("Payment record was not found.", 404);
  }

  if (payment.status === PaymentStatus.PAID) {
    return getConfirmedPayment(payment.id);
  }

  if (payment.status !== PaymentStatus.PENDING) {
    throw new PaymentInputError("Only pending payments can be confirmed.", 409);
  }

  return prisma.$transaction(async (tx) => {
    const paidAt = new Date();
    const confirmedPayment = await tx.payment.update({
      data: {
        paidAt,
        status: PaymentStatus.PAID,
      },
      where: { id: payment.id },
      select: publicPaymentSelect,
    });

    if (payment.donationInterestId) {
      await tx.donationInterest.update({
        data: { status: DonationInterestStatus.CLOSED },
        where: { id: payment.donationInterestId },
      });
    }

    return {
      payment: confirmedPayment,
    };
  });
}

async function getConfirmedPayment(paymentId: string) {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    select: publicPaymentSelect,
  });

  if (!payment) {
    throw new PaymentInputError("Payment record was not found.", 404);
  }

  return { payment };
}

async function createDonationPlaceholderPayment(
  input: z.infer<typeof donationPlaceholderSchema>,
) {
  const amountMinor = parseRupeeAmountToPaise(input.amount);

  if (!amountMinor) {
    throw new PaymentInputError("Enter a valid donation amount.");
  }

  return prisma.$transaction(async (tx) => {
    const payerName = `${input.firstName} ${input.lastName}`.trim();
    const normalizedEmail = input.email.toLowerCase();
    const donationInterest = await tx.donationInterest.create({
      data: {
        amountMinor,
        email: normalizedEmail,
        firstName: input.firstName,
        lastName: input.lastName,
      },
      select: {
        id: true,
        status: true,
      },
    });

    const payment = await tx.payment.create({
      data: {
        amountMinor,
        currency: "INR",
        donationInterestId: donationInterest.id,
        metadata: {
          donationInterestId: donationInterest.id,
          source: "donation-placeholder",
        },
        mode: PaymentMode.FULL,
        payerEmail: normalizedEmail,
        payerMobile: input.mobile ?? null,
        payerName,
        paymentGroupId: randomUUID(),
        purpose: PaymentPurpose.DONATION,
        status: PaymentStatus.PENDING,
        totalAmountMinor: amountMinor,
      },
      select: publicPaymentSelect,
    });

    return {
      donationInterest,
      payment,
      payments: [payment],
    };
  });
}

async function createCoursePlaceholderPayment(
  input: z.infer<typeof coursePlaceholderSchema>,
) {
  const mode = input.mode as PaymentMode;

  return prisma.$transaction(async (tx) => {
    const course = await findCourseByIdOrSlug(tx, input.courseId);

    if (!course) {
      throw new PaymentInputError("Select a valid course.", 404);
    }

    const coupon = input.couponId
      ? await tx.coupon.findUnique({ where: { id: input.couponId } })
      : null;

    if (input.couponId && !coupon) {
      throw new PaymentInputError("Select a valid coupon.", 404);
    }

    if (mode === PaymentMode.EMI) {
      return createCourseEmiPayments(tx, input, course, coupon);
    }

    if (mode === PaymentMode.FLEXIBLE) {
      return createCourseFlexiblePayment(tx, input, course, coupon);
    }

    return createCourseFullPayment(tx, input, course, coupon);
  });
}

async function createCourseFullPayment(
  tx: TransactionClient,
  input: z.infer<typeof coursePlaceholderSchema>,
  course: Course,
  coupon: Coupon | null,
) {
  const amountMinor =
    input.amountMinor ?? (await resolveCoursePayableAmount(tx, course.id));

  const paymentGroupId = input.paymentGroupId ?? randomUUID();
  const payment = await createCoursePaymentRow(tx, {
    amountMinor,
    coupon,
    course,
    input,
    mode: PaymentMode.FULL,
    paymentGroupId,
    totalAmountMinor: amountMinor,
  });

  return {
    payment,
    paymentGroupId,
    payments: [payment],
  };
}

async function resolveCoursePayableAmount(
  tx: TransactionClient,
  courseId: string,
) {
  const now = new Date();
  const price = await tx.coursePrice.findFirst({
    orderBy: { createdAt: "desc" },
    where: {
      courseId,
      isActive: true,
      OR: [
        { validFrom: null, validUntil: null },
        { validFrom: { lte: now }, validUntil: null },
        { validFrom: null, validUntil: { gte: now } },
        { validFrom: { lte: now }, validUntil: { gte: now } },
      ],
    },
  });

  if (!price || price.priceType === CoursePriceType.CONTACT) {
    throw new PaymentInputError("Course payment amount is not configured.");
  }

  if (price.priceType === CoursePriceType.FREE) {
    return 0;
  }

  if (!price.baseAmountMinor || price.baseAmountMinor <= 0) {
    throw new PaymentInputError("Course payment amount is not configured.");
  }

  if (
    price.taxMode === TaxMode.GST_EXCLUSIVE &&
    price.gstRateBps &&
    price.gstRateBps > 0
  ) {
    return Math.round(
      price.baseAmountMinor + (price.baseAmountMinor * price.gstRateBps) / 10000,
    );
  }

  return price.baseAmountMinor;
}

async function createCourseEmiPayments(
  tx: TransactionClient,
  input: z.infer<typeof coursePlaceholderSchema>,
  course: Course,
  coupon: Coupon | null,
) {
  if (!input.installments || input.installments.length < 2) {
    throw new PaymentInputError("Add at least two EMI installments.");
  }

  const installmentRows = input.installments.map((installment, index) => ({
    amountMinor: installment.amountMinor,
    dueAt: parseDueAt(installment.dueAt),
    installmentNo: index + 1,
  }));
  const installmentTotal = installmentRows.reduce(
    (total, installment) => total + installment.amountMinor,
    0,
  );
  const totalAmountMinor = input.totalAmountMinor ?? installmentTotal;

  if (installmentTotal !== totalAmountMinor) {
    throw new PaymentInputError("EMI installment amounts must match the total.");
  }

  const paymentGroupId = input.paymentGroupId ?? randomUUID();
  const payments = [];

  for (const installment of installmentRows) {
    payments.push(
      await createCoursePaymentRow(tx, {
        amountMinor: installment.amountMinor,
        coupon,
        course,
        dueAt: installment.dueAt,
        input,
        installmentNo: installment.installmentNo,
        mode: PaymentMode.EMI,
        paymentGroupId,
        totalAmountMinor,
      }),
    );
  }

  return {
    payment: payments[0],
    paymentGroupId,
    payments,
  };
}

async function createCourseFlexiblePayment(
  tx: TransactionClient,
  input: z.infer<typeof coursePlaceholderSchema>,
  course: Course,
  coupon: Coupon | null,
) {
  if (!input.amountMinor || !input.totalAmountMinor) {
    throw new PaymentInputError("Enter a valid flexible amount and total.");
  }

  if (input.amountMinor > input.totalAmountMinor) {
    throw new PaymentInputError("Flexible amount cannot exceed the total.");
  }

  const paymentGroupId = input.paymentGroupId ?? randomUUID();
  const payment = await createCoursePaymentRow(tx, {
    amountMinor: input.amountMinor,
    coupon,
    course,
    input,
    mode: PaymentMode.FLEXIBLE,
    paymentGroupId,
    totalAmountMinor: input.totalAmountMinor,
  });

  return {
    payment,
    paymentGroupId,
    payments: [payment],
  };
}

type CoursePaymentRowInput = {
  amountMinor: number;
  coupon: Coupon | null;
  course: Course;
  dueAt?: Date;
  input: z.infer<typeof coursePlaceholderSchema>;
  installmentNo?: number;
  mode: PaymentMode;
  paymentGroupId: string;
  totalAmountMinor: number;
};

async function createCoursePaymentRow(
  tx: TransactionClient,
  {
    amountMinor,
    coupon,
    course,
    dueAt,
    input,
    installmentNo,
    mode,
    paymentGroupId,
    totalAmountMinor,
  }: CoursePaymentRowInput,
) {
  return tx.payment.create({
    data: {
      amountMinor,
      couponId: coupon?.id ?? null,
      courseId: course.id,
      currency: "INR",
      dueAt,
      installmentNo,
      metadata: createCoursePaymentMetadata(course, coupon, input),
      mode,
      payerEmail: input.payerEmail.toLowerCase(),
      payerMobile: input.payerMobile ?? null,
      payerName: input.payerName,
      paymentGroupId,
      purpose: PaymentPurpose.COURSE,
      status: PaymentStatus.PENDING,
      totalAmountMinor,
    },
    select: publicPaymentSelect,
  });
}

async function findCourseByIdOrSlug(tx: TransactionClient, courseId: string) {
  return tx.course.findFirst({
    where: {
      OR: [{ id: courseId }, { slug: courseId }],
    },
  });
}

function createCoursePaymentMetadata(
  course: Course,
  coupon: Coupon | null,
  input: z.infer<typeof coursePlaceholderSchema>,
): Prisma.InputJsonObject {
  return {
    coupon: coupon
      ? {
          code: coupon.code,
          discountAmountMinor: coupon.discountAmountMinor,
          discountType: coupon.discountType,
          discountValueBps: coupon.discountValueBps,
          id: coupon.id,
        }
      : null,
    course: {
      feeLabel: course.feeLabel,
      id: course.id,
      slug: course.slug,
      title: course.title,
    },
    inputMode: input.mode,
    requestedCourseId: input.courseId,
    source: "course-placeholder",
  };
}

function parseRupeeAmountToPaise(value: string) {
  const normalized = value.trim();

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [rupees, paise = ""] = normalized.split(".");
  const amountMinor = Number(rupees) * 100 + Number(paise.padEnd(2, "0"));

  return Number.isSafeInteger(amountMinor) && amountMinor > 0
    ? amountMinor
    : null;
}

function parseDueAt(value: string) {
  const dueAt = new Date(value);

  if (Number.isNaN(dueAt.getTime())) {
    throw new PaymentInputError("Enter a valid EMI due date.");
  }

  return dueAt;
}

const publicPaymentSelect = {
  amountMinor: true,
  currency: true,
  dueAt: true,
  id: true,
  installmentNo: true,
  mode: true,
  payerEmail: true,
  payerName: true,
  paymentGroupId: true,
  purpose: true,
  status: true,
  totalAmountMinor: true,
} satisfies Prisma.PaymentSelect;
