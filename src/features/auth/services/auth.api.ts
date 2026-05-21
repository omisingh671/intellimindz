import { AxiosError } from "axios";
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

const ssoProviderProfiles: Record<SsoProvider, { email: string; name: string }> =
  {
    google: {
      email: "google.learner@intellimindz.local",
      name: "Google Learner",
    },
    linkedin: {
      email: "linkedin.learner@intellimindz.local",
      name: "LinkedIn Learner",
    },
    github: {
      email: "github.learner@intellimindz.local",
      name: "GitHub Learner",
    },
    microsoft: {
      email: "microsoft.learner@intellimindz.local",
      name: "Microsoft Learner",
    },
    enterprise: {
      email: "enterprise.learner@intellimindz.local",
      name: "Enterprise Learner",
    },
  };

export async function login(payload: LoginPayload): Promise<AuthSession> {
  try {
    const response = await apiRawClient.post<ApiEnvelope<AuthSession>>(
      API_ENDPOINTS.auth.login,
      payload,
    );

    return unwrapEnvelope(response.data, "Unable to login right now.");
  } catch (error) {
    if (shouldUseMockAuth(error)) {
      return createMockSession(
        payload.email,
        payload.email.split("@")[0] || "Learner",
      );
    }

    throw createAuthError(error, "Unable to login right now.");
  }
}

export async function signup(payload: SignupPayload): Promise<AuthSession> {
  try {
    const response = await apiRawClient.post<ApiEnvelope<AuthSession>>(
      API_ENDPOINTS.auth.signup,
      payload,
    );

    return unwrapEnvelope(response.data, "Unable to create account right now.");
  } catch (error) {
    if (shouldUseMockAuth(error)) {
      return createMockSession(payload.email, payload.name, "mock-user", {
        city: payload.city,
        learnerType: payload.learnerType,
        mobile: payload.mobile || undefined,
      });
    }

    throw createAuthError(error, "Unable to create account right now.");
  }
}

export async function logout(): Promise<void> {
  try {
    await apiRawClient.post(API_ENDPOINTS.auth.logout);
  } catch (error) {
    if (!shouldUseMockAuth(error)) {
      throw createAuthError(error, "Unable to logout right now.");
    }
  }
}

export async function refreshSession(): Promise<AuthSession> {
  const response = await apiRawClient.post<ApiEnvelope<AuthSession>>(
    API_ENDPOINTS.auth.refreshSession,
  );

  return unwrapEnvelope(response.data, "Unable to refresh session.");
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await apiClient.get<ApiEnvelope<CurrentUserResponse>>(
    API_ENDPOINTS.auth.me,
  );

  return unwrapEnvelope(response.data, "Unable to load current user.");
}

export async function startSso(provider: SsoProvider): Promise<AuthSession> {
  try {
    const response = await apiRawClient.post<ApiEnvelope<AuthSession>>(
      API_ENDPOINTS.auth.ssoStart(provider),
    );

    return unwrapEnvelope(response.data, "Unable to start SSO right now.");
  } catch (error) {
    if (shouldUseMockAuth(error)) {
      const profile = ssoProviderProfiles[provider];

      return createMockSession(
        profile.email,
        profile.name,
        `mock-sso-${provider}`,
      );
    }

    throw createAuthError(error, "Unable to start SSO right now.");
  }
}

function unwrapEnvelope<T>(payload: ApiEnvelope<T>, fallbackMessage: string): T {
  if (payload.data) {
    return payload.data;
  }

  throw new Error(payload.message ?? fallbackMessage);
}

function shouldUseMockAuth(error: unknown) {
  if (process.env.NEXT_PUBLIC_AUTH_MOCK === "true") {
    return true;
  }

  if (process.env.NEXT_PUBLIC_AUTH_MOCK === "false") {
    return false;
  }

  if (!(error instanceof AxiosError)) {
    return false;
  }

  return !error.response || error.response.status === 404;
}

function createAuthError(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message) {
    return new Error(error.message);
  }

  return new Error(fallbackMessage);
}

function createMockSession(
  email: string,
  name: string,
  id = "mock-user",
  profile: Pick<AuthUser, "city" | "learnerType" | "mobile"> = {},
): AuthSession {
  return {
    user: {
      id,
      name,
      email,
      ...profile,
      role: "LEARNER",
    },
    accessToken: `${id}-access-token`,
  };
}
