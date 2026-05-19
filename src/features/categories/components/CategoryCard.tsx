import Link from "next/link";
import { Icons } from "@/shared/icons/icon-registry";
import type { CourseCategory } from "@/features/categories/types/category.types";

type CategoryCardProps = {
  category: CourseCategory;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = Icons[category.icon];

  return (
    <article className="flex min-h-[270px] flex-col rounded-[1.35rem] border border-slate-200 bg-slate-50/80 p-6 shadow-[0_2px_10px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:border-blue-100 hover:bg-white hover:shadow-[0_18px_35px_rgba(15,23,42,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl border border-slate-200 bg-white text-blue-700 shadow-[0_3px_8px_rgba(15,23,42,0.12)]">
          <Icon className="size-5" />
        </span>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700">
          {category.courseCount} courses
        </span>
      </div>
      <h3 className="mt-7 text-xl font-bold text-slate-950">
        {category.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-blue-950/75">
        {category.description}
      </p>
      <Link
        href={`/categories/${category.slug}`}
        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold text-blue-700 transition hover:text-blue-900"
      >
        View category page
        <Icons.arrowRight className="size-4" />
      </Link>
    </article>
  );
}
