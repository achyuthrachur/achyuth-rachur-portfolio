'use client';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  shimmerWidth?: number;
}

export function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = '',
  shimmerWidth = 100,
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <p
      className={`inline-flex items-center bg-clip-text text-transparent ${
        disabled ? '' : 'animate-shiny-text'
      } ${className}`}
      style={
        disabled
          ? {}
          : {
              backgroundImage: `linear-gradient(
                120deg,
                rgba(245,168,0,0) 40%,
                rgba(245,168,0,0.8) 50%,
                rgba(245,168,0,0) 60%
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
    </p>
  );
}
