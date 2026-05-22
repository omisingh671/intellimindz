"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/Button";
import { useAppSubmit } from "@/shared/hooks/useAppSubmit";
import { confirmPlaceholderPayment } from "@/features/payments/services/payment.api";

type ConfirmPlaceholderPaymentButtonProps = {
  paymentId: string;
};

export function ConfirmPlaceholderPaymentButton({
  paymentId,
}: ConfirmPlaceholderPaymentButtonProps) {
  const router = useRouter();
  const submit = useAppSubmit();

  function onConfirm() {
    void submit.runSubmit({
      action: () => confirmPlaceholderPayment(paymentId),
      errorMessage: "Unable to confirm payment right now.",
      successMessage: "Payment confirmed.",
      onSuccess: () => {
        router.refresh();
      },
    });
  }

  return (
    <div>
      <Button
        type="button"
        className="w-full sm:w-auto"
        disabled={submit.isSubmitting}
        onClick={onConfirm}
      >
        {submit.isSubmitting ? "Confirming..." : "Confirm Payment"}
      </Button>
      {submit.errorMessage ? (
        <p className="mt-3 text-sm font-medium text-red-600">
          {submit.errorMessage}
        </p>
      ) : null}
    </div>
  );
}
