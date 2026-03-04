'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { animate } from 'animejs';
import { ArrowDown } from 'iconsax-react';
import { Aurora } from '@/components/reactbits/Aurora';

const STATS = [
  'Crowe LLP',
  'AI Solution Builder',
  'Credit Risk & Model Validation Consultant',
];

export function HeroSection() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const prefersReducedRaw = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedRaw || !scrollIndicatorRef.current) return;

    const anim = animate(scrollIndicatorRef.current, {
      translateY: [0, 8, 0],
      duration: 1200,
      loop: true,
      ease: 'inOutSine',
    });

    return () => { anim.cancel(); };
  }, []);

  return (
    <section
      id="hero"
      className="hero-grain relative min-h-screen bg-[#0f172a] flex items-center overflow-hidden"
    >
      <Aurora
        colorStops={['#0f172a', '#1e293b', '#312e81']}
        blend={0.3}
        amplitude={1.0}
        speed={0.5}
      />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-6 py-24">

        {/* Available badge */}
        <motion.div
          className="inline-flex items-center gap-2 mb-8"
          initial={prefersReduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="relative flex h-2 w-2">
            <span className="status-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[0.65rem] tracking-[0.2em] uppercase font-semibold font-body text-[rgba(246,247,250,0.5)]">
            Open to Opportunities
          </span>
        </motion.div>

        {/* Stacked display name */}
        <div className="overflow-hidden">
          <motion.p
            className="font-display font-black text-[clamp(3.5rem,12vw,6rem)] text-[#f6f7fa] whitespace-nowrap leading-none tracking-tight"
            initial={prefersReduced ? false : { y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            ACHYUTH
          </motion.p>
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="font-display font-black text-[clamp(3.5rem,12vw,6rem)] text-[#6366f1] whitespace-nowrap leading-none tracking-tight"
            initial={prefersReduced ? false : { y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={prefersReduced ? { duration: 0 } : { delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            RACHUR
          </motion.p>
        </div>

        {/* Accent underline */}
        <motion.div
          className="h-0.5 rounded-full bg-[#6366f1] mt-4 mb-6"
          initial={prefersReduced ? false : { width: 0 }}
          animate={{ width: '4rem' }}
          transition={prefersReduced ? { duration: 0 } : { delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtitle */}
        <motion.p
          className="text-lg md:text-xl font-body text-[rgba(246,247,250,0.65)] mb-3"
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Staff Consultant | AI Enablement & Integrated Risk Management
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="text-base font-body text-[rgba(246,247,250,0.4)] max-w-lg mb-10"
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Helping financial institutions design, deploy, and govern AI that works.
        </motion.p>

        {/* Stats row — staggered per item */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {STATS.map((stat, i) => (
            <motion.span
              key={stat}
              className="flex items-center gap-4"
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReduced ? { duration: 0 } : { delay: 0.8 + i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {i > 0 && (
                <span className="text-[rgba(246,247,250,0.2)] select-none" aria-hidden>·</span>
              )}
              <span className="text-[0.7rem] tracking-[0.18em] uppercase font-semibold font-body text-[rgba(246,247,250,0.45)]">
                {stat}
              </span>
            </motion.span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: indicatorOpacity }}
      >
        <a href="#about" aria-label="Scroll to About section">
          <div ref={scrollIndicatorRef}>
            <ArrowDown variant="Linear" color="rgba(246,247,250,0.4)" size={24} />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
