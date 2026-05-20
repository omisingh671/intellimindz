import { AuthGuestRedirect } from "@/features/auth/components/AuthGuestRedirect";
import { AuthPageShell } from "@/features/auth/components/AuthPageShell";
import { SignupForm } from "@/features/auth/components/SignupForm";
import { SocialLoginButtons } from "@/features/auth/components/SocialLoginButtons";

export function SignupPage() {
  return (
    <AuthPageShell
      alternateHref="/login"
      alternateLabel="Login"
      alternatePrompt="Already registered?"
      description="Create your learner account to follow course categories, request guidance, and stay connected with Intellimindz programs."
      eyebrow="Start learning"
      title="Create your account"
      visualDescription="Begin with a simple profile today, then grow into courses, learning levels, donations, and support workflows as the platform expands."
      visualTitle="Start your learning journey with us."
    >
      <AuthGuestRedirect />
      <div className="space-y-6">
        <SocialLoginButtons />
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          Or sign up with email
          <span className="h-px flex-1 bg-slate-200" />
        </div>
        <SignupForm />
      </div>
    </AuthPageShell>
  );
}
