import { AdminPageHeader, AdminTable, Td, Th } from "@/features/admin/components/AdminPage";
import { requireAdminPageAccess } from "@/server/auth/admin-page";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminLeadsPage() {
  await requireAdminPageAccess("leads:manage");
  const leads = await prisma.lead.findMany({
    include: {
      assignedTo: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageHeader
        eyebrow="Sales"
        title="Leads"
        description="Managers are restricted to this lead-management surface. Admin and Super Admin can also access it."
      />
      <AdminTable>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Status</Th>
            <Th>Assigned</Th>
            <Th>Source</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr key={lead.id}>
              <Td>{lead.name}</Td>
              <Td>{lead.email}</Td>
              <Td>{lead.status}</Td>
              <Td>{lead.assignedTo?.name ?? "-"}</Td>
              <Td>{lead.source}</Td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}
