"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/Button";
import { FormError } from "@/shared/components/ui/FormError";
import { Input } from "@/shared/components/ui/Input";
import {
  signupSchema,
  type SignupFormValues,
} from "@/features/auth/schemas/signup.schema";
import { signup } from "@/features/auth/services/auth.api";
import { useAuthStore } from "@/features/auth/stores/auth.store";

export function SignupForm() {
  const [message, setMessage] = useState<string | null>(null);
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    const session = await signup(values);
    setSession(session);
    setMessage("Mock account created locally. Backend auth is still pending.");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <Input placeholder="Full name" {...register("name")} />
        <FormError message={errors.name?.message} />
      </div>
      <div>
        <Input type="email" placeholder="Email address" {...register("email")} />
        <FormError message={errors.email?.message} />
      </div>
      <div>
        <Input type="password" placeholder="Password" {...register("password")} />
        <FormError message={errors.password?.message} />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword")}
        />
        <FormError message={errors.confirmPassword?.message} />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Create Account
      </Button>
      {message ? (
        <p className="text-center text-sm font-medium text-emerald-700">{message}</p>
      ) : null}
    </form>
  );
}
