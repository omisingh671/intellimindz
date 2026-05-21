import type { LinkItem } from "@/shared/types/common.types";
import type { IconName } from "@/shared/icons/icon-registry";

type PrimaryNavItem = LinkItem & {
  icon: IconName;
};

export const primaryNavItems: PrimaryNavItem[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "About Us", href: "/about", icon: "info" },
  { label: "Courses", href: "/courses", icon: "bookOpen" },
  { label: "Categories", href: "/categories", icon: "layers" },
  { label: "Contact Us", href: "/contact", icon: "message" },
  { label: "Donate", href: "/donate", icon: "handCoins" },
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
