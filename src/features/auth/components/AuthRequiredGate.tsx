"use client";

import { useRequireAuth } from "@/features/auth/hooks";

export function AuthRequiredGate() {
  useRequireAuth();

  return null;
}
