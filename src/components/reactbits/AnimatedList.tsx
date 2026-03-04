'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react';

interface AnimatedListProps {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  from?: { opacity?: number; y?: number; x?: number; scale?: number };
  to?: { opacity?: number; y?: number; x?: number; scale?: number };
}

export function AnimatedList({
  children,
  className = '',
  delay = 80,
  duration = 0.5,
  threshold = 0.1,
  rootMargin = '-50px',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
}: AnimatedListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: rootMargin as `${number}px`, amount: threshold });
  const prefersReduced = useReducedMotion();

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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={prefersReduced || inView ? 'visible' : 'hidden'}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  );
}
