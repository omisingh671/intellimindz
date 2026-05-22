"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/features/auth/types/auth.types";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type SetAuthPayload = {
  user: AuthUser;
};

type AuthState = {
  user: AuthUser | null;
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
      status: "loading",
      setAuth: ({ user }) =>
        set({
          user,
          status: "authenticated",
        }),
      setLoading: () =>
        set({
          status: "loading",
        }),
      clearAuth: () =>
        set({
          user: null,
          status: "unauthenticated",
        }),
      logout: () =>
        set({
          user: null,
          status: "unauthenticated",
        }),
      isAuthenticated: () => {
        const { status, user } = get();

        return status === "authenticated" && Boolean(user);
      },
    }),
    {
      name: "intellimindz-auth",
      partialize: (state) => ({
        user: state.user,
        status: state.status,
      }),
    },
  ),
);
