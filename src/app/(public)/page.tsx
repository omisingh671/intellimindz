import { CategoriesSection } from "@/features/home/components/CategoriesSection";
import { ContactSection } from "@/features/home/components/ContactSection";
import { DonateSection } from "@/features/home/components/DonateSection";
import { FeaturedCoursesSection } from "@/features/home/components/FeaturedCoursesSection";
import { HeroSection } from "@/features/home/components/HeroSection";
import { LearningLevelsSection } from "@/features/home/components/LearningLevelsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedCoursesSection />
      <CategoriesSection />
      <LearningLevelsSection />
      <DonateSection />
      <ContactSection />
    </main>
  );
}
