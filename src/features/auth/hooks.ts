"use client";

import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  login,
  logout,
  signup,
  startSso,
} from "@/features/auth/services/auth.api";
import type {
  LoginPayload,
  SignupPayload,
  SsoProvider,
} from "@/features/auth/types/auth.types";

export function useLoginMutation() {
  return useMutation<Session, Error, LoginPayload>({
    mutationFn: login,
  });
}

export function useSignupMutation() {
  return useMutation<Session, Error, SignupPayload>({
    mutationFn: signup,
  });
}

export function useSsoMutation() {
  return useMutation<void, Error, SsoProvider>({
    mutationFn: startSso,
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<void, Error, void>({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      router.refresh();
    },
  });
}

export function getPostAuthRedirectPath(user: Pick<Session["user"], "role">) {
  return user.role === "LEARNER" ? "/" : "/admin/dashboard";
}

export function useGuestRedirect(redirectTo?: string) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (status === "authenticated" && user) {
      router.replace(redirectTo ?? getPostAuthRedirectPath(user));
    }
  }, [redirectTo, router, status, user]);
}

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

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
