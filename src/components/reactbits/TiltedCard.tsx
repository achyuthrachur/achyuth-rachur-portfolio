'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion, useSpring } from 'motion/react';

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  glareEnable?: boolean;
  glareMaxOpacity?: number;
  glareColor?: string;
  scale?: number;
  transitionSpeed?: number;
}

export function TiltedCard({
  children,
  className = '',
  containerClassName = '',
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  glareEnable = true,
  glareMaxOpacity = 0.15,
  glareColor = 'rgba(245, 168, 0, 1)',
  scale = 1.03,
  transitionSpeed = 400,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { stiffness: 200, damping: 30 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scaleSpring = useSpring(1, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const tiltX = (y - 0.5) * -tiltMaxAngleX * 2;
    const tiltY = (x - 0.5) * tiltMaxAngleY * 2;

    rotateX.set(tiltX);
    rotateY.set(tiltY);
    setGlarePosition({ x: x * 100, y: y * 100 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scaleSpring.set(scale);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scaleSpring.set(1);
  };

  void transitionSpeed;

  return (
    <div className={`perspective-1000 ${containerClassName}`} style={{ perspective: '1000px' }}>
      <motion.div
        ref={ref}
        className={`relative transform-gpu cursor-pointer ${className}`}
        style={{
          rotateX,
          rotateY,
          scale: scaleSpring,
          transformStyle: 'preserve-3d',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
        {glareEnable && isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor}, transparent 50%)`,
              opacity: glareMaxOpacity,
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
