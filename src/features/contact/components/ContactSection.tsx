import Image from "next/image";
import { ContactForm } from "@/features/contact/components/ContactForm";
import { Container } from "@/shared/components/ui/Container";
import { SectionHeader } from "@/shared/components/ui/SectionHeader";

export function ContactSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.85fr)]">
          <div>
            <SectionHeader
              title="Find the right FinTech course"
              description="Tell us your interest area and preferred level."
              align="left"
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="relative hidden min-h-[520px] overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-emerald-50 p-8 shadow-[0_18px_45px_rgba(15,23,42,0.1)] lg:block">
            <Image
              src="/images/fintech-course.png"
              alt="FinTech course guidance illustration"
              width={560}
              height={520}
              className="absolute bottom-0 left-1/2 w-[92%] max-w-[520px] -translate-x-1/2 object-contain"
              priority={false}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
