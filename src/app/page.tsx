import { Nav } from '@/components/Nav';
import { HeroSection } from '@/components/HeroSection';

export default function Home() {
  return (
    <main>
      <Nav />
      <HeroSection />

      {/* ── Placeholder sections — replaced in Phases 3 & 4 ── */}
      {/* scroll-mt-16 = 64px offset matching Nav h-16 height  */}

      <section id="about" className="scroll-mt-16 min-h-screen bg-page flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">About — coming in Phase 3</p>
      </section>

      <section id="experience" className="scroll-mt-16 min-h-screen bg-section flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">Experience — coming in Phase 3</p>
      </section>

      <section id="skills" className="scroll-mt-16 min-h-screen bg-section-warm flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">Skills — coming in Phase 3</p>
      </section>

      <section id="education" className="scroll-mt-16 min-h-screen bg-page flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">Education — coming in Phase 4</p>
      </section>

      <section id="contact" className="scroll-mt-16 min-h-screen bg-[#011E41] flex items-center justify-center">
        <p className="font-body text-tint-500 text-sm">Contact — coming in Phase 4</p>
      </section>
    </main>
  );
}
