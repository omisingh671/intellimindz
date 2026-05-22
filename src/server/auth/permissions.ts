import type { UserRole } from "@/generated/prisma";
import { AUTH_ROLES } from "@/shared/constants/auth-roles";

export type Permission =
  | "admin:access"
  | "users:manage"
  | "learners:manage"
  | "courses:manage"
  | "categories:manage"
  | "leads:manage"
  | "settings:manage";

const rolePermissions: Record<UserRole, Permission[]> = {
  [AUTH_ROLES.superAdmin]: [
    "admin:access",
    "users:manage",
    "learners:manage",
    "courses:manage",
    "categories:manage",
    "leads:manage",
    "settings:manage",
  ],
  [AUTH_ROLES.admin]: [
    "admin:access",
    "users:manage",
    "learners:manage",
    "courses:manage",
    "categories:manage",
    "leads:manage",
    "settings:manage",
  ],
  [AUTH_ROLES.manager]: ["admin:access", "leads:manage"],
  [AUTH_ROLES.learner]: [],
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
  if (actorRole === AUTH_ROLES.superAdmin) {
    return true;
  }

  if (actorRole === AUTH_ROLES.admin) {
    return (
      targetRole === AUTH_ROLES.manager || targetRole === AUTH_ROLES.learner
    );
  }

  return false;
}
