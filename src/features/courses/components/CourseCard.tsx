import Link from "next/link";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Icons } from "@/shared/icons/icon-registry";
import type { Course } from "@/features/courses/types/course.types";
import { cn } from "@/shared/lib/utils";

type CourseCardProps = {
  course: Course;
};

const levelBadgeClasses: Record<Course["level"], string> = {
  Discovery: "border-sky-100 bg-sky-50 text-sky-700 hover:bg-sky-100",
  Fluency: "border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100",
  Beginner: "border-blue-100 bg-blue-50 text-blue-700 hover:bg-blue-100",
  Intermediate:
    "border-violet-100 bg-violet-50 text-violet-700 hover:bg-violet-100",
  Advanced: "border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200",
};

export function CourseCard({ course }: CourseCardProps) {
  const isFree = course.fee.toLowerCase() === "free";
  const categoryHref = `/courses?category=${encodeURIComponent(course.category)}`;
  const levelHref = `/courses?level=${encodeURIComponent(course.level)}`;

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={categoryHref}
          aria-label={`Filter courses by ${course.category}`}
          className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {course.category}
        </Link>
        <Link
          href={levelHref}
          aria-label={`Filter courses by ${course.level} level`}
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
            levelBadgeClasses[course.level],
          )}
        >
          {course.level}
        </Link>
        {course.isLatest ? (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            Latest
          </span>
        ) : null}
      </div>

      <h3 className="mt-5 text-base font-bold leading-6 text-slate-950">
        {course.title}
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <CourseMeta label="Duration" value={course.duration} />
        <CourseMeta label="Mode" value={course.mode} />
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-600">
        Ideal for {course.audience}.
      </p>

      <div
        className={cn(
          "mt-5 rounded-2xl border p-4",
          isFree
            ? "border-emerald-100 bg-emerald-50"
            : "border-blue-100 bg-blue-50",
        )}
      >
        <p className="text-xs font-semibold uppercase text-slate-400">Fee</p>
        <p
          className={cn(
            "mt-1 font-bold",
            isFree ? "text-emerald-700" : "text-blue-700",
          )}
        >
          {course.fee}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {course.tags.map((tag) => (
          <span
            key={`${course.id}-${tag}`}
            className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-blue-700 ring-1 ring-slate-200/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
        <ButtonLink href={`/courses/${course.id}`} className="min-h-10 px-3 text-xs">
          View Details
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline" className="min-h-10 px-3 text-xs">
          Enroll
          <Icons.arrowRight className="size-4" />
        </ButtonLink>
      </div>
    </article>
  );
}

type CourseMetaProps = {
  label: string;
  value: string;
};

function CourseMeta({ label, value }: CourseMetaProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}
