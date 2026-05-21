import type { Metadata } from "next";
import { CoursesPage } from "@/features/courses/components/CoursesPage";
import type { CourseLevel } from "@/features/courses/types/course.types";

export const metadata: Metadata = {
  title: "Courses",
};

type PageProps = {
  searchParams: Promise<{
    category?: string;
    level?: string;
  }>;
};

const courseLevels: CourseLevel[] = [
  "Discovery",
  "Fluency",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export default async function Page({ searchParams }: PageProps) {
  const { category, level } = await searchParams;
  const initialLevel = courseLevels.find((item) => item === level);

  return <CoursesPage initialCategory={category} initialLevel={initialLevel} />;
}
