import Link from "next/link";
import type { CategoryCourse } from "@/features/categories/types/category.types";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

type CategoryCoursesSectionProps = {
  title: string;
  courses: CategoryCourse[];
};

const levelClasses: Record<CategoryCourse["level"], string> = {
  Discovery: "bg-sky-50 text-sky-700 ring-sky-100",
  Fluency: "bg-teal-50 text-teal-700 ring-teal-100",
  Beginner: "bg-blue-50 text-blue-700 ring-blue-100",
  Intermediate: "bg-violet-50 text-violet-700 ring-violet-100",
  Advanced: "bg-slate-100 text-slate-800 ring-slate-200",
};

export function CategoryCoursesSection({
  title,
  courses,
}: CategoryCoursesSectionProps) {
  if (courses.length === 0) {
    return null;
  }

  const levels = Array.from(new Set(courses.map((course) => course.level)));
  const priceTypes = Array.from(new Set(courses.map((course) => course.priceType)));

  return (
    <section id="courses" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <Container>
        <div className="max-w-5xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm">
            <Icons.sparkles className="size-4" />
            Courses
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.18] text-slate-950 sm:text-4xl">
            All {title.replace(" Courses", "")} Programmes
          </h2>
          <p className="mt-4 text-base leading-7 text-blue-950/75">
            Choose your learning mode, level and pricing preference to find the
            programme that fits your pace and goal.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-full gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-1">
            {["All", "Online Live", "Self-paced", "Hybrid"].map((item) => (
              <span
                key={item}
                className="min-w-fit rounded-xl bg-white px-4 py-2 text-sm font-bold text-blue-700 first:shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <p className="text-sm font-semibold text-blue-900/70">
            Showing {courses.length} programmes
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <p className="flex items-center gap-2 text-sm font-bold text-slate-950">
                <Icons.sparkles className="size-4 text-orange-500" />
                Latest Courses
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Level
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["All", ...levels].map((level) => (
                  <span
                    key={level}
                    className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-blue-700"
                  >
                    {level}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Price
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {["All", ...priceTypes].map((priceType) => (
                  <span
                    key={priceType}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-blue-700"
                  >
                    {priceType}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-blue-900 p-5 text-white">
              <p className="text-sm font-bold">Need help choosing?</p>
              <p className="mt-3 text-sm leading-6 text-blue-50/85">
                Tell us your background and we will suggest the right learning
                level.
              </p>
              <ButtonLink
                href="/contact"
                className="mt-5 w-full bg-white text-blue-950 hover:bg-blue-50"
              >
                Get Guidance
              </ButtonLink>
            </div>
          </aside>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className="flex min-h-[430px] flex-col rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-blue-950/80">
                    {course.categoryLabel}
                  </span>
                  {course.isLatest ? (
                    <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      Latest
                    </span>
                  ) : null}
                </div>

                <span
                  className={`mt-4 w-fit rounded-full px-3 py-1 text-xs font-bold ring-1 ${levelClasses[course.level]}`}
                >
                  {course.level}
                </span>

                <h3 className="mt-5 text-lg font-bold leading-7 text-slate-950">
                  {course.title}
                </h3>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-blue-900/45">Duration</p>
                    <p className="mt-1 text-sm font-bold text-blue-950">
                      {course.duration}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs text-blue-900/45">Mode</p>
                    <p className="mt-1 text-sm font-bold text-blue-950">
                      {course.mode}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-blue-950/75">
                  Ideal for {course.audience}.
                </p>

                <div className="mt-5 rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase text-blue-900/45">
                    Fee
                  </p>
                  <p className="mt-1 font-bold text-blue-700">{course.fee}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                  <Link
                    href={`/courses/${course.id}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-blue-600 px-4 text-sm font-bold text-white transition hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-300 bg-white px-4 text-sm font-bold text-blue-950 transition hover:border-blue-300 hover:bg-blue-50"
                  >
                    Enroll Now
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
