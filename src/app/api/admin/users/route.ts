import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";
import { LearnerType, UserRole } from "@/generated/prisma";
import { canCreateRole } from "@/server/auth/permissions";
import { requireApiPermission, toAuthUser } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

const createUserSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(8),
  role: z.enum(["ADMIN", "MANAGER", "LEARNER"]),
  city: z.string().trim().optional(),
  mobile: z.string().trim().optional(),
  learnerType: z.enum(["STUDENT", "PROFESSIONAL", "REGULATOR"]).optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireApiPermission(request, "users:manage");
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        city: true,
        createdAt: true,
        email: true,
        id: true,
        isActive: true,
        learnerType: true,
        mobile: true,
        name: true,
        role: true,
      },
    });

    return ok({ users });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const actor = await requireApiPermission(request, "users:manage");
    const parsed = createUserSchema.safeParse(await request.json().catch(() => null));

    if (!parsed.success) {
      return fail("Check the user details and try again.", 422);
    }

    if (!canCreateRole(actor.role as UserRole, parsed.data.role as UserRole)) {
      return fail("You cannot create users with this role.", 403);
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: {
        city: parsed.data.city || null,
        email: parsed.data.email.toLowerCase(),
        learnerType:
          parsed.data.role === "LEARNER"
            ? ((parsed.data.learnerType ?? "STUDENT") as LearnerType)
            : null,
        mobile: parsed.data.mobile || null,
        name: parsed.data.name,
        passwordHash,
        role: parsed.data.role,
      },
    });

    return ok({ user: toAuthUser(user) }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
