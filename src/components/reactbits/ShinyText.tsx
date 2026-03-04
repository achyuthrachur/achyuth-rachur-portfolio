'use client';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerWidth?: number;
  baseColor?: string;
  shineColor?: string;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3';
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = '',
  shimmerWidth = 100,
  baseColor = '#f6f7fa',
  shineColor = 'rgba(255,255,255,0.9)',
  as: Tag = 'span',
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <Tag
      className={`inline-flex items-center bg-clip-text text-transparent ${
        disabled ? '' : 'animate-shiny-text'
      } ${className}`}
      style={
        disabled
          ? { color: baseColor }
          : {
              backgroundImage: `linear-gradient(
                120deg,
                ${baseColor} 40%,
                ${shineColor} 50%,
                ${baseColor} 60%
              )`,
              backgroundSize: `${shimmerWidth}% 100%`,
              backgroundRepeat: 'no-repeat',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animationDuration,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationName: 'shiny-text',
            }
      }
    >
      {text}
      {!disabled && (
        <style>{`
          @keyframes shiny-text {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
        `}</style>
      )}
    </Tag>
  );
}
