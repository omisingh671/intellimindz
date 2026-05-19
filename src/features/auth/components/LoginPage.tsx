import Link from "next/link";
import { EnterpriseLoginButton } from "@/features/auth/components/EnterpriseLoginButton";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";
import { Container } from "@/shared/components/ui/Container";

export function LoginPage() {
  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <Container className="max-w-xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Learner access
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">Login</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Frontend auth is mock-based for now. Real JWT, refresh token, RBAC,
            and SSO flows will be connected in a later backend phase.
          </p>
          <div className="mt-7 space-y-5">
            <LoginForm />
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              Or
              <span className="h-px flex-1 bg-slate-200" />
            </div>
            <SocialLoginButtons />
            <EnterpriseLoginButton />
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            New here?{" "}
            <Link href="/signup" className="font-bold text-blue-700">
              Create an account
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
