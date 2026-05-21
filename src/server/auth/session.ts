import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type { User, UserRole } from "@/generated/prisma";
import { prisma } from "@/server/db/prisma";
import {
  accessCookieName,
  createRefreshToken,
  hashRefreshToken,
  refreshCookieName,
  refreshTokenMaxAgeSeconds,
  signAccessToken,
  verifyAccessToken,
} from "@/server/auth/tokens";
import { assertPermission, type Permission } from "@/server/auth/permissions";
import { getNodeEnv } from "@/server/config/env";

export type SessionUser = Pick<
  User,
  "city" | "email" | "id" | "isActive" | "learnerType" | "mobile" | "name" | "role"
>;

export function toAuthUser(user: SessionUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    mobile: user.mobile ?? undefined,
    city: user.city ?? undefined,
    learnerType: user.learnerType ? user.learnerType.toLowerCase() : undefined,
    role: user.role,
  };
}

export async function createSession(user: SessionUser) {
  const accessToken = await signAccessToken({
    email: user.email,
    name: user.name,
    role: user.role,
    sub: user.id,
  });
  const refreshToken = createRefreshToken();
  const expiresAt = new Date(Date.now() + refreshTokenMaxAgeSeconds * 1000);

  await prisma.session.create({
    data: {
      expiresAt,
      refreshTokenHash: hashRefreshToken(refreshToken),
      userId: user.id,
    },
  });

  return {
    accessToken,
    refreshToken,
    user: toAuthUser(user),
  };
}

export function setAuthCookies(response: NextResponse, session: Awaited<ReturnType<typeof createSession>>) {
  const isProduction = getNodeEnv() === "production";

  response.cookies.set(refreshCookieName, session.refreshToken, {
    httpOnly: true,
    maxAge: refreshTokenMaxAgeSeconds,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });
  response.cookies.set(accessCookieName, session.accessToken, {
    httpOnly: true,
    maxAge: 15 * 60,
    path: "/",
    sameSite: "lax",
    secure: isProduction,
  });
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(refreshCookieName, "", { maxAge: 0, path: "/" });
  response.cookies.set(accessCookieName, "", { maxAge: 0, path: "/" });
}

export async function refreshFromCookie(refreshToken: string | undefined) {
  if (!refreshToken) {
    return null;
  }

  const storedSession = await prisma.session.findUnique({
    where: { refreshTokenHash: hashRefreshToken(refreshToken) },
    include: { user: true },
  });

  if (
    !storedSession ||
    storedSession.revokedAt ||
    storedSession.expiresAt <= new Date() ||
    !storedSession.user.isActive
  ) {
    return null;
  }

  await prisma.session.update({
    where: { id: storedSession.id },
    data: { revokedAt: new Date() },
  });

  return createSession(storedSession.user);
}

export async function revokeRefreshToken(refreshToken: string | undefined) {
  if (!refreshToken) {
    return;
  }

  await prisma.session.updateMany({
    where: {
      revokedAt: null,
      refreshTokenHash: hashRefreshToken(refreshToken),
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

export async function getCurrentUserFromRequest(request: NextRequest) {
  const headerToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const cookieToken = request.cookies.get(accessCookieName)?.value;
  const token = headerToken || cookieToken;

  if (!token) {
    return null;
  }

  const payload = await verifyAccessToken(token);

  return prisma.user.findFirst({
    where: {
      id: payload.sub,
      isActive: true,
    },
  });
}

export async function getCurrentUserFromCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(accessCookieName)?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyAccessToken(token);

    return prisma.user.findFirst({
      where: {
        id: payload.sub,
        isActive: true,
      },
    });
  } catch {
    return null;
  }
}

export async function requireApiPermission(request: NextRequest, permission: Permission) {
  const user = await getCurrentUserFromRequest(request);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  assertPermission(user.role as UserRole, permission);

  return user;
}
