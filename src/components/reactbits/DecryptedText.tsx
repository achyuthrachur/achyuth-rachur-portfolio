'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;       // ms per frame
  revealDelay?: number; // ms before decode starts after entering view
}

export function DecryptedText({
  text,
  className = '',
  speed = 40,
  revealDelay = 0,
}: DecryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const revealedCount = useRef(0);
  const [displayed, setDisplayed] = useState(() =>
    text.split('').map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
  );
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const t = setTimeout(() => setStarted(true), revealDelay);
          observer.disconnect();
          return () => clearTimeout(t);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealDelay]);

  useEffect(() => {
    if (!started) return;
    revealedCount.current = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => {
        const next = [...prev];
        // Lock in revealed characters, scramble rest
        for (let i = revealedCount.current; i < text.length; i++) {
          if (text[i] === ' ') {
            next[i] = ' ';
          } else {
            next[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
        return next;
      });

      revealedCount.current += 1;

      if (revealedCount.current > text.length) {
        clearInterval(interval);
        setDisplayed(text.split(''));
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {displayed.join('')}
    </span>
  );
}
