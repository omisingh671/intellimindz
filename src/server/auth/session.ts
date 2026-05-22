import { getServerSession } from "next-auth";
import type { NextRequest } from "next/server";
import type { LearnerType, User, UserRole } from "@/generated/prisma";
import { authOptions } from "@/server/auth/config";
import { assertPermission, type Permission } from "@/server/auth/permissions";
import { prisma } from "@/server/db/prisma";

export type SessionUser = {
  city: string | null;
  email: string;
  emailVerified?: Date | null;
  id: string;
  image?: string | null;
  imageProvider?: string | null;
  imageStorageKey?: string | null;
  isActive: boolean;
  learnerType: LearnerType | null;
  mobile: string | null;
  name: string;
  profileCompleted: boolean;
  role: UserRole;
};

export function toAuthUser(user: SessionUser | User) {
  const name = user.name ?? user.email;

  return {
    city: user.city ?? undefined,
    email: user.email,
    id: user.id,
    image: "image" in user ? user.image ?? undefined : undefined,
    isActive: user.isActive,
    learnerType: user.learnerType ? user.learnerType.toLowerCase() : undefined,
    mobile: user.mobile ?? undefined,
    name,
    profileCompleted: user.profileCompleted,
    role: user.role,
  };
}

export async function getCurrentAuthSession() {
  return getServerSession(authOptions);
}

export async function getCurrentUserFromRequest(request?: NextRequest) {
  void request;

  return getCurrentUserFromCookies();
}

export async function getCurrentUserFromCookies() {
  const session = await getCurrentAuthSession();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
      isActive: true,
    },
  });

  return user ? normalizeSessionUser(user) : null;
}

export async function requireApiPermission(
  request: NextRequest,
  permission: Permission,
) {
  const user = await getCurrentUserFromRequest(request);

  if (!user) {
    throw new Error("UNAUTHORIZED");
  }

  assertPermission(user.role, permission);

  return user;
}

function normalizeSessionUser(user: User): SessionUser {
  return {
    city: user.city,
    email: user.email,
    emailVerified: user.emailVerified,
    id: user.id,
    image: user.image,
    imageProvider: user.imageProvider,
    imageStorageKey: user.imageStorageKey,
    isActive: user.isActive,
    learnerType: user.learnerType,
    mobile: user.mobile,
    name: user.name ?? user.email,
    profileCompleted: user.profileCompleted,
    role: user.role,
  };
}
