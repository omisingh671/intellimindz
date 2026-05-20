"use client";

import { getCurrentUser, refreshSession } from "@/features/auth/services/auth.api";
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
      if (store.user && store.accessToken) {
        try {
          const { user } = await getCurrentUser();
          useAuthStore.getState().setAuth({
            user,
            accessToken: store.accessToken,
          });
          return;
        } catch {
          // Fall through to cookie-backed refresh.
        }
      }

      const session = await refreshSession();
      useAuthStore.getState().setAuth(session);
    } catch {
      const finalState = useAuthStore.getState();

      if (!finalState.user || !finalState.accessToken) {
        finalState.clearAuth();
      }
    }
  })();

  return bootstrapPromise;
}
