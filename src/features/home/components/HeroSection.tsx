import { heroStats, learningLevels } from "@/features/home/data/home.data";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#f7fbff_0%,#eef5ff_48%,#edfdf8_100%)] py-16 sm:py-20 lg:py-24">
      <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Icons.sparkles className="size-4 text-amber-500" />
            FinTech learning for the next economy
          </div>
          <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.18] tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
            Future-ready learning for the digital finance economy
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">
            Intellimindz Foundation offers modular FinTech courses across
            digital payments, AI in finance, data science, cybersecurity,
            RegTech, blockchain and sustainable finance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/courses">
              Explore Courses
              <Icons.arrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Find My Learning Path
            </ButtonLink>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white bg-white/75 p-4 shadow-sm"
              >
                <p className="text-2xl font-bold text-slate-950">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white bg-white/75 p-4 shadow-2xl shadow-blue-900/10">
          <div className="rounded-[1.5rem] bg-slate-50 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-slate-500">
                  Our learning approach
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  From awareness to expertise
                </h2>
              </div>
              <span className="grid size-12 place-items-center rounded-full border border-slate-200 bg-white shadow-sm">
                <Icons.graduationCap className="size-5 text-blue-700" />
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {learningLevels.map((level) => (
                <div
                  key={level.step}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                      {level.step}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                          {level.label}
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {level.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-bold text-slate-800">
                        {level.outcome}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Ideal for: {level.idealFor}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
