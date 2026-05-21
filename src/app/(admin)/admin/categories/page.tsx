import { AdminPageHeader, AdminTable, Td, Th } from "@/features/admin/components/AdminPage";
import { requireAdminPageAccess } from "@/server/auth/admin-page";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminCategoriesPage() {
  await requireAdminPageAccess("categories:manage");
  const categories = await prisma.category.findMany({
    include: { _count: { select: { courses: true } } },
    orderBy: [{ sortOrder: "asc" }, { title: "asc" }],
  });

  return (
    <>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Categories"
        description="Category rows mirror the existing public category cards and keep course counts visible."
      />
      <AdminTable>
        <thead>
          <tr>
            <Th>Category</Th>
            <Th>Slug</Th>
            <Th>Frontend Count</Th>
            <Th>Seeded Courses</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {categories.map((category) => (
            <tr key={category.id}>
              <Td>{category.title}</Td>
              <Td>{category.slug}</Td>
              <Td>{category.courseCount}</Td>
              <Td>{category._count.courses}</Td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}
