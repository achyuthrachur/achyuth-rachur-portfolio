'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { HambergerMenu, CloseCircle, Sun1, Moon } from 'iconsax-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();
  const { theme, toggle } = useTheme();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const heroHeight = window.innerHeight;
    const progress = Math.min(latest / heroHeight, 1);
    const opacity = 0.85 + 0.12 * progress;
    document.documentElement.style.setProperty('--nav-opacity', String(opacity));
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--nav-opacity', '0.85');
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'experience', 'skills', 'education', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const iconColor = theme === 'dark' ? '#94a3b8' : '#64748b';

  return (
    <>
      <nav className="sticky top-0 z-50 h-16 backdrop-blur-[16px] border-b border-[rgba(15,23,42,0.06)] dark:border-[rgba(255,255,255,0.06)] transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Brand */}
          <a href="#hero" className="font-semibold text-tint-900 dark:text-[#f6f7fa] font-body text-sm tracking-tight">
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
                    isActive ? 'text-tint-900 dark:text-[#f6f7fa]' : 'text-tint-500 dark:text-[#64748b]'
                  )}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId={prefersReduced ? undefined : 'nav-underline'}
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366f1] rounded-full"
                      transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <a
              href="#contact"
              className="bg-[#6366f1] text-white rounded-md px-4 py-1.5 text-sm font-semibold hover:bg-[#4f46e5] transition-colors duration-150"
            >
              Contact
            </a>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="p-1.5 rounded-md hover:bg-[rgba(99,102,241,0.08)] transition-colors duration-150"
            >
              {theme === 'dark'
                ? <Sun1 variant="Linear" size={18} color="#94a3b8" />
                : <Moon variant="Linear" size={18} color="#64748b" />
              }
            </button>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggle} aria-label="Toggle dark mode" className="p-1 rounded-md">
              {theme === 'dark'
                ? <Sun1 variant="Linear" size={18} color="#94a3b8" />
                : <Moon variant="Linear" size={18} color="#64748b" />
              }
            </button>
            <button
              className="text-tint-700 dark:text-[#94a3b8]"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <CloseCircle variant="Linear" size={24} color={iconColor} />
                : <HambergerMenu variant="Linear" size={24} color={iconColor} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 backdrop-blur-[16px] border-b border-[rgba(15,23,42,0.06)] dark:border-[rgba(255,255,255,0.06)] px-6 py-4 flex flex-col gap-4 z-50 bg-[rgba(248,250,252,0.97)] dark:bg-[rgba(13,17,23,0.97)]">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="text-sm text-tint-700 dark:text-[#94a3b8]" onClick={() => setMobileOpen(false)}>
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
