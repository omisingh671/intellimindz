import { AdminPageHeader, StatCard } from "@/features/admin/components/AdminPage";
import { requireAdminPageAccess } from "@/server/auth/admin-page";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminSettingsPage() {
  await requireAdminPageAccess("settings:manage");

  return (
    <>
      <AdminPageHeader
        eyebrow="System"
        title="Settings"
        description="MVP configuration view for the single-app backend setup. Secrets stay in environment variables."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Backend" value="Next Route Handlers" />
        <StatCard label="Database" value="MySQL + Prisma" tone="green" />
        <StatCard label="Auth" value="Custom JWT" tone="slate" />
      </section>
    </>
  );
}
