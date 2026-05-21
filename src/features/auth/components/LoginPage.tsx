import { AuthGuestRedirect } from "@/features/auth/components/AuthGuestRedirect";
import { AuthPageShell } from "@/features/auth/components/AuthPageShell";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";

export function LoginPage() {
  return (
    <AuthPageShell
      alternateHref="/signup"
      alternateLabel="Create an account"
      alternatePrompt="New here?"
      description="Access your learning dashboard, saved enquiries, and program updates with a secure learner account."
      eyebrow="Learner access"
      title="Welcome back"
      visualDescription="Continue your financial literacy and emerging technology learning with a clean account experience built for focused progress."
      visualTitle="Pick up your learning journey where you left off."
    >
      <AuthGuestRedirect />
      <div className="space-y-6">
        <SocialLoginButtons />
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          Or continue with email
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <LoginForm />
      </div>
    </AuthPageShell>
  );
}
