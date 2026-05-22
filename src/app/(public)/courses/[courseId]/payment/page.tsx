import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoursePaymentPage } from "@/features/courses/components/CoursePaymentPage";
import { courses } from "@/features/courses/data/courses.data";

type PageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export function generateStaticParams() {
  return courses.map((course) => ({
    courseId: course.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { courseId } = await params;
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    return {
      title: "Course Payment",
    };
  }

  return {
    title: `Enroll - ${course.title}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { courseId } = await params;
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    notFound();
  }

  return <CoursePaymentPage course={course} />;
}
