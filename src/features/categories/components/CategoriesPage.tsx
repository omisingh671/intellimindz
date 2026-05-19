import { CategoriesGrid } from "@/features/categories/components/CategoriesGrid";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";

export function CategoriesPage() {
  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="A complete FinTech learning ecosystem"
          description="Choose a domain, start at the right level, and build a stackable pathway."
        />
        <div className="mt-10">
          <CategoriesGrid />
        </div>
      </Container>
    </main>
  );
}
