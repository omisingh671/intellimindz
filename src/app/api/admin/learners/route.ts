import { NextRequest } from "next/server";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { ok } from "@/server/http/responses";

export async function GET(request: NextRequest) {
  try {
    await requireApiPermission(request, "learners:manage");
    const learners = await prisma.user.findMany({
      where: { role: "LEARNER" },
      orderBy: { createdAt: "desc" },
      select: {
        city: true,
        createdAt: true,
        email: true,
        id: true,
        learnerType: true,
        mobile: true,
        name: true,
      },
    });

    return ok({ learners });
  } catch (error) {
    return handleRouteError(error);
  }
}
