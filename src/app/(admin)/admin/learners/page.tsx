import { AdminPageHeader, AdminTable, Td, Th } from "@/features/admin/components/AdminPage";
import { requireAdminPageAccess } from "@/server/auth/admin-page";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminLearnersPage() {
  await requireAdminPageAccess("learners:manage");
  const learners = await prisma.user.findMany({
    where: { role: "LEARNER" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminPageHeader
        eyebrow="Learners"
        title="Learner directory"
        description="Student, professional, and regulator learner accounts are kept separate from admin users."
      />
      <AdminTable>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Type</Th>
            <Th>City</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {learners.map((learner) => (
            <tr key={learner.id}>
              <Td>{learner.name}</Td>
              <Td>{learner.email}</Td>
              <Td>{learner.learnerType ?? "Not set"}</Td>
              <Td>{learner.city ?? "-"}</Td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}
