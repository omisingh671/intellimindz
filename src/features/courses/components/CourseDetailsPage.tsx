import Link from "next/link";
import type { Course } from "@/features/courses/types/course.types";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

type CourseDetailsPageProps = {
  course: Course;
};

export function CourseDetailsPage({ course }: CourseDetailsPageProps) {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50/80 py-14 sm:py-16">
        <Container>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
          >
            <Icons.arrowRight className="size-4 rotate-180" />
            Back to courses
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  {course.level}
                </span>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                  {course.category}
                </span>
                {course.isLatest ? (
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    Latest
                  </span>
                ) : null}
              </div>

              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.18] text-slate-950 sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-blue-950/70">
                Build practical confidence in {course.category.toLowerCase()} through
                structured learning, guided concepts, and finance-focused
                application areas.
              </p>
            </div>

            <aside className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.08)]">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-900/45">
                Course Snapshot
              </p>
              <div className="mt-5 grid gap-3">
                <SnapshotItem label="Duration" value={course.duration} />
                <SnapshotItem label="Mode" value={course.mode} />
                <SnapshotItem label="Fee" value={course.fee} />
              </div>
              <ButtonLink href={`/courses/${course.id}/payment`} className="mt-6 w-full">
                Enroll Now
                <Icons.arrowRight className="size-4" />
              </ButtonLink>
            </aside>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-16">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <article className="rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-6 shadow-[0_2px_10px_rgba(15,23,42,0.08)]">
              <h2 className="text-2xl font-bold text-slate-950">
                What learners will explore
              </h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.tags.map((tag) => (
                  <div
                    key={`${course.id}-${tag}`}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <Icons.check className="size-5 text-emerald-600" />
                    <p className="mt-3 text-sm font-bold text-slate-950">
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.08)]">
              <h2 className="text-xl font-bold text-slate-950">Ideal for</h2>
              <p className="mt-4 text-sm leading-7 text-blue-950/70">
                {course.audience}.
              </p>
              <div className="mt-6 rounded-2xl bg-blue-50 p-4">
                <p className="text-xs font-bold uppercase text-blue-900/45">
                  Next Step
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-blue-950/80">
                  Share your interest and the team will help you choose the
                  right learning path.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </section>
    </main>
  );
}

type SnapshotItemProps = {
  label: string;
  value: string;
};

function SnapshotItem({ label, value }: SnapshotItemProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase text-blue-900/40">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}
