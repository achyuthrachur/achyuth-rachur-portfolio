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

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const heroHeight = window.innerHeight;
    const progress = Math.min(latest / heroHeight, 1);
    setNavBgOpacity(0.85 + 0.12 * progress);
  });

  useEffect(() => {
    const sectionIds = ['about', 'experience', 'skills', 'education', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

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
      <nav
        className="sticky top-0 z-50 h-16 backdrop-blur-[16px] border-b border-[rgba(15,23,42,0.06)]"
        style={{ backgroundColor: `rgba(248,250,252,${navBgOpacity})` }}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Brand name */}
          <a href="#hero" className="font-semibold text-tint-900 font-body text-sm tracking-tight">
            Achyuth Rachur
          </a>

          {/* Desktop links */}
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
                    isActive ? 'text-tint-900' : 'text-tint-500'
                  )}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366f1] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            {/* Contact CTA */}
            <a
              href="#contact"
              className="bg-[#6366f1] text-white rounded-md px-4 py-1.5 text-sm font-semibold hover:bg-[#4f46e5] transition-colors duration-150"
            >
              Contact
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-tint-700"
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

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 backdrop-blur-[16px] border-b border-[rgba(15,23,42,0.06)] px-6 py-4 flex flex-col gap-4 z-50"
          style={{ backgroundColor: 'rgba(248,250,252,0.97)' }}
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
            className="bg-[#6366f1] text-white rounded-md px-4 py-1.5 text-sm font-semibold text-center hover:bg-[#4f46e5] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </>
  );
}
