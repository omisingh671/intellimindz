import type { Metadata } from "next";
import { SignupPage } from "@/features/auth/components/SignupPage";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return <SignupPage />;
}
