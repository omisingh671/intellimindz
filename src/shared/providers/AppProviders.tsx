"use client";

import type { ReactNode } from "react";
import { AuthBootstrap } from "@/features/auth/components/AuthBootstrap";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";
import { ToastProvider } from "@/shared/providers/ToastProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReactQueryProvider>
      <ToastProvider>
        <AuthBootstrap>{children}</AuthBootstrap>
      </ToastProvider>
    </ReactQueryProvider>
  );
}
