"use client";

import { getAuthErrorMessage, useSsoMutation } from "@/features/auth/hooks";
import type { SsoProvider } from "@/features/auth/types/auth.types";

type SocialButton = {
  label: string;
  provider: SsoProvider;
  className: string;
  icon: React.ComponentType<{ className?: string }>;
};

const socialButtons: SocialButton[] = [
  {
    label: "Google",
    provider: "google",
    icon: GoogleIcon,
    className:
      "border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50",
  },
  {
    label: "LinkedIn",
    provider: "linkedin",
    icon: LinkedInIcon,
    className:
      "border-[#0A66C2] bg-[#0A66C2] text-white hover:border-[#004182] hover:bg-[#004182]",
  },
  {
    label: "GitHub",
    provider: "github",
    icon: GitHubIcon,
    className:
      "border-slate-950 bg-slate-950 text-white hover:border-slate-800 hover:bg-slate-800",
  },
];

export function SocialLoginButtons() {
  const ssoMutation = useSsoMutation();
  const activeProvider = ssoMutation.isPending ? ssoMutation.variables : null;
  const activeLabel = socialButtons.find(
    (button) => button.provider === ssoMutation.variables,
  )?.label;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {socialButtons.map(({ label, provider, icon: Icon, className }) => {
          const isLoading = activeProvider === provider;

          return (
            <button
              key={provider}
              type="button"
              onClick={() => ssoMutation.mutate(provider)}
              className={`inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
              aria-label={`Continue with ${label}`}
              disabled={ssoMutation.isPending}
            >
              <Icon className="size-5" />
              {isLoading ? "Connecting..." : label}
            </button>
          );
        })}
      </div>
      {ssoMutation.isError ? (
        <p className="text-center text-sm font-medium text-red-600">
          {getAuthErrorMessage(
            ssoMutation.error,
            "Social sign-in is temporarily unavailable.",
          )}
        </p>
      ) : null}
      {ssoMutation.isSuccess && activeLabel ? (
        <p className="text-center text-sm font-medium text-emerald-700">
          {activeLabel} sign-in is ready for this session.
        </p>
      ) : null}
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      role="img"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.23c0-.74-.07-1.45-.19-2.14H12v4.05h5.38a4.6 4.6 0 0 1-2 3.02v2.52h3.24c1.9-1.75 2.98-4.32 2.98-7.45Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.96-.9 6.62-2.42l-3.24-2.52c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H3.07v2.6A10 10 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.42 13.9a6.02 6.02 0 0 1 0-3.8V7.5H3.07a10 10 0 0 0 0 9l3.35-2.6Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A9.63 9.63 0 0 0 12 2 10 10 0 0 0 3.07 7.5l3.35 2.6C7.2 7.74 9.4 5.98 12 5.98Z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      role="img"
    >
      <path
        fill="currentColor"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.61 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      role="img"
    >
      <path
        fill="currentColor"
        d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.41-4.04-1.41-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
      />
    </svg>
  );
}
