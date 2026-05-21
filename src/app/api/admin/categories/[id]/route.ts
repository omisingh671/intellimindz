import { NextRequest } from "next/server";
import { z } from "zod";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { ok } from "@/server/http/responses";

const updateCategorySchema = z.object({
  title: z.string().trim().min(2).optional(),
  description: z.string().trim().min(10).optional(),
  courseCount: z.number().int().min(0).optional(),
  icon: z.string().trim().min(1).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireApiPermission(request, "categories:manage");
    const { id } = await params;
    const data = updateCategorySchema.parse(await request.json());
    const category = await prisma.category.update({ where: { id }, data });

    return ok({ category });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireApiPermission(request, "categories:manage");
    const { id } = await params;
    await prisma.category.delete({ where: { id } });

    return ok({ deleted: true });
  } catch (error) {
    return handleRouteError(error);
  }
}
