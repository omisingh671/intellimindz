import { ContactForm } from "@/features/contact/components/ContactForm";
import { ContactInfo } from "@/features/contact/components/ContactInfo";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";

export function ContactPage() {
  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <SectionHeader
          title="Contact Intellimindz Foundation"
          description="Share your learning, partnership, or sponsorship interest. Backend submission will be added when the form channel is selected."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_380px]">
          <ContactForm />
          <ContactInfo />
        </div>
      </Container>
    </main>
  );
}
