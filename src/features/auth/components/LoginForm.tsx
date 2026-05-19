"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/Button";
import { FormError } from "@/shared/components/ui/FormError";
import { Input } from "@/shared/components/ui/Input";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/login.schema";
import { login } from "@/features/auth/services/auth.api";
import { useAuthStore } from "@/features/auth/stores/auth.store";

export function LoginForm() {
  const [message, setMessage] = useState<string | null>(null);
  const setSession = useAuthStore((state) => state.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    const session = await login(values);
    setSession(session);
    setMessage("Mock login ready. Real JWT and refresh flow will be wired later.");
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <Input type="email" placeholder="Email address" {...register("email")} />
        <FormError message={errors.email?.message} />
      </div>
      <div>
        <Input type="password" placeholder="Password" {...register("password")} />
        <FormError message={errors.password?.message} />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Login
      </Button>
      {message ? (
        <p className="text-center text-sm font-medium text-emerald-700">{message}</p>
      ) : null}
    </form>
  );
}
