import type { CategoryCareer } from "@/features/categories/types/category.types";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

type CategoryCareersSectionProps = {
  title: string;
  careers: CategoryCareer[];
};

export function CategoryCareersSection({
  title,
  careers,
}: CategoryCareersSectionProps) {
  if (careers.length === 0) {
    return null;
  }

  return (
    <section id="careers" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Icons.sparkles className="size-4" />
            Careers
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.18] text-slate-950 sm:text-4xl">
            Careers enabled by {title.replace(" Courses", "")}
          </h2>
          <p className="mt-4 text-base leading-7 text-blue-950/75">
            Explore role pathways enabled by category-specific capabilities and
            applied project experience.
          </p>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {careers.map((career) => (
            <article
              key={career.title}
              className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.08)] [border-top-width:4px] [border-top-color:#0ea5e9]"
            >
              <h3 className="text-lg font-bold text-slate-950">
                {career.title}
              </h3>
              <p className="mt-6 text-2xl font-bold text-blue-700">
                {career.salaryRange}
              </p>
              <p className="mt-3 text-sm font-bold text-emerald-700">
                {career.note}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {career.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
