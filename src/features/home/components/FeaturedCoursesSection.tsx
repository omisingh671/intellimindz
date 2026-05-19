import { CoursesGrid } from "@/features/courses/components/CoursesGrid";
import { ButtonLink } from "@/shared/components/ui/Button";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";
import { Icons } from "@/shared/icons/icon-registry";

export function FeaturedCoursesSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            align="left"
            title="Discover courses by category, level and price"
            description="Start with foundational financial literacy and grow into specialised FinTech pathways."
          />
          <ButtonLink href="/courses" variant="outline" className="shrink-0">
            View all courses
            <Icons.arrowRight className="size-4" />
          </ButtonLink>
        </div>
        <div className="mt-10">
          <CoursesGrid />
        </div>
      </Container>
    </section>
  );
}
