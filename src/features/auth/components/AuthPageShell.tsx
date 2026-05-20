import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

type AuthPageShellProps = {
  alternateHref: string;
  alternateLabel: string;
  alternatePrompt: string;
  children: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
  visualDescription: string;
  visualTitle: string;
};

const proofPoints = [
  "Financial literacy programs",
  "FinTech and emerging technology tracks",
  "Practical learning for career growth",
];

export function AuthPageShell({
  alternateHref,
  alternateLabel,
  alternatePrompt,
  children,
  description,
  eyebrow,
  title,
  visualDescription,
  visualTitle,
}: AuthPageShellProps) {
  return (
    <main className="bg-linear-to-br from-slate-50 via-white to-blue-50/70 px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <Container className="max-w-6xl px-0">
        <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] lg:grid lg:grid-cols-[1.02fr_0.98fr]">
          <aside className="relative hidden min-h-[760px] overflow-hidden bg-[#0d183d] px-9 py-10 text-white lg:block">
            <div
              className="absolute inset-0 bg-linear-to-br from-[#0d183d] via-blue-950 to-cyan-900"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:44px_44px]"
              aria-hidden="true"
            />

            <Image
              src="/images/auth-ilustration.png"
              alt="Learner account security illustration"
              width={500}
              height={500}
              priority
              className="absolute bottom-3 right-3 z-10 h-auto w-52 object-contain drop-shadow-2xl xl:w-60"
            />

            <div className="relative z-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50 backdrop-blur">
                <Icons.shieldCheck className="size-4 text-yellow-300" />
                Secure learner access
              </span>
              <h2 className="mt-8 max-w-md text-4xl font-bold leading-tight tracking-tight">
                {visualTitle}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-7 text-blue-50/78">
                {visualDescription}
              </p>

              <div className="mt-8 grid max-w-[390px] gap-3">
                {proofPoints.map((point) => (
                  <div
                    key={point}
                    className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-blue-50 backdrop-blur"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-yellow-300 text-[#0d183d]">
                      <Icons.check className="size-4" />
                    </span>
                    {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-8 left-9 right-9 z-20 max-w-sm rounded-2xl border border-white/16 bg-white/92 p-4 text-[#0d183d] shadow-xl shadow-slate-950/20 backdrop-blur">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-yellow-300">
                  <Icons.graduationCap className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-bold">
                    Personalized learning access
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    Courses, categories, donations, and enquiries in one place.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
            <div className="mx-auto max-w-md">
              <div className="mb-8 flex justify-center lg:hidden">
                <Image
                  src="/images/auth-ilustration.png"
                  alt="Learner account security illustration"
                  width={220}
                  height={220}
                  priority
                  className="h-32 w-auto object-contain sm:h-40"
                />
              </div>

              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                {eyebrow}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {description}
              </p>

              <div className="mt-8">{children}</div>

              <p className="mt-8 text-center text-sm text-slate-600">
                {alternatePrompt}{" "}
                <Link
                  href={alternateHref}
                  className="font-bold text-blue-700 transition hover:text-blue-900"
                >
                  {alternateLabel}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
