import type {
  AuthSession,
  LoginPayload,
  SignupPayload,
  SsoProvider,
} from "@/features/auth/types/auth.types";

export async function login(payload: LoginPayload): Promise<AuthSession> {
  return createMockSession(payload.email, payload.email.split("@")[0] || "Learner");
}

export async function signup(payload: SignupPayload): Promise<AuthSession> {
  return createMockSession(payload.email, payload.name);
}

export async function startSso(provider: SsoProvider): Promise<void> {
  console.info(`SSO provider pending backend integration: ${provider}`);
}

function createMockSession(email: string, name: string): AuthSession {
  return {
    user: {
      id: "mock-user",
      name,
      email,
      role: "learner",
    },
    accessToken: "mock-access-token",
    refreshToken: "mock-refresh-token",
  };
}
