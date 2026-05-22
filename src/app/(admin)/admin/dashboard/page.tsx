import { AdminPageHeader, StatCard, AdminTable, Td, Th } from "@/features/admin/components/AdminPage";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminDashboardPage() {
  const [users, learners, courses, categories, leads, latestLeads] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "LEARNER" } }),
      prisma.course.count(),
      prisma.category.count(),
      prisma.lead.count(),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  return (
    <>
      <AdminPageHeader
        eyebrow="Overview"
        title="MVP operations snapshot"
        description="Track core users, learners, catalogue content, categories, and incoming leads from one protected admin area."
      />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Users" value={users} />
        <StatCard label="Learners" value={learners} tone="green" />
        <StatCard label="Courses" value={courses} />
        <StatCard label="Categories" value={categories} tone="slate" />
        <StatCard label="Leads" value={leads} tone="green" />
      </section>

      <section className="mt-8">
        <AdminPageHeader
          eyebrow="Recent"
          title="Latest leads"
          description="Managers can work from the leads page; this overview keeps the current activity visible."
        />
        <AdminTable>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Source</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {latestLeads.map((lead) => (
              <tr key={lead.id}>
                <Td>{lead.name}</Td>
                <Td>{lead.email}</Td>
                <Td>{lead.status}</Td>
                <Td>{lead.source}</Td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      </section>
    </>
  );
}
