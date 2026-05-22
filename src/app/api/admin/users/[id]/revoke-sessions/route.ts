import { NextRequest } from "next/server";
import type { UserRole } from "@/generated/prisma";
import { canCreateRole } from "@/server/auth/permissions";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const actor = await requireApiPermission(request, "users:manage");
    const { id } = await params;
    const targetUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        role: true,
      },
    });

    if (!targetUser) {
      return fail("User not found.", 404);
    }

    if (!canCreateRole(actor.role as UserRole, targetUser.role as UserRole)) {
      return fail("You cannot revoke sessions for this user.", 403);
    }

    const user = await prisma.user.update({
      where: { id: targetUser.id },
      data: {
        sessionVersion: {
          increment: 1,
        },
      },
      select: {
        id: true,
        sessionVersion: true,
      },
    });

    return ok({ user });
  } catch (error) {
    return handleRouteError(error);
  }
}
