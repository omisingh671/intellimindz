import Link from "next/link";
import type { Course } from "@/features/courses/types/course.types";
import { CoursePaymentForm } from "@/features/courses/components/CoursePaymentForm";
import { Container } from "@/shared/components/ui/Container";
import { Icons } from "@/shared/icons/icon-registry";

type CoursePaymentPageProps = {
  course: Course;
};

export function CoursePaymentPage({ course }: CoursePaymentPageProps) {
  return (
    <main className="bg-white">
      <section className="border-b border-slate-200 bg-slate-50/80 py-14 sm:py-16">
        <Container>
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
          >
            <Icons.arrowRight className="size-4 rotate-180" />
            Back to course
          </Link>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-900/45">
                Course Enrollment
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-[1.18] text-slate-950 sm:text-5xl">
                {course.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-blue-950/70">
                Create a placeholder payment record for enrollment. Real gateway
                collection will be connected later.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <SnapshotItem label="Fee" value={course.fee} />
                <SnapshotItem label="Mode" value={course.mode} />
                <SnapshotItem label="Duration" value={course.duration} />
              </div>
            </div>

            <CoursePaymentForm courseId={course.id} />
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
    <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
      <p className="text-xs font-bold uppercase text-blue-900/40">{label}</p>
      <p className="mt-1 text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}
