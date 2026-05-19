import type { Metadata } from "next";
import { LoginPage } from "@/features/auth/components/LoginPage";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return <LoginPage />;
}
