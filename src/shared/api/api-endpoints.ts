export const API_ENDPOINTS = {
  auth: {
    signup: "/auth/register",
    me: "/auth/me",
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
