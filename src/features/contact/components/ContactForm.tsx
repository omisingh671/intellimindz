"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/Button";
import { FormError } from "@/shared/components/ui/FormError";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { useAppSubmit } from "@/shared/hooks/useAppSubmit";
import {
  contactLearnerTypeOptions,
  contactSchema,
  type ContactFormValues,
} from "@/features/contact/schemas/contact.schema";
import { submitContactEnquiry } from "@/features/contact/services/contact.api";

type ContactFormProps = {
  courseId?: string;
};

export function ContactForm({ courseId }: ContactFormProps) {
  const submit = useAppSubmit();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    const successMessage = courseId
      ? "Thanks. Your course enquiry has been submitted."
      : "Thanks. Your enquiry has been submitted.";

    void submit.runSubmit({
      action: () => submitContactEnquiry(values, courseId),
      errorMessage: "Unable to submit enquiry right now.",
      successMessage,
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <form
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <Input placeholder="Name" {...register("name")} />
          <FormError message={errors.name?.message} />
        </Field>
        <Field>
          <Input placeholder="Email" type="email" {...register("email")} />
          <FormError message={errors.email?.message} />
        </Field>
        <Field>
          <Input placeholder="Phone" {...register("phone")} />
          <FormError message={errors.phone?.message} />
        </Field>
        <Field>
          <select
            className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            {...register("learnerType")}
          >
            <option value="">Learner type</option>
            {contactLearnerTypeOptions.map((type) => (
              <option key={type} value={type}>
                {formatLearnerType(type)}
              </option>
            ))}
          </select>
          <FormError message={errors.learnerType?.message} />
        </Field>
      </div>
      <div className="mt-4">
        <Textarea
          placeholder="Tell us what you want to learn"
          {...register("message")}
        />
        <FormError message={errors.message?.message} />
      </div>
      <Button type="submit" className="mt-5 w-full" disabled={submit.isSubmitting}>
        {submit.isSubmitting ? "Submitting..." : "Submit Enquiry"}
      </Button>
      {submit.errorMessage ? (
        <p className="mt-4 text-center text-sm font-medium text-red-600">
          {submit.errorMessage}
        </p>
      ) : null}
      {submit.successMessage ? (
        <p className="mt-4 text-center text-sm font-medium text-emerald-700">
          {submit.successMessage}
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  children: React.ReactNode;
};

function Field({ children }: FieldProps) {
  return <div>{children}</div>;
}

function formatLearnerType(type: ContactFormValues["learnerType"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
