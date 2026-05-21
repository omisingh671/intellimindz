import Link from "next/link";
import type { CategoryDetail } from "@/features/categories/types/category.types";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { cn } from "@/shared/lib/utils";
import { Icons } from "@/shared/icons/icon-registry";

type CategoryHeroProps = {
  hero: CategoryDetail["hero"];
};

const heroGradientClasses: Record<CategoryDetail["hero"]["gradient"], string> = {
  blue: "from-blue-950 via-blue-900 to-blue-700",
  teal: "from-blue-950 via-blue-900 to-teal-700",
  green: "from-slate-950 via-blue-900 to-emerald-700",
};

export function CategoryHero({ hero }: CategoryHeroProps) {
  const Icon = Icons[hero.icon];

  return (
    <section>
      <div className="border-b border-slate-200 bg-white py-3">
        <Container>
          <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="font-semibold text-blue-700 hover:text-blue-900">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/categories"
              className="font-semibold text-blue-700 hover:text-blue-900"
            >
              Categories
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-slate-600">{hero.title.replace(" Courses", "")}</span>
          </nav>
        </Container>
      </div>

      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br py-16 text-white sm:py-20 lg:py-24",
          heroGradientClasses[hero.gradient],
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white shadow-sm backdrop-blur">
                <Icon className="size-4" />
                {hero.badge}
              </span>
              <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-[1.18] sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-blue-50/90 sm:text-lg">
                {hero.description}
              </p>

              {hero.ctas.length > 0 ? (
                <div className="mt-9 flex flex-wrap gap-3">
                  {hero.ctas.map((cta) =>
                    cta.variant === "outline" ? (
                      <Link
                        key={cta.href}
                        href={cta.href}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 px-6 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900"
                      >
                        {cta.label}
                      </Link>
                    ) : (
                      <ButtonLink
                        key={cta.href}
                        href={cta.href}
                        className="min-h-12 bg-white px-6 text-blue-950 hover:bg-blue-50"
                      >
                        {cta.label}
                        <Icons.arrowRight className="size-4" />
                      </ButtonLink>
                    ),
                  )}
                </div>
              ) : null}
            </div>

            {hero.stats.length > 0 ? (
              <div className="grid gap-4">
                {hero.stats.map((stat) => {
                  const StatIcon = Icons[stat.icon];

                  return (
                    <div
                      key={`${stat.value}-${stat.label}`}
                      className="flex items-center gap-4 rounded-[1.35rem] border border-white/15 bg-white/12 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.18)] backdrop-blur"
                    >
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15 text-white">
                        <StatIcon className="size-5" />
                      </span>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-sm text-blue-50/75">{stat.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </Container>
      </div>
    </section>
  );
}
