"use client";

import { useEffect, type ReactNode } from "react";
import { bootstrapAuth } from "@/features/auth/services/auth.bootstrap";

type AuthBootstrapProps = {
  children: ReactNode;
};

export function AuthBootstrap({ children }: AuthBootstrapProps) {
  useEffect(() => {
    void bootstrapAuth();
  }, []);

  return children;
}
