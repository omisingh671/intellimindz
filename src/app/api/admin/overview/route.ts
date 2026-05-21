import { NextRequest } from "next/server";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { ok } from "@/server/http/responses";

export async function GET(request: NextRequest) {
  try {
    await requireApiPermission(request, "admin:access");

    const [users, learners, courses, categories, leads] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "LEARNER" } }),
      prisma.course.count(),
      prisma.category.count(),
      prisma.lead.count(),
    ]);

    return ok({ users, learners, courses, categories, leads });
  } catch (error) {
    return handleRouteError(error);
  }
}
