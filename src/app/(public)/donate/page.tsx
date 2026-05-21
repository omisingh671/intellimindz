import type { Metadata } from "next";
import { DonatePage } from "@/features/donation/components/DonatePage";

export const metadata: Metadata = {
  title: "Donate",
};

export default function Page() {
  return <DonatePage />;
}
