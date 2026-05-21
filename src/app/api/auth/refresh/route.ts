import { NextRequest } from "next/server";
import { refreshCookieName } from "@/server/auth/tokens";
import { refreshFromCookie, setAuthCookies } from "@/server/auth/session";
import { fail, ok } from "@/server/http/responses";

export async function POST(request: NextRequest) {
  const session = await refreshFromCookie(request.cookies.get(refreshCookieName)?.value);

  if (!session) {
    return fail("Session expired. Please login again.", 401);
  }

  const response = ok({
    accessToken: session.accessToken,
    user: session.user,
  });
  setAuthCookies(response, session);

  return response;
}
