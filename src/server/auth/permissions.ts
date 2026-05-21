import type { UserRole } from "@/generated/prisma";

export type Permission =
  | "admin:access"
  | "users:manage"
  | "learners:manage"
  | "courses:manage"
  | "categories:manage"
  | "leads:manage"
  | "settings:manage";

const rolePermissions: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    "admin:access",
    "users:manage",
    "learners:manage",
    "courses:manage",
    "categories:manage",
    "leads:manage",
    "settings:manage",
  ],
  ADMIN: [
    "admin:access",
    "users:manage",
    "learners:manage",
    "courses:manage",
    "categories:manage",
    "leads:manage",
    "settings:manage",
  ],
  MANAGER: ["admin:access", "leads:manage"],
  LEARNER: [],
};

export function hasPermission(role: UserRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export function assertPermission(role: UserRole, permission: Permission) {
  if (!hasPermission(role, permission)) {
    throw new Error("FORBIDDEN");
  }
}

export function canCreateRole(actorRole: UserRole, targetRole: UserRole) {
  if (actorRole === "SUPER_ADMIN") {
    return true;
  }

  if (actorRole === "ADMIN") {
    return targetRole === "MANAGER" || targetRole === "LEARNER";
  }

  return false;
}
