"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/Button";
import { FormError } from "@/shared/components/ui/FormError";
import { Input } from "@/shared/components/ui/Input";
import { cn } from "@/shared/lib/utils";
import {
  learnerTypeOptions,
  signupSchema,
  type SignupFormValues,
} from "@/features/auth/schemas/signup.schema";
import { getAuthErrorMessage, useSignupMutation } from "@/features/auth/hooks";

export function SignupForm() {
  const signupMutation = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      city: "",
      learnerType: "student",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: SignupFormValues) {
    signupMutation.mutate({
      city: values.city,
      email: values.email,
      learnerType: values.learnerType,
      mobile: values.mobile || undefined,
      name: values.name,
      password: values.password,
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="signup-name"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Full name
          </label>
          <Input
            id="signup-name"
            autoComplete="name"
            placeholder="Your full name"
            {...register("name")}
          />
          <FormError message={errors.name?.message} />
        </div>
        <div>
          <label
            htmlFor="signup-email"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Email address
          </label>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...register("email")}
          />
          <FormError message={errors.email?.message} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="signup-mobile"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Mobile no <span className="font-medium text-slate-400">(optional)</span>
          </label>
          <Input
            id="signup-mobile"
            type="tel"
            autoComplete="tel"
            placeholder="Mobile number"
            {...register("mobile")}
          />
          <FormError message={errors.mobile?.message} />
        </div>
        <div>
          <label
            htmlFor="signup-city"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            City
          </label>
          <Input
            id="signup-city"
            autoComplete="address-level2"
            placeholder="Your city"
            {...register("city")}
          />
          <FormError message={errors.city?.message} />
        </div>
      </div>

      <div>
        <label
          htmlFor="signup-learner-type"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Learner type
        </label>
        <select
          id="signup-learner-type"
          className={cn(
            "min-h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100",
            errors.learnerType && "border-red-300 focus:border-red-400 focus:ring-red-100",
          )}
          {...register("learnerType")}
        >
          {learnerTypeOptions.map((type) => (
            <option key={type} value={type}>
              {formatLearnerType(type)}
            </option>
          ))}
        </select>
        <FormError message={errors.learnerType?.message} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="signup-password"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Password
          </label>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            placeholder="Create password"
            {...register("password")}
          />
          <FormError message={errors.password?.message} />
        </div>
        <div>
          <label
            htmlFor="signup-confirm-password"
            className="mb-2 block text-sm font-semibold text-slate-800"
          >
            Confirm password
          </label>
          <Input
            id="signup-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <FormError message={errors.confirmPassword?.message} />
        </div>
      </div>
      <Button
        type="submit"
        variant="accent"
        className="w-full shadow-yellow-400/30"
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? "Creating account..." : "Create Account"}
      </Button>
      {signupMutation.isError ? (
        <p className="text-center text-sm font-medium text-red-600">
          {getAuthErrorMessage(
            signupMutation.error,
            "Unable to create account right now.",
          )}
        </p>
      ) : null}
      {signupMutation.isSuccess ? (
        <p className="text-center text-sm font-medium text-emerald-700">
          Your learner profile is ready for this session.
        </p>
      ) : null}
    </form>
  );
}

function formatLearnerType(type: SignupFormValues["learnerType"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}
