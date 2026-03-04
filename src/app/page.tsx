import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';

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

      <section id="education" className="scroll-mt-16 min-h-screen bg-page flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">Education — coming in Phase 4</p>
      </section>

      <section id="contact" className="scroll-mt-16 min-h-screen bg-[#0f172a] flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">Contact — coming in Phase 4</p>
      </section>
    </main>
  );
}
