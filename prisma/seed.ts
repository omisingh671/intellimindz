import bcrypt from "bcryptjs";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import {
  CouponDiscountType,
  CoursePriceType,
  LearnerType,
  PrismaClient,
  TaxMode,
  UserRole,
} from "../src/generated/prisma";
import { getDatabaseUrl } from "../src/server/config/env";
import { categories } from "../src/features/categories/data/categories.data";
import { courses } from "../src/features/courses/data/courses.data";
import { learningLevels } from "../src/features/home/data/home.data";

const databaseUrl = getDatabaseUrl();

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(databaseUrl),
});

const defaultPassword = "Password@123";

const users = [
  {
    name: "Super Admin",
    email: "superadmin@intellimindz.local",
    role: UserRole.SUPER_ADMIN,
  },
  {
    name: "Admin User",
    email: "admin@intellimindz.local",
    role: UserRole.ADMIN,
  },
  {
    name: "Lead Manager",
    email: "manager@intellimindz.local",
    role: UserRole.MANAGER,
  },
  {
    name: "Student Learner",
    email: "student@intellimindz.local",
    role: UserRole.LEARNER,
    learnerType: LearnerType.STUDENT,
    city: "Bengaluru",
  },
  {
    name: "Professional Learner",
    email: "professional@intellimindz.local",
    role: UserRole.LEARNER,
    learnerType: LearnerType.PROFESSIONAL,
    city: "Mumbai",
  },
  {
    name: "Regulator Learner",
    email: "regulator@intellimindz.local",
    role: UserRole.LEARNER,
    learnerType: LearnerType.REGULATOR,
    city: "Delhi",
  },
];

const couponSeeds = [
  {
    code: "WELCOME10",
    name: "Welcome 10% Off",
    description: "Introductory discount for paid course enquiries.",
    discountType: CouponDiscountType.PERCENTAGE,
    discountValueBps: 1000,
    discountAmountMinor: null,
    minimumAmountMinor: 500000,
    appliesToAllCourses: true,
  },
  {
    code: "STUDENT500",
    name: "Student Support Rs. 500 Off",
    description: "Fixed learner support coupon for selected paid beginner courses.",
    discountType: CouponDiscountType.FIXED_AMOUNT,
    discountValueBps: null,
    discountAmountMinor: 50000,
    minimumAmountMinor: 800000,
    appliesToAllCourses: false,
    courseSlugs: ["digital-payments-upi", "financial-data-analytics"],
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(defaultPassword, 12);

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {
          city: "city" in user ? user.city : null,
          isActive: true,
          learnerType: "learnerType" in user ? user.learnerType : null,
          name: user.name,
          passwordHash,
          role: user.role,
        },
        create: {
          city: "city" in user ? user.city : undefined,
          email: user.email,
          isActive: true,
          learnerType: "learnerType" in user ? user.learnerType : undefined,
          name: user.name,
          passwordHash,
          role: user.role,
        },
      }),
    ),
  );

  for (const [index, category] of categories.entries()) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        courseCount: category.courseCount,
        description: category.description,
        icon: category.icon,
        sortOrder: index + 1,
        title: category.title,
      },
      create: {
        courseCount: category.courseCount,
        description: category.description,
        icon: category.icon,
        slug: category.slug,
        sortOrder: index + 1,
        title: category.title,
      },
    });
  }

  for (const level of learningLevels) {
    await prisma.courseLevel.upsert({
      where: { label: level.label },
      update: {
        duration: level.duration,
        idealFor: level.idealFor,
        outcome: level.outcome,
        step: level.step,
      },
      create: {
        duration: level.duration,
        idealFor: level.idealFor,
        label: level.label,
        outcome: level.outcome,
        step: level.step,
      },
    });
  }

  for (const course of courses) {
    const category = await prisma.category.findFirstOrThrow({
      where: { title: course.category },
      select: { id: true },
    });
    const level = await prisma.courseLevel.findUniqueOrThrow({
      where: { label: course.level },
      select: { id: true },
    });

    const savedCourse = await prisma.course.upsert({
      where: { slug: course.id },
      update: {
        audience: course.audience,
        categoryId: category.id,
        duration: course.duration,
        feeLabel: course.fee,
        isLatest: Boolean(course.isLatest),
        levelId: level.id,
        mode: course.mode,
        tags: course.tags,
        title: course.title,
      },
      create: {
        audience: course.audience,
        categoryId: category.id,
        duration: course.duration,
        feeLabel: course.fee,
        isLatest: Boolean(course.isLatest),
        levelId: level.id,
        mode: course.mode,
        slug: course.id,
        tags: course.tags,
        title: course.title,
      },
    });

    await prisma.coursePrice.deleteMany({
      where: { courseId: savedCourse.id },
    });
    await prisma.coursePrice.create({
      data: {
        courseId: savedCourse.id,
        ...parseCoursePrice(course.fee),
      },
    });
  }

  for (const couponSeed of couponSeeds) {
    const coupon = await prisma.coupon.upsert({
      where: { code: couponSeed.code },
      update: {
        appliesToAllCourses: couponSeed.appliesToAllCourses,
        currency: "INR",
        description: couponSeed.description,
        discountAmountMinor: couponSeed.discountAmountMinor,
        discountType: couponSeed.discountType,
        discountValueBps: couponSeed.discountValueBps,
        isActive: true,
        minimumAmountMinor: couponSeed.minimumAmountMinor,
        name: couponSeed.name,
      },
      create: {
        appliesToAllCourses: couponSeed.appliesToAllCourses,
        code: couponSeed.code,
        currency: "INR",
        description: couponSeed.description,
        discountAmountMinor: couponSeed.discountAmountMinor,
        discountType: couponSeed.discountType,
        discountValueBps: couponSeed.discountValueBps,
        isActive: true,
        minimumAmountMinor: couponSeed.minimumAmountMinor,
        name: couponSeed.name,
      },
    });

    await prisma.couponCourse.deleteMany({
      where: { couponId: coupon.id },
    });

    const courseSlugs = "courseSlugs" in couponSeed ? (couponSeed.courseSlugs ?? []) : [];

    if (courseSlugs.length > 0) {
      const matchingCourses = await prisma.course.findMany({
        where: { slug: { in: courseSlugs } },
        select: { id: true },
      });

      await prisma.couponCourse.createMany({
        data: matchingCourses.map((course) => ({
          couponId: coupon.id,
          courseId: course.id,
        })),
        skipDuplicates: true,
      });
    }
  }

  await prisma.lead.upsert({
    where: { id: "seed-lead-website-enquiry" },
    update: {},
    create: {
      id: "seed-lead-website-enquiry",
      email: "learner.enquiry@example.com",
      message: "I want guidance on the right FinTech learning path.",
      mobile: "+91 90000 00000",
      name: "Website Enquiry",
      source: "homepage-contact",
    },
  });

  console.log("Seed completed");
  console.log(`Demo password for all seeded users: ${defaultPassword}`);
}

function parseCoursePrice(feeLabel: string) {
  if (feeLabel.trim().toLowerCase() === "free") {
    return {
      baseAmountMinor: 0,
      currency: "INR",
      gstRateBps: null,
      priceType: CoursePriceType.FREE,
      taxMode: TaxMode.GST_EXEMPT,
    };
  }

  const numericMatch = feeLabel.match(/(\d[\d,]*)/);

  if (!numericMatch) {
    return {
      baseAmountMinor: null,
      currency: "INR",
      gstRateBps: null,
      priceType: CoursePriceType.CONTACT,
      taxMode: TaxMode.GST_EXEMPT,
    };
  }

  const rupees = Number(numericMatch[1].replace(/,/g, ""));

  return {
    baseAmountMinor: rupees * 100,
    currency: "INR",
    gstRateBps: feeLabel.toLowerCase().includes("gst") ? 1800 : null,
    priceType: CoursePriceType.PAID,
    taxMode: feeLabel.toLowerCase().includes("gst")
      ? TaxMode.GST_EXCLUSIVE
      : TaxMode.GST_INCLUSIVE,
  };
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
