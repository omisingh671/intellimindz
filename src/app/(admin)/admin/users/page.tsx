import { AdminPageHeader, AdminTable, Td, Th } from "@/features/admin/components/AdminPage";
import { requireAdminPageAccess } from "@/server/auth/admin-page";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminUsersPage() {
  await requireAdminPageAccess("users:manage");
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageHeader
        eyebrow="RBAC"
        title="Users"
        description="SUPER_ADMIN has full access. ADMIN can manage managers and learners for the MVP."
      />
      <AdminTable>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => (
            <tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.role.replace("_", " ")}</Td>
              <Td>{user.isActive ? "Active" : "Inactive"}</Td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}
