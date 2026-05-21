export type AuthRole = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "LEARNER";
export type LearnerType = "student" | "professional" | "regulator";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  mobile?: string;
  city?: string;
  learnerType?: LearnerType;
  role: AuthRole;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  name: string;
  email: string;
  mobile?: string;
  city: string;
  learnerType: LearnerType;
  password: string;
};

export type SsoProvider =
  | "google"
  | "linkedin"
  | "github"
  | "microsoft"
  | "enterprise";
