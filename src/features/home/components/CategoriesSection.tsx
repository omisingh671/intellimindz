import { CategoriesGrid } from "@/features/categories/components/CategoriesGrid";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";
import { Icons } from "@/shared/icons/icon-registry";

export function CategoriesSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="A complete FinTech learning ecosystem"
          description="Choose a domain, start at the right level, and build a stackable pathway."
        />
        <div className="mt-10">
          <CategoriesGrid />
        </div>
        <div className="mt-10 text-center">
          <ButtonLink href="/categories" variant="outline">
            Explore categories
            <Icons.arrowRight className="size-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
