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

export async function submitDonationInterest(values: DonationInterestValues) {
  const response = await apiRawClient.post<
    ApiEnvelope<SubmitDonationInterestResponse>
  >(API_ENDPOINTS.forms.donationInterest, values);

  return unwrapEnvelope(
    response.data,
    "Unable to capture sponsorship interest right now.",
  );
}

function unwrapEnvelope<T>(payload: ApiEnvelope<T>, fallbackMessage: string): T {
  if (payload.data) {
    return payload.data;
  }

  throw new Error(payload.message ?? fallbackMessage);
}
