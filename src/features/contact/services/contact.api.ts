import type { ContactFormValues } from "@/features/contact/schemas/contact.schema";
import { API_ENDPOINTS } from "@/shared/api/api-endpoints";
import { apiRawClient } from "@/shared/api/api-client";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type SubmitContactResponse = {
  lead: {
    id: string;
    status: string;
  };
};

export async function submitContactEnquiry(
  values: ContactFormValues,
  courseId?: string,
) {
  const response = await apiRawClient.post<ApiEnvelope<SubmitContactResponse>>(
    API_ENDPOINTS.forms.lead,
    {
      ...values,
      courseId,
    },
  );

  return unwrapEnvelope(response.data, "Unable to submit enquiry right now.");
}

function unwrapEnvelope<T>(payload: ApiEnvelope<T>, fallbackMessage: string): T {
  if (payload.data) {
    return payload.data;
  }

  throw new Error(payload.message ?? fallbackMessage);
}
