import { NextRequest } from "next/server";
import { clearAuthCookies, revokeRefreshToken } from "@/server/auth/session";
import { refreshCookieName } from "@/server/auth/tokens";
import { ok } from "@/server/http/responses";

export async function POST(request: NextRequest) {
  await revokeRefreshToken(request.cookies.get(refreshCookieName)?.value);

  const response = ok({ loggedOut: true });
  clearAuthCookies(response);

  return response;
}
