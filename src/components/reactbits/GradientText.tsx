'use client';

import { type ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
}

export function GradientText({
  children,
  className = '',
  colors = ['#011E41', '#F5A800', '#002E62', '#D7761D', '#011E41'],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')}, ${colors[0]})`,
    backgroundSize: '300% 100%',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    backgroundClip: 'text' as const,
    color: 'transparent',
    animation: `gradient-shift ${animationSpeed}s linear infinite`,
  };

  const borderStyle = showBorder
    ? {
        padding: '0.125rem',
        background: `linear-gradient(to right, ${colors.join(', ')}, ${colors[0]})`,
        backgroundSize: '300% 100%',
        borderRadius: '0.375rem',
        animation: `gradient-shift ${animationSpeed}s linear infinite`,
      }
    : {};

  return (
    <>
      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      {showBorder ? (
        <span style={borderStyle}>
          <span style={gradientStyle} className={className}>
            {children}
          </span>
        </span>
      ) : (
        <span style={gradientStyle} className={className}>
          {children}
        </span>
      )}
    </>
  );
}
