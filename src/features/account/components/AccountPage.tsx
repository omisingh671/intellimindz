import { AuthRequiredGate } from "@/features/auth/components/AuthRequiredGate";
import { ProfileForm } from "@/features/account/components/ProfileForm";
import { Container } from "@/shared/components/ui/Container";

export function AccountPage() {
  return (
    <main className="bg-slate-50 py-10 sm:py-14">
      <AuthRequiredGate />
      <Container className="space-y-6">
        <section className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">
            Account
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Profile
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Keep your account details current for learner support, course
            enquiries, and future program updates.
          </p>
        </section>
        <ProfileForm />
      </Container>
    </main>
  );
}
