import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryDetailPage } from "@/features/categories/components/CategoryDetailPage";
import {
  categoryDetails,
  getCategoryDetail,
} from "@/features/categories/data/category-details.data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categoryDetails.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryDetail(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: category.hero.title,
    description: category.hero.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryDetail(slug);

  if (!category) {
    notFound();
  }

  return <CategoryDetailPage category={category} />;
}
