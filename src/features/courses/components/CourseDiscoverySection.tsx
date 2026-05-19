"use client";

import { useMemo, useState } from "react";
import { categories } from "@/features/categories/data/categories.data";
import { CourseCard } from "@/features/courses/components/CourseCard";
import { courses } from "@/features/courses/data/courses.data";
import type { CourseLevel } from "@/features/courses/types/course.types";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";
import { Icons } from "@/shared/icons/icon-registry";
import { cn } from "@/shared/lib/utils";

type LevelFilter = "All" | CourseLevel;
type PriceFilter = "All" | "Free" | "Paid";
type CourseDiscoverySectionProps = {
  initialCategory?: string;
  initialLevel?: CourseLevel;
};

const allCategoriesLabel = "All Categories";
const levels: LevelFilter[] = [
  "All",
  "Discovery",
  "Fluency",
  "Beginner",
  "Intermediate",
  "Advanced",
];
const priceFilters: PriceFilter[] = ["All", "Free", "Paid"];

export function CourseDiscoverySection({
  initialCategory,
  initialLevel,
}: CourseDiscoverySectionProps = {}) {
  const decodedInitialCategory = initialCategory
    ? decodeURIComponent(initialCategory)
    : undefined;
  const [search, setSearch] = useState("");
  const [latestOnly, setLatestOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    decodedInitialCategory &&
      categories.some((category) => category.title === decodedInitialCategory)
      ? decodedInitialCategory
      : allCategoriesLabel,
  );
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>(
    initialLevel ?? "All",
  );
  const [selectedPrice, setSelectedPrice] = useState<PriceFilter>("All");

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return courses.filter((course) => {
      const coursePrice = course.fee.toLowerCase() === "free" ? "Free" : "Paid";
      const searchableText = [
        course.title,
        course.category,
        course.level,
        course.mode,
        course.audience,
        ...course.tags,
      ]
        .join(" ")
        .toLowerCase();

      return (
        (!latestOnly || course.isLatest) &&
        (selectedCategory === allCategoriesLabel ||
          course.category === selectedCategory) &&
        (selectedLevel === "All" || course.level === selectedLevel) &&
        (selectedPrice === "All" || coursePrice === selectedPrice) &&
        (!normalizedSearch || searchableText.includes(normalizedSearch))
      );
    });
  }, [latestOnly, search, selectedCategory, selectedLevel, selectedPrice]);

  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="Discover courses by category, level and price"
          description="Use the left panel to filter by latest courses, category, level, and Free or Paid programmes."
        />

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
          <div className="grid gap-5 lg:grid-cols-[270px_1fr] lg:items-start">
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <button
                type="button"
                className={cn(
                  "flex min-h-11 w-full items-center gap-2 rounded-2xl border px-3 text-left text-xs font-bold transition",
                  latestOnly
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-slate-950 hover:bg-slate-50",
                )}
                onClick={() => setLatestOnly((current) => !current)}
              >
                <Icons.sparkles className="size-4 text-amber-500" />
                Latest Courses
              </button>

              <div className="mt-6 space-y-7">
                <div>
                  <FilterTitle>Categories</FilterTitle>
                  <div className="mt-3 grid gap-1">
                    <CategoryButton
                      key="all-categories"
                      label={allCategoriesLabel}
                      active={selectedCategory === allCategoriesLabel}
                      onClick={() => setSelectedCategory(allCategoriesLabel)}
                    />
                    {categories.map((category) => {
                      const Icon = Icons[category.icon];

                      return (
                        <CategoryButton
                          key={category.slug}
                          label={category.title}
                          active={selectedCategory === category.title}
                          onClick={() => setSelectedCategory(category.title)}
                          icon={<Icon className="size-4" />}
                        />
                      );
                    })}
                  </div>
                </div>

                <div>
                  <FilterTitle>Levels</FilterTitle>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {levels.map((level) => (
                      <PillButton
                        key={level}
                        active={selectedLevel === level}
                        onClick={() => setSelectedLevel(level)}
                      >
                        {level}
                      </PillButton>
                    ))}
                  </div>
                </div>

                <div>
                  <FilterTitle>Price</FilterTitle>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {priceFilters.map((price) => (
                      <PillButton
                        key={price}
                        active={selectedPrice === price}
                        onClick={() => setSelectedPrice(price)}
                      >
                        {price}
                      </PillButton>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                  <label className="relative flex-1">
                    <span className="sr-only">Search courses</span>
                    <Icons.search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search for AI in Finance, UPI, RegTech, Blockchain..."
                      className="min-h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                    />
                  </label>
                  <p className="shrink-0 text-sm font-bold text-slate-600">
                    {filteredCourses.length}{" "}
                    {filteredCourses.length === 1 ? "course" : "courses"} found
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>

              {filteredCourses.length === 0 ? (
                <div className="mt-5 rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <p className="font-bold text-slate-950">No courses found</p>
                  <p className="mt-2 text-sm text-slate-600">
                    Try a different search term or clear one of the filters.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

type FilterTitleProps = {
  children: React.ReactNode;
};

function FilterTitle({ children }: FilterTitleProps) {
  return (
    <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
      {children}
    </h3>
  );
}

type CategoryButtonProps = {
  label: string;
  active: boolean;
  icon?: React.ReactNode;
  onClick: () => void;
};

function CategoryButton({ label, active, icon, onClick }: CategoryButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-9 w-full items-start gap-2 rounded-2xl px-3 py-2 text-left text-[11px] font-semibold leading-5 transition",
        active
          ? "bg-blue-50 text-blue-700"
          : "bg-slate-50/70 text-slate-700 hover:bg-blue-50/70 hover:text-blue-700",
      )}
      onClick={onClick}
    >
      {icon ? (
        <span className="mt-0.5 shrink-0 text-blue-600">{icon}</span>
      ) : null}
      <span>{label}</span>
    </button>
  );
}

type PillButtonProps = {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

function PillButton({ active, children, onClick }: PillButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "min-h-8 rounded-full border px-3 text-[10.5px] font-semibold transition",
        active
          ? "border-blue-500 bg-blue-50 text-blue-700"
          : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-blue-300 hover:bg-blue-50/70 hover:text-blue-700",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
