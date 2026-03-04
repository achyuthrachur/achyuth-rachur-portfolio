'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, type Variants, type Easing } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: Easing | Easing[];
  splitBy?: 'characters' | 'words';
  from?: { opacity?: number; y?: number; x?: number; scale?: number; filter?: string };
  to?: { opacity?: number; y?: number; x?: number; scale?: number; filter?: string };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

export function SplitText({
  text,
  className = '',
  delay = 50,
  duration = 0.4,
  ease = [0.16, 1, 0.3, 1] as Easing,
  splitBy = 'characters',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  onLetterAnimationComplete,
}: SplitTextProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: rootMargin as `${number}px`, amount: threshold });

  useEffect(() => {
    if (inView) {
      controls.start('visible').then(() => {
        onLetterAnimationComplete?.();
      });
    }
  }, [inView, controls, onLetterAnimationComplete]);

  const tokens =
    splitBy === 'words'
      ? text.split(' ').map((word, i, arr) => (i < arr.length - 1 ? word + '\u00A0' : word))
      : text.split('');

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: from,
    visible: {
      ...to,
      transition: {
        duration,
        ease,
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={`overflow-hidden ${className}`}
      style={{ textAlign, display: 'flex', flexWrap: 'wrap' }}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      aria-label={text}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          variants={itemVariants}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {token}
        </motion.span>
      ))}
    </motion.p>
  );
}
