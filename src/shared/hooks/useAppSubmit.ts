"use client";

import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { useToast } from "@/shared/providers/ToastProvider";

type ApiErrorEnvelope = {
  message?: string;
};

type SubmitMessage<TResult> = string | ((result: TResult) => string);

type RunSubmitOptions<TResult> = {
  action: () => Promise<TResult> | TResult;
  successMessage?: SubmitMessage<TResult>;
  errorMessage?: string;
  onSuccess?: (result: TResult) => Promise<void> | void;
  onError?: (error: unknown) => Promise<void> | void;
};

export function useAppSubmit() {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetSubmitState = useCallback(() => {
    setSuccessMessage(null);
    setErrorMessage(null);
  }, []);

  const runSubmit = useCallback(
    async <TResult,>({
      action,
      errorMessage: fallbackErrorMessage,
      onError,
      onSuccess,
      successMessage: nextSuccessMessage,
    }: RunSubmitOptions<TResult>) => {
      setIsSubmitting(true);
      resetSubmitState();

      try {
        const result = await action();

        if (nextSuccessMessage) {
          const message = resolveSubmitMessage(nextSuccessMessage, result);
          setSuccessMessage(message);
          showToast({
            message,
            title: "Success",
            type: "success",
          });
        }

        await onSuccess?.(result);

        return result;
      } catch (error) {
        const message = getAppSubmitErrorMessage(error, fallbackErrorMessage);
        setErrorMessage(message);
        showToast({
          message,
          title: "Action failed",
          type: "error",
        });
        await onError?.(error);

        return undefined;
      } finally {
        setIsSubmitting(false);
      }
    },
    [resetSubmitState, showToast],
  );

  return {
    errorMessage,
    isSubmitting,
    resetSubmitState,
    runSubmit,
    successMessage,
  };
}

export function getAppSubmitErrorMessage(error: unknown, fallback?: string) {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorEnvelope | undefined;

    if (data?.message) {
      return data.message;
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback ?? "Something went wrong. Please try again.";
}

function resolveSubmitMessage<TResult>(
  message: SubmitMessage<TResult>,
  result: TResult,
) {
  return typeof message === "function" ? message(result) : message;
}
