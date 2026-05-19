export type AuthRole = "learner" | "admin" | "partner";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: AuthRole;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  password: string;
};

export type SsoProvider = "google" | "linkedin" | "microsoft" | "enterprise";
