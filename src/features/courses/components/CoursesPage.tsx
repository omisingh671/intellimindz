import { CourseDiscoverySection } from "@/features/courses/components/CourseDiscoverySection";
import type { CourseLevel } from "@/features/courses/types/course.types";

type CoursesPageProps = {
  initialCategory?: string;
  initialLevel?: CourseLevel;
};

export function CoursesPage({
  initialCategory,
  initialLevel,
}: CoursesPageProps) {
  return (
    <main>
      <CourseDiscoverySection
        key={`${initialCategory ?? "all"}-${initialLevel ?? "all"}`}
        initialCategory={initialCategory}
        initialLevel={initialLevel}
      />
    </main>
  );
}
