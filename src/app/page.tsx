import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { EducationSection } from '@/components/EducationSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />

      <section id="about" className="scroll-mt-16 bg-page">
        <AboutSection />
      </section>

      <section id="experience" className="scroll-mt-16 bg-section">
        <ExperienceSection />
      </section>

      <section id="skills" className="scroll-mt-16 bg-section-warm">
        <SkillsSection />
      </section>

      <section id="education" className="scroll-mt-16 bg-[#fafbfd]">
        <EducationSection />
      </section>

      <section id="contact" className="scroll-mt-16 bg-[#0f172a]">
        <ContactSection />
        <Footer />
      </section>
    </main>
  );
}
