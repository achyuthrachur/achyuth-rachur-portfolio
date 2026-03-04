'use client';

import { motion, useReducedMotion } from 'motion/react';
import { ShinyText } from '@/components/reactbits/ShinyText';
import { DecryptedText } from '@/components/reactbits/DecryptedText';
import { useTheme } from '@/components/ThemeProvider';

export function AboutSection() {
  const prefersReduced = useReducedMotion();
  const { theme } = useTheme();
  const headingColor = theme === 'dark' ? '#f6f7fa' : '#0f172a';

  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      <motion.div
        {...(prefersReduced ? {} : {
          initial: { opacity: 0, y: 30 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-100px' },
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        })}
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase font-body mb-1">
          <DecryptedText text="ABOUT" className="text-[#0075C9]" speed={35} />
        </p>
        <h2 className="text-3xl font-semibold font-body">
          <ShinyText
            text="Who I Am"
            as="span"
            baseColor={headingColor}
            shineColor="rgba(255,255,255,0.85)"
            speed={6}
          />
        </h2>
        <motion.div
          className="h-0.5 bg-[#0075C9] rounded-full mt-2 mb-8"
          {...(prefersReduced ? {} : {
            initial: { width: 0 },
            whileInView: { width: '3rem' },
            viewport: { once: true },
            transition: { delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          })}
        />
        <p className="text-lg text-tint-700 dark:text-[#94a3b8] leading-relaxed max-w-2xl font-body">
          I work at the intersection of AI and financial services risk — helping institutions
          design, govern, and validate AI systems that regulators and internal stakeholders
          can trust. At Crowe, I lead engagements where the goal isn&apos;t just to ship a
          model, but to build the controls, documentation, and oversight structures that make
          it defensible. I&apos;m most useful when the problem involves both technical judgment
          and regulatory context — translating between what the model does and what the
          business actually needs to know.
        </p>
      </motion.div>
    </div>
  );
}
