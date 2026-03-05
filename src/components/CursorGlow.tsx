'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface CursorGlowProps {
  /** CSS color of the glow — defaults to indigo */
  color?: string;
}

export function CursorGlow({
  color = 'rgba(0,117,201,0.12)',
}: CursorGlowProps) {
  const prefersReduced = useReducedMotion();
  const glowRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: -999, y: -999 });
  const raf = useRef<number>(0);

  useEffect(() => {
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const onLeave = () => setVisible(false);

    const tick = () => {
      if (glowRef.current) {
        glowRef.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed top-0 left-0 z-0 rounded-full transition-opacity duration-300"
      style={{
        width: 600,
        height: 600,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: visible ? 1 : 0,
        willChange: 'transform',
      }}
    />
  );
}
