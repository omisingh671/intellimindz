import { NextRequest } from "next/server";
import { getCurrentUserFromRequest, toAuthUser } from "@/server/auth/session";
import { fail, ok } from "@/server/http/responses";

export async function GET(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);

  if (!user) {
    return fail("Login required.", 401);
  }

  return ok({ user: toAuthUser(user) });
}
