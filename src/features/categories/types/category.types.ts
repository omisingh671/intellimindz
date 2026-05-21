import type { IconName } from "@/shared/icons/icon-registry";

export type CourseCategory = {
  slug: string;
  title: string;
  description: string;
  courseCount: number;
  icon: IconName;
};

export type CategoryHeroStat = {
  value: string;
  label: string;
  icon: IconName;
};

export type CategoryCta = {
  label: string;
  href: string;
  variant?: "primary" | "outline";
};

export type CategoryTab = {
  label: string;
  href: string;
};

export type CategoryCourse = {
  id: string;
  title: string;
  categoryLabel: string;
  level: "Discovery" | "Fluency" | "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  mode: "Self-paced" | "Online Live" | "Hybrid";
  audience: string;
  fee: string;
  priceType: "Free" | "Paid";
  tags: string[];
  isLatest?: boolean;
};

export type CategoryApplication = {
  title: string;
  description: string;
  icon: IconName;
};

export type CategoryLearningPathItem = {
  title: string;
  level: CategoryCourse["level"];
  duration: string;
  mode: CategoryCourse["mode"];
  fee: string;
  tags: string[];
};

export type CategoryCareer = {
  title: string;
  salaryRange: string;
  note: string;
  skills: string[];
};

export type CategoryOverviewItem = {
  title: string;
  body?: string;
  bullets?: string[];
  callout?: string;
};

export type CategoryBlog = {
  title: string;
  topic: string;
  excerpt: string;
  readTime: string;
};

export type CategoryDetail = {
  slug: string;
  hero: {
    title: string;
    badge: string;
    description: string;
    icon: IconName;
    gradient: "blue" | "teal" | "green";
    layout?: "stats-right" | "wide";
    ctas: CategoryCta[];
    stats: CategoryHeroStat[];
  };
  tabs: CategoryTab[];
  courses?: CategoryCourse[];
  applications?: CategoryApplication[];
  learningPath?: CategoryLearningPathItem[];
  careers?: CategoryCareer[];
  overview?: CategoryOverviewItem[];
  blogs?: CategoryBlog[];
};
