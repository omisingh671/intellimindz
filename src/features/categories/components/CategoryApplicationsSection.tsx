import type { CategoryApplication } from "@/features/categories/types/category.types";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

type CategoryApplicationsSectionProps = {
  title: string;
  applications: CategoryApplication[];
};

export function CategoryApplicationsSection({
  title,
  applications,
}: CategoryApplicationsSectionProps) {
  if (applications.length === 0) {
    return null;
  }

  return (
    <section
      id="applications"
      className="scroll-mt-24 bg-slate-50 py-16 sm:py-20"
    >
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Icons.sparkles className="size-4" />
            Applications
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.18] text-slate-950 sm:text-4xl">
            Where {title.replace(" Courses", "")} is used
          </h2>
          <p className="mt-4 text-base leading-7 text-blue-950/75">
            This category connects technology skills with real-world financial
            use cases and industry workflows.
          </p>
        </div>

        <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {applications.map((application) => {
            const Icon = Icons[application.icon];

            return (
              <article
                key={application.title}
                className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.08)]"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-blue-50 text-blue-700">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-7 text-lg font-bold text-slate-950">
                  {application.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-blue-950/75">
                  {application.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
