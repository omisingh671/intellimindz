import { AdminPageHeader, AdminTable, Td, Th } from "@/features/admin/components/AdminPage";
import { requireAdminPageAccess } from "@/server/auth/admin-page";
import { prisma } from "@/server/db/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AdminCoursesPage() {
  await requireAdminPageAccess("courses:manage");
  const courses = await prisma.course.findMany({
    include: {
      category: true,
      level: true,
      prices: {
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
    orderBy: { title: "asc" },
  });

  return (
    <>
      <AdminPageHeader
        eyebrow="Catalogue"
        title="Courses"
        description="Seeded from the current public frontend course data so admin and learner pages start from the same catalogue."
      />
      <AdminTable>
        <thead>
          <tr>
            <Th>Course</Th>
            <Th>Category</Th>
            <Th>Level</Th>
            <Th>Fee</Th>
            <Th>GST</Th>
            <Th>Published</Th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {courses.map((course) => (
            <tr key={course.id}>
              <Td>{course.title}</Td>
              <Td>{course.category.title}</Td>
              <Td>{course.level.label}</Td>
              <Td>{formatCoursePrice(course.prices[0], course.feeLabel)}</Td>
              <Td>{formatGst(course.prices[0])}</Td>
              <Td>{course.isPublished ? "Yes" : "No"}</Td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </>
  );
}

function formatCoursePrice(
  price:
    | {
        baseAmountMinor: number | null;
        currency: string;
        priceType: string;
      }
    | undefined,
  fallback: string,
) {
  if (!price) {
    return fallback;
  }

  if (price.priceType === "FREE") {
    return "Free";
  }

  if (price.priceType === "CONTACT" || price.baseAmountMinor === null) {
    return "Contact";
  }

  return `${price.currency} ${(price.baseAmountMinor / 100).toLocaleString("en-IN")}`;
}

function formatGst(
  price:
    | {
        gstRateBps: number | null;
        taxMode: string;
      }
    | undefined,
) {
  if (!price || price.taxMode === "GST_EXEMPT") {
    return "Exempt";
  }

  const rate = price.gstRateBps ? `${price.gstRateBps / 100}%` : "No rate";

  return price.taxMode === "GST_EXCLUSIVE" ? `${rate} extra` : `${rate} included`;
}
