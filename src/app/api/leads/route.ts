import { NextRequest } from "next/server";
import { z } from "zod";
import { LearnerType } from "@/generated/prisma";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

const learnerTypeMap = {
  student: LearnerType.STUDENT,
  professional: LearnerType.PROFESSIONAL,
  regulator: LearnerType.REGULATOR,
} as const;

const publicLeadSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().min(8).max(20),
  learnerType: z.enum(["student", "professional", "regulator"]),
  message: z.string().trim().min(10),
  courseId: z.string().trim().min(1).max(120).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const parsed = publicLeadSchema.safeParse(
      await request.json().catch(() => null),
    );

    if (!parsed.success) {
      return fail("Check the enquiry details and try again.", 422);
    }

    const lead = await prisma.lead.create({
      data: {
        courseId: parsed.data.courseId ?? null,
        email: parsed.data.email.toLowerCase(),
        learnerType: learnerTypeMap[parsed.data.learnerType],
        message: parsed.data.message,
        mobile: parsed.data.phone,
        name: parsed.data.name,
        source: parsed.data.courseId ? "course-enquiry" : "contact-form",
      },
      select: {
        id: true,
        status: true,
      },
    });

    return ok({ lead }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
