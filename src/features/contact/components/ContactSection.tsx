import { ContactForm } from "@/features/contact/components/ContactForm";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";

export function ContactSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="Find the right FinTech course"
          description="Tell us your interest area and preferred level."
        />
        <div className="mx-auto mt-10 max-w-4xl">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
