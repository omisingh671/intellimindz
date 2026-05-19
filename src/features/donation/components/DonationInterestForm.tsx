"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { donationAmounts } from "@/features/donation/data/donation.data";
import {
  donationInterestSchema,
  type DonationInterestValues,
} from "@/features/donation/schemas/donation.schema";
import { Button } from "@/shared/components/ui/Button";
import { FormError } from "@/shared/components/ui/FormError";
import { Input } from "@/shared/components/ui/Input";
import { cn } from "@/shared/lib/utils";

export function DonationInterestForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<DonationInterestValues>({
    resolver: zodResolver(donationInterestSchema),
    defaultValues: {
      amount: "20000",
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  const selectedAmount = useWatch({ control, name: "amount" });

  function onSubmit() {
    setSubmitted(true);
    reset({ amount: "20000", firstName: "", lastName: "", email: "" });
  }

  return (
    <form
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <h3 className="text-xl font-bold text-slate-950">Select Donation Amount</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {donationAmounts.map((amount) => (
          <button
            key={amount.value}
            type="button"
            className={cn(
              "min-h-12 rounded-xl border px-4 text-sm font-bold transition",
              selectedAmount === String(amount.value)
                ? "border-emerald-400 bg-emerald-50 text-slate-950"
                : "border-slate-200 bg-white text-slate-700 hover:border-blue-300",
            )}
            onClick={() =>
              setValue("amount", String(amount.value), { shouldValidate: true })
            }
          >
            {amount.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <Input placeholder="Or enter an amount" {...register("amount")} />
        <FormError message={errors.amount?.message} />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <Input placeholder="First Name" {...register("firstName")} />
          <FormError message={errors.firstName?.message} />
        </div>
        <div>
          <Input placeholder="Last Name" {...register("lastName")} />
          <FormError message={errors.lastName?.message} />
        </div>
      </div>
      <div className="mt-4">
        <Input type="email" placeholder="Email Address" {...register("email")} />
        <FormError message={errors.email?.message} />
      </div>
      <Button type="submit" className="mt-6 w-full" disabled={isSubmitting}>
        Be a Part of the Change
      </Button>
      <p className="mt-4 text-center text-xs text-slate-500">
        Donations are interest-only for now. Payment gateway integration is pending.
      </p>
      {submitted ? (
        <p className="mt-3 text-center text-sm font-medium text-emerald-700">
          Sponsorship interest captured locally for this phase.
        </p>
      ) : null}
    </form>
  );
}
