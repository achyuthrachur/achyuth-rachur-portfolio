'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface ShinyTextProps {
  text: string;
  className?: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3';
  // legacy loop props kept for any remaining usages
  disabled?: boolean;
  speed?: number;
  shimmerWidth?: number;
  baseColor?: string;
  shineColor?: string;
  mode?: 'scroll' | 'loop';
}

export function ShinyText({
  text,
  className = '',
  as: Tag = 'span',
}: ShinyTextProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: '-40px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReduced]);

  const AnyTag = Tag as React.ElementType;
  return (
    <AnyTag
      ref={ref as React.RefObject<HTMLElement>}
      className={`inline-block ${active ? 'shimmer-active' : ''} ${className}`}
    >
      {text}
    </AnyTag>
  );
}
