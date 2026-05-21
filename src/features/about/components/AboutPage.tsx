import { aboutHighlights } from "@/features/about/data/about.data";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

export function AboutPage() {
  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
              About Us
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-normal text-slate-950">
              Practical financial learning for a digital economy
            </h1>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Intellimindz Foundation is starting with focused, affordable
              education across financial literacy and FinTech skill pathways.
              The foundation will grow step by step while keeping the platform
              simple and sustainable.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-950">Current focus</h2>
            <div className="mt-6 space-y-4">
              {aboutHighlights.map((highlight) => (
                <div key={highlight} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icons.check className="size-5" />
                  </span>
                  <p className="text-sm leading-7 text-slate-600">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
