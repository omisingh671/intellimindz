import { AdminShell } from "@/features/admin/components/AdminShell";
import { requireAdminPageAccess } from "@/server/auth/admin-page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await requireAdminPageAccess();

  return <AdminShell user={user}>{children}</AdminShell>;
}
