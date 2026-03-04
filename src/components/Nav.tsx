'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion, useSpring } from 'motion/react';
import { HambergerMenu, CloseCircle, Sun1, Moon } from 'iconsax-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ThemeProvider';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
];

const SECTION_DOTS = [
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills',     label: 'Skills' },
  { id: 'education',  label: 'Education' },
  { id: 'contact',    label: 'Contact' },
];

function MagneticButton({ href }: { href: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffset({
      x: (e.clientX - cx) * 0.35,
      y: (e.clientY - cy) * 0.35,
    });
  };

  const onMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-[#0075C9] text-white rounded-md px-4 py-1.5 text-sm font-semibold hover:bg-[#003F9F] transition-colors duration-150 inline-block"
    >
      Contact
    </motion.a>
  );
}

export function Nav() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const { theme, toggle } = useTheme();

  // Scroll progress bar — spring-smoothed
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const heroHeight = window.innerHeight;
    const progress = Math.min(latest / heroHeight, 1);
    const opacity = 0.85 + 0.12 * progress;
    document.documentElement.style.setProperty('--nav-opacity', String(opacity));
    setPastHero(latest > heroHeight * 0.8);
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
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0075C9] origin-left z-10"
          style={{ scaleX: prefersReduced ? 0 : scaleX }}
        />

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
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0075C9] rounded-full"
                      transition={prefersReduced ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <MagneticButton href="#contact" />

            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="p-1.5 rounded-md hover:bg-[rgba(0,117,201,0.08)] transition-colors duration-150"
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
            className="bg-[#0075C9] text-white rounded-md px-4 py-1.5 text-sm font-semibold text-center hover:bg-[#003F9F] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
        </div>
      )}

      {/* Floating section indicator — right edge, appears after hero */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: pastHero ? 1 : 0, x: pastHero ? 0 : 16 }}
        transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {SECTION_DOTS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={`Go to ${label}`}
              className="group flex items-center gap-2 justify-end"
            >
              {/* Label — appears on hover */}
              <span className="text-[0.65rem] tracking-[0.1em] uppercase font-semibold font-body text-tint-500 dark:text-[#64748b] opacity-0 group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap">
                {label}
              </span>
              {/* Dot */}
              <motion.span
                className="block rounded-full bg-[#0075C9] flex-shrink-0"
                animate={{ width: isActive ? 20 : 6, height: isActive ? 6 : 6, opacity: isActive ? 1 : 0.35 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </a>
          );
        })}
      </motion.div>
    </>
  );
}
