import Link from "next/link";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { Container } from "@/shared/components/ui/Container";

export function SignupPage() {
  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <Container className="max-w-xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Start learning
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">Sign Up</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Create a frontend-only mock learner state. Real account persistence
            will come after backend auth is designed.
          </p>
          <div className="mt-7">
            <SignupForm />
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            Already registered?{" "}
            <Link href="/login" className="font-bold text-blue-700">
              Login
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
