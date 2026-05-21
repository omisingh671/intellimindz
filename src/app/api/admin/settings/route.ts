import { NextRequest } from "next/server";
import { requireApiPermission } from "@/server/auth/session";
import { handleRouteError } from "@/server/http/handle-route-error";
import { ok } from "@/server/http/responses";

export async function GET(request: NextRequest) {
  try {
    const user = await requireApiPermission(request, "admin:access");

    return ok({
      settings: {
        database: "mysql",
        auth: "custom-jwt-refresh-cookie",
        actorRole: user.role,
        mvpMode: true,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
