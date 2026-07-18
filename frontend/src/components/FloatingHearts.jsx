import { Heart } from "lucide-react";
import { useMemo } from "react";

// Ambient floating hearts that drift upward across the screen
export const FloatingHearts = ({ count = 16, className = "" }) => {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 26,
        duration: 9 + Math.random() * 12,
        delay: Math.random() * 12,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <span
          key={h.id}
          className="float-heart"
          style={{
            left: `${h.left}%`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <Heart
            style={{ width: h.size, height: h.size, opacity: h.opacity }}
            fill="currentColor"
            strokeWidth={0}
          />
        </span>
      ))}
    </div>
  );
};
