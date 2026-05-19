import type { CategoryOverviewItem } from "@/features/categories/types/category.types";
import { Container } from "@/shared/components/ui/Container";

type CategoryOverviewSectionProps = {
  overview: CategoryOverviewItem[];
};

export function CategoryOverviewSection({
  overview,
}: CategoryOverviewSectionProps) {
  if (overview.length === 0) {
    return null;
  }

  return (
    <section id="overview" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit rounded-[1.35rem] border border-slate-200 bg-slate-50 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-900/70">
              Contents
            </p>
            <ol className="mt-6 space-y-5">
              {overview.map((item, index) => (
                <li key={item.title}>
                  <a
                    href={`#overview-${index + 1}`}
                    className="flex gap-4 text-sm font-bold text-blue-950/75 hover:text-blue-700"
                  >
                    <span className="text-blue-900/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            {overview.map((item, index) => (
              <section
                id={`overview-${index + 1}`}
                key={item.title}
                className="border-b border-slate-200 py-8 first:pt-0 last:border-0 last:pb-0"
              >
                <h2 className="text-2xl font-bold text-slate-950">
                  {item.title}
                </h2>
                {item.body ? (
                  <p className="mt-5 text-base leading-8 text-blue-950/75">
                    {item.body}
                  </p>
                ) : null}
                {item.callout ? (
                  <div className="mt-7 rounded-2xl border-l-4 border-blue-600 bg-blue-50 p-5 text-sm leading-7 text-blue-950">
                    {item.callout}
                  </div>
                ) : null}
                {item.bullets && item.bullets.length > 0 ? (
                  <ul className="mt-6 space-y-4">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-6 text-blue-950/80"
                      >
                        <span className="mt-2 size-2 rounded-full bg-blue-600" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
