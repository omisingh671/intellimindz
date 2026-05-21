import { NextRequest } from "next/server";
import { z } from "zod";
import { requireApiPermission } from "@/server/auth/session";
import { prisma } from "@/server/db/prisma";
import { handleRouteError } from "@/server/http/handle-route-error";
import { ok } from "@/server/http/responses";

const updateLeadSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "QUALIFIED", "CLOSED"]).optional(),
  assignedToId: z.string().nullable().optional(),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await requireApiPermission(request, "leads:manage");
    const { id } = await params;
    const data = updateLeadSchema.parse(await request.json());
    const lead = await prisma.lead.update({ where: { id }, data });

    return ok({ lead });
  } catch (error) {
    return handleRouteError(error);
  }
}
