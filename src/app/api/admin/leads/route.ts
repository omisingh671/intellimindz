import { NextRequest } from "next/server";
import { z } from "zod";
import { LeadStatus } from "@/generated/prisma";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

const leadSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  mobile: z.string().trim().optional(),
  message: z.string().trim().min(10),
  source: z.string().trim().min(2).default("admin"),
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]).default("NEW"),
  assignedToId: z.string().optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireApiPermission(request, "leads:manage");
    const leads = await prisma.lead.findMany({
      include: {
        assignedTo: {
          select: { email: true, id: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return ok({ leads });
  } catch (error) {
    return handleRouteError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireApiPermission(request, "leads:manage");
    const parsed = leadSchema.safeParse(await request.json().catch(() => null));

    if (!parsed.success) {
      return fail("Check the lead details and try again.", 422);
    }

    const lead = await prisma.lead.create({
      data: {
        ...parsed.data,
        status: parsed.data.status as LeadStatus,
      },
    });

    return ok({ lead }, { status: 201 });
  } catch (error) {
    return handleRouteError(error);
  }
}
