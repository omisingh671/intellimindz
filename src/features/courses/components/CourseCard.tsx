import { ButtonLink } from "@/shared/components/ui/Button";
import { Icons } from "@/shared/icons/icon-registry";
import type { Course } from "@/features/courses/types/course.types";

type CourseCardProps = {
  course: Course;
};

export function CourseCard({ course }: CourseCardProps) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
          {course.category}
        </span>
        {course.isLatest ? (
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Latest
          </span>
        ) : null}
      </div>

      <span className="mt-4 w-fit rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
        {course.level}
      </span>

      <h3 className="mt-4 text-lg font-bold leading-7 text-slate-950">
        {course.title}
      </h3>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <CourseMeta label="Duration" value={course.duration} />
        <CourseMeta label="Mode" value={course.mode} />
      </div>

      <p className="mt-5 text-sm leading-6 text-slate-600">
        Ideal for {course.audience}.
      </p>

      <div className="mt-5 rounded-2xl bg-blue-50 p-4">
        <p className="text-xs font-semibold uppercase text-slate-400">Fee</p>
        <p className="mt-1 font-bold text-blue-700">{course.fee}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {course.tags.map((tag) => (
          <span
            key={`${course.id}-${tag}`}
            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-blue-700"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
        <ButtonLink href="/courses" className="px-4">
          View Details
        </ButtonLink>
        <ButtonLink href="/contact" variant="outline" className="px-4">
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
