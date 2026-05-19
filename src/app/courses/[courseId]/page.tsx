import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CourseDetailsPage } from "@/features/courses/components/CourseDetailsPage";
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
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description: `${course.level} ${course.category} course for ${course.audience}.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { courseId } = await params;
  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    notFound();
  }

  return <CourseDetailsPage course={course} />;
}
