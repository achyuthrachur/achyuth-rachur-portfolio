'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { animate } from 'animejs';
import { ArrowDown } from 'iconsax-react';
import { Aurora } from '@/components/reactbits/Aurora';
import { SplitText } from '@/components/reactbits/SplitText';
import { BlurText } from '@/components/reactbits/BlurText';

export function HeroSection() {
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !scrollIndicatorRef.current) return;

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
      className="relative min-h-screen bg-[#011E41] flex items-center justify-center overflow-hidden"
    >
      {/* Aurora atmospheric background — indigo-only stops, removes default amber */}
      <Aurora
        colorStops={['#011E41', '#002E62', '#003F9F']}
        blend={0.3}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Content layer — above Aurora canvas */}
      <div className="relative z-10 max-w-2xl w-full px-6">
        {/* Name with character-by-character SplitText entrance */}
        <SplitText
          text="Achyuth Rachur"
          splitBy="characters"
          delay={50}
          duration={0.4}
          className="font-display font-bold text-5xl md:text-6xl text-[#f6f7fa] leading-tight"
          textAlign="left"
        />

        {/* Amber underline brand moment — expands left-to-right at 0.8s */}
        <motion.div
          className="h-1 rounded-full bg-[#F5A800] mt-2 mb-6"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Subtitle with word-by-word BlurText entrance */}
        <BlurText
          text="Staff Consultant | Integrated Risk Management"
          animateBy="words"
          direction="top"
          delay={200}
          duration={0.5}
          className="text-xl md:text-2xl font-body text-[rgba(246,247,250,0.7)]"
        />

        {/* Tagline paragraph — fades in from below at 0.6s delay */}
        <motion.p
          className="mt-4 text-base md:text-lg font-body text-[rgba(246,247,250,0.55)] max-w-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Helping financial institutions design, deploy, and govern AI that works.
        </motion.p>
      </div>

      {/* Scroll indicator — bounces via Anime.js, fades on scroll via MotionValue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ opacity: indicatorOpacity }}
      >
        <a href="#about" aria-label="Scroll to About section">
          <div ref={scrollIndicatorRef}>
            <ArrowDown variant="Linear" color="#f6f7fa" size={28} />
          </div>
        </a>
      </motion.div>
    </section>
  );
}
