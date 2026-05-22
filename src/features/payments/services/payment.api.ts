import { API_ENDPOINTS } from "@/shared/api/api-endpoints";
import { apiRawClient } from "@/shared/api/api-client";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type ConfirmPlaceholderPaymentResponse = {
  payment: {
    amountMinor: number;
    currency: string;
    id: string;
    mode: string;
    payerEmail: string;
    payerName: string;
    paymentGroupId: string;
    purpose: string;
    status: string;
    totalAmountMinor: number;
  };
};

export async function confirmPlaceholderPayment(paymentId: string) {
  const response = await apiRawClient.post<
    ApiEnvelope<ConfirmPlaceholderPaymentResponse>
  >(API_ENDPOINTS.payments.confirmPlaceholder(paymentId));

  return unwrapEnvelope(response.data, "Unable to confirm payment right now.");
}

function unwrapEnvelope<T>(payload: ApiEnvelope<T>, fallbackMessage: string): T {
  if (payload.data) {
    return payload.data;
  }

  throw new Error(payload.message ?? fallbackMessage);
}
