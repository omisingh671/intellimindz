import { redirect } from "next/navigation";
import { hasPermission, type Permission } from "@/server/auth/permissions";
import { getCurrentUserFromCookies } from "@/server/auth/session";
import { AUTH_ROLES } from "@/shared/constants/auth-roles";

export async function requireAdminPageAccess(permission?: Permission) {
  const user = await getCurrentUserFromCookies();

  if (!user) {
    redirect("/login");
  }

  if (!hasPermission(user.role, "admin:access")) {
    redirect("/");
  }

  if (permission && !hasPermission(user.role, permission)) {
    redirect(
      user.role === AUTH_ROLES.manager ? "/admin/leads" : "/admin/dashboard",
    );
  }

  return user;
}
