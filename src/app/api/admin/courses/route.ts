import { NextRequest } from "next/server";
import { z } from "zod";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

const courseSchema = z.object({
  slug: z.string().trim().min(2),
  title: z.string().trim().min(2),
  categoryId: z.string().min(1),
  levelId: z.string().min(1),
  duration: z.string().trim().min(1),
  mode: z.string().trim().min(1),
  audience: z.string().trim().min(1),
  feeLabel: z.string().trim().min(1),
  tags: z.array(z.string().trim().min(1)).default([]),
  isLatest: z.boolean().default(false),
  isPublished: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
  try {
    await requireApiPermission(request, "courses:manage");
    const courses = await prisma.course.findMany({
      include: { category: true, level: true, prices: true },
      orderBy: { createdAt: "desc" },
    });

    return ok({ courses });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiPermission(request, "courses:manage");
    const parsed = courseSchema.safeParse(await request.json().catch(() => null));

    if (!parsed.success) {
      return fail("Check the course details and try again.", 422);
    }

    const course = await prisma.course.create({ data: parsed.data });

    return ok({ course }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
