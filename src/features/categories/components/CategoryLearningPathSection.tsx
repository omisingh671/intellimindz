import Link from "next/link";
import type { CategoryLearningPathItem } from "@/features/categories/types/category.types";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

type CategoryLearningPathSectionProps = {
  learningPath: CategoryLearningPathItem[];
};

export function CategoryLearningPathSection({
  learningPath,
}: CategoryLearningPathSectionProps) {
  if (learningPath.length === 0) {
    return null;
  }

  return (
    <section id="learning-path" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <Container>
        <div className="max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Icons.sparkles className="size-4" />
            Learning Path
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.18] text-slate-950 sm:text-4xl">
            Suggested level-wise pathway
          </h2>
          <p className="mt-4 text-base leading-7 text-blue-950/75">
            Move through this category from foundation vocabulary to applied
            workflows and career-ready use cases.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {learningPath.map((item, index) => (
            <article
              key={`${item.title}-${item.level}`}
              className="grid gap-5 rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.08)] md:grid-cols-[52px_1fr_auto] md:items-center"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-base font-bold text-blue-700">
                {index + 1}
              </span>

              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-blue-900/50">
                  <span className="rounded-full bg-sky-50 px-3 py-1 font-bold text-sky-700">
                    {item.level}
                  </span>
                  <span>{item.duration}</span>
                  <span aria-hidden="true">-</span>
                  <span>{item.mode}</span>
                </div>
                <h3 className="mt-3 text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-blue-950/75">
                  {item.tags.join(" - ")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <p className="w-full text-sm font-bold text-emerald-700 md:text-right">
                  {item.fee}
                </p>
                <Link
                  href="/courses"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-5 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  View
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-5 text-sm font-bold text-blue-950 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  Enroll
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
