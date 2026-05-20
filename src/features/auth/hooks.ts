"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  login,
  logout,
  signup,
  startSso,
} from "@/features/auth/services/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import type {
  AuthSession,
  LoginPayload,
  SignupPayload,
  SsoProvider,
} from "@/features/auth/types/auth.types";

export function useLoginMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<AuthSession, Error, LoginPayload>({
    mutationFn: login,
    onSuccess: (session) => {
      setAuth(session);
    },
  });
}

export function useSignupMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<AuthSession, Error, SignupPayload>({
    mutationFn: signup,
    onSuccess: (session) => {
      setAuth(session);
    },
  });
}

export function useSsoMutation() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<AuthSession, Error, SsoProvider>({
    mutationFn: startSso,
    onSuccess: (session) => {
      setAuth(session);
    },
  });
}

export function useLogoutMutation() {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSettled: () => {
      clearAuth();
      queryClient.clear();
    },
  });
}

export function useGuestRedirect(redirectTo = "/") {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (status === "authenticated" && user) {
      router.replace(redirectTo);
    }
  }, [redirectTo, router, status, user]);
}

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (status === "unauthenticated" || (status === "authenticated" && !user)) {
      router.replace(redirectTo);
    }
  }, [redirectTo, router, status, user]);

  return { status, user };
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}
