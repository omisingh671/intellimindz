import type { LearningLevel, Stat } from "@/features/home/types/home.types";

export const heroStats: Stat[] = [
  { value: "7+", label: "FinTech domains" },
  { value: "5", label: "learning levels" },
  { value: "100%", label: "budget-friendly start" },
];

export const learningLevels: LearningLevel[] = [
  {
    step: 1,
    label: "Discovery",
    duration: "1 to 5 hours",
    outcome: "Awareness and quick exposure",
    idealFor: "Curious starters",
  },
  {
    step: 2,
    label: "Fluency",
    duration: "3 to 10 hours",
    outcome: "Conceptual vocabulary and confidence",
    idealFor: "Cross-functional learners",
  },
  {
    step: 3,
    label: "Beginner",
    duration: "8 to 20 hours",
    outcome: "Foundational skill development",
    idealFor: "Students and early professionals",
  },
  {
    step: 4,
    label: "Intermediate",
    duration: "15 to 40 hours",
    outcome: "Applied tools and role readiness",
    idealFor: "Working professionals",
  },
  {
    step: 5,
    label: "Advanced",
    duration: "30+ hours",
    outcome: "Deep specialisation and leadership",
    idealFor: "Specialists and decision-makers",
  },
];

export const donationImpacts = [
  "Fund scholarships for deserving learners",
  "Enable subsidised access to FinTech courses",
  "Develop free financial literacy learning modules",
  "Support mentorship and project opportunities",
  "Build employability pathways for underserved regions",
];
