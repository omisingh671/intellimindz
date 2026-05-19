export type CourseLevel =
  | "Discovery"
  | "Fluency"
  | "Beginner"
  | "Intermediate"
  | "Advanced";

export type Course = {
  id: string;
  title: string;
  category: string;
  level: CourseLevel;
  duration: string;
  mode: "Self-paced" | "Live Online" | "Hybrid";
  audience: string;
  fee: string;
  tags: string[];
  isLatest?: boolean;
};
