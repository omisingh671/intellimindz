export type CourseCategory = {
  id: string;
  title: string;
  description: string;
  courseCount: number;
  icon: "landmark" | "walletCards" | "laptop" | "chart" | "lock" | "shieldCheck" | "coins" | "sprout";
};
