import type { CourseLevel } from "@/features/courses/types/course.types";

export type LearningLevel = {
  step: number;
  label: CourseLevel;
  duration: string;
  outcome: string;
  idealFor: string;
};

export type Stat = {
  value: string;
  label: string;
};
