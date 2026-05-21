import { NextRequest } from "next/server";
import { z } from "zod";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

const categorySchema = z.object({
  slug: z.string().trim().min(2),
  title: z.string().trim().min(2),
  description: z.string().trim().min(10),
  courseCount: z.number().int().min(0).default(0),
  icon: z.string().trim().min(1),
  sortOrder: z.number().int().min(0).default(0),
});

export async function GET(request: NextRequest) {
  try {
    await requireApiPermission(request, "categories:manage");
    const categories = await prisma.category.findMany({
      include: { _count: { select: { courses: true } } },
      orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
    });

    return ok({ categories });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiPermission(request, "categories:manage");
    const parsed = categorySchema.safeParse(await request.json().catch(() => null));

    if (!parsed.success) {
      return fail("Check the category details and try again.", 422);
    }

    const category = await prisma.category.create({ data: parsed.data });

    return ok({ category }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
