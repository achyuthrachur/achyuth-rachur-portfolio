'use client';

import { motion, useReducedMotion } from 'motion/react';

export function AboutSection() {
  const prefersReduced = useReducedMotion();

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
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#6366f1] font-body mb-1">
          About
        </p>
        <h2 className="text-3xl font-semibold text-tint-900 dark:text-[#f6f7fa] font-body">
          Who I Am
        </h2>
        <motion.div
          className="h-0.5 bg-[#6366f1] rounded-full mt-2 mb-8"
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
