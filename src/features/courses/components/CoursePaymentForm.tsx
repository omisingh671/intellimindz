"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  coursePaymentSchema,
  type CoursePaymentValues,
} from "@/features/courses/schemas/course-payment.schema";
import { submitCoursePlaceholderPayment } from "@/features/courses/services/course-payment.api";
import { Button } from "@/shared/components/ui/Button";
import { FormError } from "@/shared/components/ui/FormError";
import { Input } from "@/shared/components/ui/Input";
import { useAppSubmit } from "@/shared/hooks/useAppSubmit";

type CoursePaymentFormProps = {
  courseId: string;
};

export function CoursePaymentForm({ courseId }: CoursePaymentFormProps) {
  const router = useRouter();
  const submit = useAppSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CoursePaymentValues>({
    resolver: zodResolver(coursePaymentSchema),
    defaultValues: {
      payerEmail: "",
      payerMobile: "",
      payerName: "",
    },
  });

  function onSubmit(values: CoursePaymentValues) {
    void submit.runSubmit({
      action: () => submitCoursePlaceholderPayment(courseId, values),
      errorMessage: "Unable to create course payment right now.",
      successMessage: "Course payment placeholder created.",
      onSuccess: (result) => {
        router.push(`/payments/${result.payment.id}`);
      },
    });
  }

  return (
    <form
      className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.08)]"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h2 className="text-xl font-bold text-slate-950">Learner details</h2>
      <div className="mt-5 grid gap-4">
        <div>
          <Input placeholder="Name" {...register("payerName")} />
          <FormError message={errors.payerName?.message} />
        </div>
        <div>
          <Input
            placeholder="Email"
            type="email"
            {...register("payerEmail")}
          />
          <FormError message={errors.payerEmail?.message} />
        </div>
        <div>
          <Input placeholder="Mobile (optional)" {...register("payerMobile")} />
          <FormError message={errors.payerMobile?.message} />
        </div>
      </div>
      <Button type="submit" className="mt-6 w-full" disabled={submit.isSubmitting}>
        {submit.isSubmitting ? "Creating..." : "Create Payment Placeholder"}
      </Button>
      <p className="mt-4 text-center text-xs text-slate-500">
        This creates a local payment record only. Real gateway integration is
        pending.
      </p>
      {submit.errorMessage ? (
        <p className="mt-3 text-center text-sm font-medium text-red-600">
          {submit.errorMessage}
        </p>
      ) : null}
    </form>
  );
}
