import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";
import { createSession, setAuthCookies } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { fail, ok } from "@/server/http/responses";

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export async function POST(request: NextRequest) {
  const parsed = loginSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return fail("Enter a valid email and password.", 422);
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });

  if (!user?.isActive) {
    return fail("Invalid email or password.", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    parsed.data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    return fail("Invalid email or password.", 401);
  }

  const session = await createSession(user);
  const response = ok({
    accessToken: session.accessToken,
    user: session.user,
  });
  setAuthCookies(response, session);

  return response;
}
