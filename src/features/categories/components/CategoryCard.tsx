import Link from "next/link";
import { Icons } from "@/shared/icons/icon-registry";
import type { CourseCategory } from "@/features/categories/types/category.types";

type CategoryCardProps = {
  category: CourseCategory;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = Icons[category.icon];

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl border border-slate-200 bg-white text-blue-700 shadow-sm">
          <Icon className="size-5" />
        </span>
        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
          {category.courseCount} courses
        </span>
      </div>
      <h3 className="mt-7 text-xl font-bold text-slate-950">{category.title}</h3>
      <p className="mt-4 min-h-20 text-sm leading-7 text-slate-600">
        {category.description}
      </p>
      <Link
        href="/categories"
        className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
      >
        View category page
        <Icons.arrowRight className="size-4" />
      </Link>
    </article>
  );
}
