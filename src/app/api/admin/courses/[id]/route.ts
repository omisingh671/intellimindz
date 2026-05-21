import { NextRequest } from "next/server";
import { z } from "zod";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { ok } from "@/server/http/responses";

const updateCourseSchema = z.object({
  title: z.string().trim().min(2).optional(),
  duration: z.string().trim().min(1).optional(),
  mode: z.string().trim().min(1).optional(),
  audience: z.string().trim().min(1).optional(),
  feeLabel: z.string().trim().min(1).optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  isLatest: z.boolean().optional(),
  isPublished: z.boolean().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireApiPermission(request, "courses:manage");
    const { id } = await params;
    const data = updateCourseSchema.parse(await request.json());
    const course = await prisma.course.update({ where: { id }, data });

    return ok({ course });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireApiPermission(request, "courses:manage");
    const { id } = await params;
    await prisma.course.delete({ where: { id } });

    return ok({ deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
