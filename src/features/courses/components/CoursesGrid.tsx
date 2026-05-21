import { CourseCard } from "@/features/courses/components/CourseCard";
import { courses } from "@/features/courses/data/courses.data";

export function CoursesGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
