"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";
import { ToastProvider } from "@/shared/providers/ToastProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
