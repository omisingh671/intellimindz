import type { CategoryTab } from "@/features/categories/types/category.types";
import { Container } from "@/shared/components/ui/Container";

type CategoryTabsProps = {
  tabs: CategoryTab[];
};

export function CategoryTabs({ tabs }: CategoryTabsProps) {
  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-0 z-20 border-b border-blue-800/30 bg-blue-700 text-white shadow-sm">
      <Container>
        <nav
          aria-label="Category page sections"
          className="flex gap-1 overflow-x-auto"
        >
          {tabs.map((tab) => (
            <a
              key={tab.href}
              href={tab.href}
              className="min-w-fit border-b-2 border-transparent px-4 py-4 text-sm font-bold text-blue-50/70 transition hover:border-white hover:text-white first:border-white first:text-white sm:px-6"
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
