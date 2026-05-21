import { createHash, randomBytes } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import type { UserRole } from "@/generated/prisma";
import { getJwtAccessSecret, getNodeEnv } from "@/server/config/env";

export type AccessTokenPayload = {
  email: string;
  name: string;
  role: UserRole;
  sub: string;
};

const accessTokenMaxAgeSeconds = 15 * 60;
export const refreshTokenMaxAgeSeconds = 7 * 24 * 60 * 60;
export const refreshCookieName = "intellimindz_refresh";
export const accessCookieName = "intellimindz_access";

function getJwtSecret() {
  const secret = getJwtAccessSecret();

  if (secret) {
    return new TextEncoder().encode(secret);
  }

  if (getNodeEnv() === "production") {
    throw new Error("JWT_ACCESS_SECRET is required in production.");
  }

  return new TextEncoder().encode("dev-only-intellimindz-access-secret");
}

export async function signAccessToken(payload: AccessTokenPayload) {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${accessTokenMaxAgeSeconds}s`)
    .sign(getJwtSecret());
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret());

  if (
    !payload.sub ||
    typeof payload.email !== "string" ||
    typeof payload.name !== "string" ||
    !isUserRole(payload.role)
  ) {
    throw new Error("Invalid token payload");
  }

  return {
    email: payload.email,
    name: payload.name,
    role: payload.role,
    sub: payload.sub,
  };
}

export function createRefreshToken() {
  return randomBytes(48).toString("base64url");
}

export function hashRefreshToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function isUserRole(value: unknown): value is UserRole {
  return (
    value === "SUPER_ADMIN" ||
    value === "ADMIN" ||
    value === "MANAGER" ||
    value === "LEARNER"
  );
}
