import { NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

const donationInterestSchema = z.object({
  amount: z.string().trim().min(1),
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.string().trim().email(),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = donationInterestSchema.safeParse(
      await request.json().catch(() => null),
    );

    if (!parsed.success) {
      return fail("Check the sponsorship details and try again.", 422);
    }

    const amountMinor = parseRupeeAmountToPaise(parsed.data.amount);

    if (!amountMinor) {
      return fail("Enter a valid donation amount.", 422);
    }

    const donationInterest = await prisma.donationInterest.create({
      data: {
        amountMinor,
        email: parsed.data.email.toLowerCase(),
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
      },
      select: {
        id: true,
        status: true,
      },
    });

    return ok({ donationInterest }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
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
