import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";
import { LearnerType } from "@/generated/prisma";
import { toAuthUser } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { fail, ok } from "@/server/http/responses";

const learnerTypeMap = {
  student: LearnerType.STUDENT,
  professional: LearnerType.PROFESSIONAL,
  regulator: LearnerType.REGULATOR,
} as const;

const registerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  mobile: z.string().trim().max(20).optional(),
  city: z.string().trim().min(2),
  learnerType: z.enum(["student", "professional", "regulator"]),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const parsed = registerSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return fail("Check the signup details and try again.", 422);
  }

  const email = parsed.data.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return fail("An account already exists for this email.", 409);
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      city: parsed.data.city,
      email,
      learnerType: learnerTypeMap[parsed.data.learnerType],
      mobile: parsed.data.mobile || null,
      name: parsed.data.name,
      passwordHash,
      profileCompleted: true,
    },
  });

  return ok({ user: toAuthUser(user) }, { status: 201 });
}
