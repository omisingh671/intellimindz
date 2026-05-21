import type { Metadata } from "next";
import { ContactPage } from "@/features/contact/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Page() {
  return <ContactPage />;
}
