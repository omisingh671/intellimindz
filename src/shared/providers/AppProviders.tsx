"use client";

import type { ReactNode } from "react";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
}
