import type { LinkItem } from "@/shared/types/common.types";

export const primaryNavItems: LinkItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Categories", href: "/categories" },
  { label: "Contact Us", href: "/contact" },
  { label: "Donate", href: "/donate" },
];

export const footerLinks = {
  platform: [
    { label: "Courses", href: "/courses" },
    { label: "Categories", href: "/categories" },
    { label: "Contact Us", href: "/contact" },
    { label: "Sign Up", href: "/signup" },
  ],
  categories: [
    { label: "Digital Payments", href: "/categories" },
    { label: "AI in Finance", href: "/categories" },
    { label: "RegTech", href: "/categories" },
    { label: "Blockchain", href: "/categories" },
  ],
  action: [
    { label: "Donate", href: "/donate" },
    { label: "Institutional Enquiry", href: "/contact" },
    { label: "Corporate Training", href: "/contact" },
    { label: "Scholarships", href: "/donate" },
  ],
};
