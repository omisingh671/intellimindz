import type { Metadata } from "next";
import { CoursesPage } from "@/features/courses/components/CoursesPage";

export const metadata: Metadata = {
  title: "Courses",
};

export default function Page() {
  return <CoursesPage />;
}
