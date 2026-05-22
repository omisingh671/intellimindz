import type { CoursePaymentValues } from "@/features/courses/schemas/course-payment.schema";
import { API_ENDPOINTS } from "@/shared/api/api-endpoints";
import { apiRawClient } from "@/shared/api/api-client";

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  message?: string;
};

type PlaceholderPayment = {
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

type SubmitCoursePlaceholderPaymentResponse = {
  payment: PlaceholderPayment;
  paymentGroupId: string;
  payments: PlaceholderPayment[];
};

export async function submitCoursePlaceholderPayment(
  courseId: string,
  values: CoursePaymentValues,
) {
  const response = await apiRawClient.post<
    ApiEnvelope<SubmitCoursePlaceholderPaymentResponse>
  >(API_ENDPOINTS.payments.placeholder, {
    courseId,
    mode: "FULL",
    payerEmail: values.payerEmail,
    payerMobile: values.payerMobile || undefined,
    payerName: values.payerName,
    purpose: "COURSE",
  });

  return unwrapEnvelope(
    response.data,
    "Unable to create course payment right now.",
  );
}

function unwrapEnvelope<T>(payload: ApiEnvelope<T>, fallbackMessage: string): T {
  if (payload.data) {
    return payload.data;
  }

  throw new Error(payload.message ?? fallbackMessage);
}
