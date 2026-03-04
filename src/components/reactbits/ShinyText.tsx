'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface ShinyTextProps {
  text: string;
  className?: string;
  baseColor?: string;
  shineColor?: string;
  /** 'scroll' = one-shot shimmer when heading enters view (default for headings) */
  /** 'loop'   = continuous shimmer (legacy, use sparingly) */
  mode?: 'scroll' | 'loop';
  speed?: number;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3';
}

export function ShinyText({
  text,
  className = '',
  baseColor = '#f6f7fa',
  shineColor = 'rgba(255,255,255,0.9)',
  mode = 'scroll',
  speed = 6,
  as: Tag = 'span',
}: ShinyTextProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (mode !== 'scroll' || prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5, rootMargin: '-50px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mode, prefersReduced]);

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(120deg, ${baseColor} 40%, ${shineColor} 50%, ${baseColor} 60%)`,
    backgroundSize: '200% 100%',
    backgroundPosition: active ? undefined : '200% center',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  if (mode === 'loop' && !prefersReduced) {
    return (
      <Tag
        className={`inline-flex items-center ${className}`}
        style={{
          ...gradientStyle,
          backgroundPosition: undefined,
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationName: 'shiny-text',
        }}
      >
        {text}
        <style>{`
          @keyframes shiny-text {
            0%   { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      </Tag>
    );
  }

  // scroll mode (default) — one-shot on view entry
  const AnyTag = Tag as React.ElementType;
  return (
    <AnyTag
      ref={ref as React.RefObject<HTMLElement>}
      className={`inline-block ${active ? 'shimmer-active' : ''} ${className}`}
      style={gradientStyle}
    >
      {text}
    </AnyTag>
  );
}
