"use client";

import { useGuestRedirect } from "@/features/auth/hooks";

export function AuthGuestRedirect() {
  useGuestRedirect("/");

  return null;
}
