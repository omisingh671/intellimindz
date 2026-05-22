"use client";

import { getCurrentUser } from "@/features/auth/services/auth.api";
import { useAuthStore } from "@/stores/auth.store";

let bootstrapPromise: Promise<void> | null = null;

export function bootstrapAuth(): Promise<void> {
  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  bootstrapPromise = (async () => {
    const store = useAuthStore.getState();
    store.setLoading();

    try {
      const { user } = await getCurrentUser();
      useAuthStore.getState().setAuth({ user });
    } catch {
      const finalState = useAuthStore.getState();

      if (!finalState.user) {
        finalState.clearAuth();
      }
    }
  })();

  return bootstrapPromise;
}
