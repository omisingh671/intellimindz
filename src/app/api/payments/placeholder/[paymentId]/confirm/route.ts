import { NextRequest } from "next/server";
import {
  confirmPlaceholderPayment,
  PaymentInputError,
} from "@/features/payments/services/placeholder-payment.service";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

type RouteContext = {
  params: Promise<{
    paymentId: string;
  }>;
};

export async function POST(_request: NextRequest, { params }: RouteContext) {
  try {
    const { paymentId } = await params;
    const result = await confirmPlaceholderPayment(paymentId);

    return ok(result);
  } catch (error) {
    if (error instanceof PaymentInputError) {
      return fail(error.message, error.status);
    }

    return handleRouteError(error);
  }
}
