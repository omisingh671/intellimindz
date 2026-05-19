import { CategoryCard } from "@/features/categories/components/CategoryCard";
import { categories } from "@/features/categories/data/categories.data";

export function CategoriesGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
}
