import type { DonationInterestValues } from "@/features/donation/schemas/donation.schema";
import { API_ENDPOINTS } from "@/shared/api/api-endpoints";
import { apiRawClient } from "@/shared/api/api-client";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type SubmitDonationInterestResponse = {
  donationInterest: {
    id: string;
    status: string;
  };
};

type PlaceholderPayment = {
  amountMinor: number;
  currency: string;
  dueAt: string | null;
  id: string;
  installmentNo: number | null;
  mode: string;
  payerEmail: string;
  payerName: string;
  paymentGroupId: string;
  purpose: string;
  status: string;
  totalAmountMinor: number;
};

type SubmitDonationPlaceholderPaymentResponse = {
  donationInterest: {
    id: string;
    status: string;
  };
  payment: PlaceholderPayment;
  payments: PlaceholderPayment[];
};

export async function submitDonationInterest(values: DonationInterestValues) {
  const response = await apiRawClient.post<
    ApiEnvelope<SubmitDonationInterestResponse>
  >(API_ENDPOINTS.forms.donationInterest, values);

  return unwrapEnvelope(
    response.data,
    "Unable to capture sponsorship interest right now.",
  );
}

export async function submitDonationPlaceholderPayment(
  values: DonationInterestValues,
) {
  const response = await apiRawClient.post<
    ApiEnvelope<SubmitDonationPlaceholderPaymentResponse>
  >(API_ENDPOINTS.payments.placeholder, {
    amount: values.amount,
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    purpose: "DONATION",
  });

  return unwrapEnvelope(
    response.data,
    "Unable to create donation payment right now.",
  );
}

function unwrapEnvelope<T>(payload: ApiEnvelope<T>, fallbackMessage: string): T {
  if (payload.data) {
    return payload.data;
  }

  throw new Error(payload.message ?? fallbackMessage);
}
