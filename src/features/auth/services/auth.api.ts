import type { Session } from "next-auth";
import { getSession, signIn, signOut } from "next-auth/react";
import type {
  LoginPayload,
  SignupPayload,
  SsoProvider,
} from "@/features/auth/types/auth.types";
import { API_ENDPOINTS } from "@/shared/api/api-endpoints";
import { apiRawClient } from "@/shared/api/api-client";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

export async function login(payload: LoginPayload): Promise<Session> {
  const result = await signIn("credentials", {
    email: payload.email,
    password: payload.password,
    redirect: false,
  });

  if (!result || result.error) {
    throw new Error("Invalid email or password.");
  }

  return requireCurrentSession();
}

export async function signup(payload: SignupPayload): Promise<Session> {
  const response = await apiRawClient.post<ApiEnvelope<unknown>>(
    API_ENDPOINTS.auth.signup,
    payload,
  );
  unwrapEnvelope(response.data, "Unable to create account right now.");

  return login({
    email: payload.email,
    password: payload.password,
  });
}

export async function logout(): Promise<void> {
  await signOut({ redirect: false });
}

export async function requireCurrentSession(): Promise<Session> {
  const session = await getSession();

  if (!session?.user?.id || !session.user.isActive) {
    throw new Error("Unable to load the signed-in session.");
  }

  return session;
}

export async function startSso(provider: SsoProvider): Promise<void> {
  await signIn(provider, { callbackUrl: "/" });
}

function unwrapEnvelope<T>(payload: ApiEnvelope<T>, fallbackMessage: string): T {
  if (payload.data) {
    return payload.data;
  }

  throw new Error(payload.message ?? fallbackMessage);
}
