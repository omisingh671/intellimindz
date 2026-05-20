import type { Metadata } from "next";
import { AuthRequiredGate } from "@/features/auth/components/AuthRequiredGate";
import { Container } from "@/shared/components/ui/Container";

export const metadata: Metadata = {
  title: "Account",
};

export default function Page() {
  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <AuthRequiredGate />
      <Container>
        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            Learner Profile
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
            Account
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
            Your profile, enrolled programs, and learning progress will appear
            here when the backend account API is connected.
          </p>
        </section>
      </Container>
    </main>
  );
}
