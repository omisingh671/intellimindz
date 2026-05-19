import type { CourseCategory } from "@/features/categories/types/category.types";

export const categories: CourseCategory[] = [
  {
    id: "fintech-core",
    title: "FinTech Core",
    description: "Digital finance, open banking, neo-banking and FinTech business models.",
    courseCount: 24,
    icon: "landmark",
  },
  {
    id: "digital-payments",
    title: "Digital Payments",
    description: "UPI, India Stack, CBDCs, account aggregators and payment infrastructure.",
    courseCount: 18,
    icon: "walletCards",
  },
  {
    id: "ai-finance",
    title: "AI in Finance",
    description: "AI, ML and GenAI for credit, risk, fraud detection and decision-making.",
    courseCount: 22,
    icon: "laptop",
  },
  {
    id: "data-science-finance",
    title: "Data Science in Finance",
    description: "Financial analytics, predictive modelling and decision intelligence.",
    courseCount: 16,
    icon: "chart",
  },
  {
    id: "cybersecurity-finance",
    title: "Cybersecurity in Finance",
    description: "Digital trust, identity security, fraud prevention and secure systems.",
    courseCount: 15,
    icon: "lock",
  },
  {
    id: "regtech-suptech",
    title: "RegTech / SupTech",
    description: "Compliance automation, KYC, monitoring and governance systems.",
    courseCount: 14,
    icon: "shieldCheck",
  },
  {
    id: "blockchain-dlt",
    title: "Blockchain & DLT",
    description: "Blockchain, smart contracts, tokenisation, CBDCs and enterprise DLT.",
    courseCount: 17,
    icon: "coins",
  },
  {
    id: "sustainable-finance",
    title: "Sustainable Finance",
    description: "Climate finance, green FinTech, ESG and financial inclusion.",
    courseCount: 12,
    icon: "sprout",
  },
];
