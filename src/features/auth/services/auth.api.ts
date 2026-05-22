import { signIn, signOut } from "next-auth/react";
import type {
  AuthSession,
  AuthUser,
  LoginPayload,
  SignupPayload,
  SsoProvider,
} from "@/features/auth/types/auth.types";
import { API_ENDPOINTS } from "@/shared/api/api-endpoints";
import { apiClient, apiRawClient } from "@/shared/api/api-client";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type CurrentUserResponse = {
  user: AuthUser;
};

export async function login(payload: LoginPayload): Promise<AuthSession> {
  const result = await signIn("credentials", {
    email: payload.email,
    password: payload.password,
    redirect: false,
  });

  if (!result || result.error) {
    throw new Error("Invalid email or password.");
  }

  return getCurrentAuthSession();
}

export async function signup(payload: SignupPayload): Promise<AuthSession> {
  const response = await apiRawClient.post<ApiEnvelope<CurrentUserResponse>>(
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

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await apiClient.get<ApiEnvelope<CurrentUserResponse>>(
    API_ENDPOINTS.auth.me,
  );

  return unwrapEnvelope(response.data, "Unable to load current user.");
}

export async function getCurrentAuthSession(): Promise<AuthSession> {
  const { user } = await getCurrentUser();

  return { user };
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
