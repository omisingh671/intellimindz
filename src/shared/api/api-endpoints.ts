export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    signup: "/auth/register",
    logout: "/auth/logout",
    refreshSession: "/auth/refresh",
    me: "/auth/me",
    ssoStart: (provider: string) => `/auth/sso/${provider}/start`,
  },
  forms: {
    lead: "/leads",
    donationInterest: "/donation-interest",
  },
} as const;
