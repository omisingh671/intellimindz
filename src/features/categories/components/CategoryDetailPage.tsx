import { CategoryApplicationsSection } from "@/features/categories/components/CategoryApplicationsSection";
import { CategoryBlogsSection } from "@/features/categories/components/CategoryBlogsSection";
import { CategoryCareersSection } from "@/features/categories/components/CategoryCareersSection";
import { CategoryCoursesSection } from "@/features/categories/components/CategoryCoursesSection";
import { CategoryHero } from "@/features/categories/components/CategoryHero";
import { CategoryLearningPathSection } from "@/features/categories/components/CategoryLearningPathSection";
import { CategoryOverviewSection } from "@/features/categories/components/CategoryOverviewSection";
import { CategoryTabs } from "@/features/categories/components/CategoryTabs";
import type { CategoryDetail } from "@/features/categories/types/category.types";

type CategoryDetailPageProps = {
  category: CategoryDetail;
};

export function CategoryDetailPage({ category }: CategoryDetailPageProps) {
  return (
    <main className="bg-white">
      <CategoryHero hero={category.hero} />
      <CategoryTabs tabs={category.tabs} />
      {category.courses ? (
        <CategoryCoursesSection
          title={category.hero.title}
          courses={category.courses}
        />
      ) : null}
      {category.applications ? (
        <CategoryApplicationsSection
          title={category.hero.title}
          applications={category.applications}
        />
      ) : null}
      {category.learningPath ? (
        <CategoryLearningPathSection learningPath={category.learningPath} />
      ) : null}
      {category.careers ? (
        <CategoryCareersSection
          title={category.hero.title}
          careers={category.careers}
        />
      ) : null}
      {category.overview ? (
        <CategoryOverviewSection overview={category.overview} />
      ) : null}
      {category.blogs ? (
        <CategoryBlogsSection title={category.hero.title} blogs={category.blogs} />
      ) : null}
    </main>
  );
}
