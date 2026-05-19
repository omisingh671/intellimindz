import { CoursesGrid } from "@/features/courses/components/CoursesGrid";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";
import { Icons } from "@/shared/icons/icon-registry";

export function CoursesPage() {
  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="Discover courses by category, level and price"
          description="A starter course catalogue is ready. Filters and detail pages will be expanded in the next content phase."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-950">
              <Icons.sparkles className="size-4 text-amber-500" />
              Latest Courses
            </div>
            <div className="mt-6 space-y-5">
              <FilterGroup title="Categories" items={["All Categories", "FinTech Core", "Digital Payments", "AI in Finance", "RegTech"]} />
              <FilterGroup title="Levels" items={["All", "Discovery", "Beginner", "Intermediate", "Advanced"]} />
              <FilterGroup title="Price" items={["All", "Free", "Paid"]} />
            </div>
          </aside>
          <CoursesGrid />
        </div>
      </Container>
    </main>
  );
}

type FilterGroupProps = {
  title: string;
  items: string[];
};

function FilterGroup({ title, items }: FilterGroupProps) {
  return (
    <div>
      <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
        {title}
      </h2>
      <div className="mt-3 flex flex-wrap gap-2 lg:grid">
        {items.map((item, index) => (
          <span
            key={`${title}-${item}`}
            className={
              index === 0
                ? "rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
                : "rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600"
            }
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
