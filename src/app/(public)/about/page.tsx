import type { Metadata } from "next";
import { AboutPage } from "@/features/about/components/AboutPage";

export const metadata: Metadata = {
  title: "About Us",
};

export default function Page() {
  return <AboutPage />;
}
