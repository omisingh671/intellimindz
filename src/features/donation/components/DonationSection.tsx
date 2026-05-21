import { DonationCard } from "@/features/donation/components/DonationCard";
import { DonationInterestForm } from "@/features/donation/components/DonationInterestForm";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";

export function DonationSection() {
  return (
    <section className="bg-blue-50/60 py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="Sponsor our upskilling initiatives"
          description="Your contribution helps us provide high-quality education to learners who need it most."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_0.85fr]">
          <DonationInterestForm />
          <DonationCard />
        </div>
      </Container>
    </section>
  );
}
