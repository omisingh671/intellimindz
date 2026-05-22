export const AUTH_ROLES = {
  admin: "ADMIN",
  learner: "LEARNER",
  manager: "MANAGER",
  superAdmin: "SUPER_ADMIN",
} as const;

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];
