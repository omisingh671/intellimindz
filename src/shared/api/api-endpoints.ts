export const API_ENDPOINTS = {
  account: {
    profile: "/account/profile",
  },
  auth: {
    signup: "/auth/register",
  },
  forms: {
    lead: "/leads",
    donationInterest: "/donation-interest",
  },
  payments: {
    placeholder: "/payments/placeholder",
    confirmPlaceholder: (paymentId: string) =>
      `/payments/placeholder/${paymentId}/confirm`,
  },
} as const;
