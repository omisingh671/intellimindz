"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/features/auth/types/auth.types";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type SetAuthPayload = {
  user: AuthUser;
  accessToken: string;
};

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  status: AuthStatus;
  setAuth: (payload: SetAuthPayload) => void;
  setLoading: () => void;
  clearAuth: () => void;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      status: "loading",
      setAuth: ({ user, accessToken }) =>
        set({
          user,
          accessToken,
          status: "authenticated",
        }),
      setLoading: () =>
        set({
          status: "loading",
        }),
      clearAuth: () =>
        set({
          user: null,
          accessToken: null,
          status: "unauthenticated",
        }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          status: "unauthenticated",
        }),
      isAuthenticated: () => {
        const { accessToken, status, user } = get();

        return status === "authenticated" && Boolean(user && accessToken);
      },
    }),
    {
      name: "intellimindz-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        status: state.status,
      }),
    },
  ),
);
