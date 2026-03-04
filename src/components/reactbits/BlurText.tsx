'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, useReducedMotion, type Variants } from 'motion/react';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  animateBy?: 'words' | 'characters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
}

export function BlurText({
  text,
  className = '',
  delay = 100,
  duration = 0.5,
  threshold = 0.1,
  rootMargin = '-100px',
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
}: BlurTextProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: rootMargin as `${number}px`, amount: threshold });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      controls.set('visible');
      return;
    }
    if (inView) {
      controls.start('visible').then(() => {
        onAnimationComplete?.();
      });
    }
  }, [inView, controls, prefersReduced, onAnimationComplete]);

  const tokens =
    animateBy === 'words'
      ? text.split(' ').map((word, i, arr) => (i < arr.length - 1 ? word + '\u00A0' : word))
      : text.split('');

  const yOffset = direction === 'top' ? -20 : 20;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
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
