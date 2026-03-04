'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { HambergerMenu, CloseCircle } from 'iconsax-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navBgOpacity, setNavBgOpacity] = useState(0.85);
  const { scrollY } = useScroll();

  // NAV-05: Scroll-driven opacity — useMotionValueEvent (NOT .onChange())
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const heroHeight = window.innerHeight;
    const progress = Math.min(latest / heroHeight, 1);
    setNavBgOpacity(0.85 + 0.12 * progress); // 0.85 → 0.97
  });

  // NAV-03, NAV-04: IntersectionObserver for active section tracking
  useEffect(() => {
    const sectionIds = ['about', 'experience', 'skills', 'education', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return; // null guard — sections added in later phases

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* NAV-01, NAV-02: Sticky glassmorphism nav */}
      <nav
        className="sticky top-0 z-50 h-16 backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)]"
        style={{ backgroundColor: `rgba(250,251,253,${navBgOpacity})` }}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo / name */}
          <a
            href="#hero"
            className="font-semibold text-crowe-indigo-dark font-body text-sm"
          >
            Achyuth Rachur
          </a>

          {/* Desktop links — NAV-01, NAV-02, NAV-03 */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href }) => {
              const sectionId = href.replace('#', '');
              const isActive = activeSection === sectionId;

              return (
                <a
                  key={href}
                  href={href}
                  className={cn(
                    'relative pb-1 text-sm transition-colors duration-150',
                    isActive ? 'text-crowe-indigo-dark' : 'text-tint-700'
                  )}
                >
                  {label}
                  {/* NAV-03: Amber underline slides between active links via layoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-crowe-amber rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* NAV-01: Contact CTA */}
            <a
              href="#contact"
              className="bg-crowe-amber text-crowe-indigo-dark rounded-sm px-4 py-1.5 text-sm font-semibold"
            >
              Contact
            </a>
          </div>

          {/* NAV-01 mobile: Hamburger button */}
          <button
            className="md:hidden text-crowe-indigo-dark"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <CloseCircle variant="Linear" size={24} color="currentColor" />
            ) : (
              <HambergerMenu variant="Linear" size={24} color="currentColor" />
            )}
          </button>
        </div>
      </nav>

      {/* NAV-01 mobile: Dropdown menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 backdrop-blur-[16px] border-b border-[rgba(1,30,65,0.04)] px-6 py-4 flex flex-col gap-4 z-50"
          style={{ backgroundColor: 'rgba(250,251,253,0.97)' }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-sm text-tint-700"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-crowe-amber text-crowe-indigo-dark rounded-sm px-4 py-1.5 text-sm font-semibold text-center"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
}
