'use client';

import { useEffect, useRef } from 'react';

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
}

export function Aurora({
  colorStops = ['#011E41', '#002E62', '#F5A800'],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
  className = '',
}: AuroraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const parseHex = (hex: string): [number, number, number] => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return [r, g, b];
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = (ts: number) => {
      timeRef.current = ts * 0.001 * speed;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      const numLayers = colorStops.length;

      for (let li = 0; li < numLayers; li++) {
        const color = parseHex(colorStops[li]);
        const nextColor = parseHex(colorStops[(li + 1) % numLayers]);

        const phase = (li / numLayers) * Math.PI * 2;
        const yCenter = h * (0.3 + 0.4 * ((li + 1) / numLayers));
        const waveH = h * 0.25 * amplitude;

        ctx.beginPath();
        ctx.moveTo(0, h);

        for (let x = 0; x <= w; x += 4) {
          const xNorm = x / w;
          const wave1 = Math.sin(xNorm * 3 + t + phase) * waveH;
          const wave2 = Math.sin(xNorm * 5 + t * 1.3 + phase) * waveH * 0.5;
          const y = yCenter + wave1 + wave2;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.closePath();

        const blendT = (Math.sin(t * 0.7 + phase) + 1) / 2;
        const r = Math.round(lerp(color[0], nextColor[0], blendT));
        const g = Math.round(lerp(color[1], nextColor[1], blendT));
        const b = Math.round(lerp(color[2], nextColor[2], blendT));

        const grad = ctx.createLinearGradient(0, yCenter - waveH, 0, h);
        grad.addColorStop(0, `rgba(${r},${g},${b},${blend})`);
        grad.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grad;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
    };
  }, [colorStops, blend, amplitude, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}
