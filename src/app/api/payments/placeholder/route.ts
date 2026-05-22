import { NextRequest } from "next/server";
import {
  createPlaceholderPayment,
  PaymentInputError,
  placeholderPaymentSchema,
} from "@/features/payments/services/placeholder-payment.service";
import { handleRouteError } from "@/server/http/handle-route-error";
import { fail, ok } from "@/server/http/responses";

export async function POST(request: NextRequest) {
  try {
    const parsed = placeholderPaymentSchema.safeParse(
      await request.json().catch(() => null),
    );

    if (!parsed.success) {
      return fail("Check the payment details and try again.", 422);
    }

    const result = await createPlaceholderPayment(parsed.data);

    return ok(result, { status: 201 });
  } catch (error) {
    if (error instanceof PaymentInputError) {
      return fail(error.message, error.status);
    }

    return handleRouteError(error);
  }
}
