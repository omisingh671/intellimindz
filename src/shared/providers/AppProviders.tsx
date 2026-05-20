"use client";

import type { ReactNode } from "react";
import { AuthBootstrap } from "@/features/auth/components/AuthBootstrap";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReactQueryProvider>
      <AuthBootstrap>{children}</AuthBootstrap>
    </ReactQueryProvider>
  );
}
