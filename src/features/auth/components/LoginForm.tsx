"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/Button";
import { FormError } from "@/shared/components/ui/FormError";
import { Input } from "@/shared/components/ui/Input";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/login.schema";
import { getAuthErrorMessage, useLoginMutation } from "@/features/auth/hooks";

export function LoginForm() {
  const loginMutation = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    loginMutation.mutate(values);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label
          htmlFor="login-email"
          className="mb-2 block text-sm font-semibold text-slate-800"
        >
          Email address
        </label>
        <Input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        <FormError message={errors.email?.message} />
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between gap-4">
          <label
            htmlFor="login-password"
            className="block text-sm font-semibold text-slate-800"
          >
            Password
          </label>
          <Link
            href="/contact"
            className="text-sm font-semibold text-blue-700 transition hover:text-blue-900"
          >
            Need help?
          </Link>
        </div>
        <Input
          id="login-password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          {...register("password")}
        />
        <FormError message={errors.password?.message} />
      </div>
      <Button
        type="submit"
        variant="accent"
        className="w-full shadow-yellow-400/30"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Login"}
      </Button>
      {loginMutation.isError ? (
        <p className="text-center text-sm font-medium text-red-600">
          {getAuthErrorMessage(
            loginMutation.error,
            "Unable to login right now.",
          )}
        </p>
      ) : null}
      {loginMutation.isSuccess ? (
        <p className="text-center text-sm font-medium text-emerald-700">
          You&apos;re signed in for this session.
        </p>
      ) : null}
    </form>
  );
}
