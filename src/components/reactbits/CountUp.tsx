'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from 'motion/react';

interface CountUpProps {
  from?: number;
  to: number;
  separator?: string;
  direction?: 'up' | 'down';
  duration?: number;
  className?: string;
  startWhen?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function CountUp({
  from = 0,
  to,
  separator = '',
  direction = 'up',
  duration = 2,
  className = '',
  startWhen = true,
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!inView || !startWhen || hasStarted) return;

    setHasStarted(true);
    onStart?.();

    const startValue = direction === 'down' ? to : from;
    const endValue = direction === 'down' ? from : to;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(startValue + (endValue - startValue) * easedProgress);

      if (ref.current) {
        ref.current.textContent = separator
          ? current.toLocaleString()
          : String(current);
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        onEnd?.();
      }
    };

    requestAnimationFrame(update);
  }, [inView, startWhen, hasStarted, from, to, direction, duration, separator, onStart, onEnd]);

  const initialValue = direction === 'down' ? to : from;

  return (
    <span
      ref={ref}
      className={className}
    >
      {separator ? initialValue.toLocaleString() : String(initialValue)}
    </span>
  );
}
