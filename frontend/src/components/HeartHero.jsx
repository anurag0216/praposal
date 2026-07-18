import { motion } from "framer-motion";
import { FloatingHearts } from "./FloatingHearts";
import { MY_INITIAL, HER_NAME } from "../data";

// Opening screen — a glossy 3D heart with the engraved A & S monogram.
export const HeartHero = ({ onOpen }) => {
  const initial = HER_NAME.charAt(0);
  return (
    <motion.section
      key="heart"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15, filter: "blur(8px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      data-testid="heart-hero"
    >
      <FloatingHearts count={14} />

      <motion.button
        type="button"
        onClick={onOpen}
        data-testid="open-heart-btn"
        aria-label="Open the heart"
        className="relative cursor-pointer outline-none"
        whileTap={{ scale: 0.92 }}
        animate={{ scale: [1, 1.06, 1, 1.04, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="heart-wrap">
          <svg viewBox="0 0 100 92" className="h-full w-full" aria-hidden="true">
            <defs>
              <radialGradient id="heartFill" cx="38%" cy="30%" r="80%">
                <stop offset="0%" stopColor="#ff8fb0" />
                <stop offset="38%" stopColor="#e11d48" />
                <stop offset="74%" stopColor="#a30f38" />
                <stop offset="100%" stopColor="#5c0620" />
              </radialGradient>
              <radialGradient id="heartShine" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffd0dd" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffd0dd" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M50 84 C 20 62 6 44 6 27 C 6 14 16 6 27 6 C 38 6 46 14 50 23 C 54 14 62 6 73 6 C 84 6 94 14 94 27 C 94 44 80 62 50 84 Z"
              fill="url(#heartFill)"
            />
            <ellipse cx="33" cy="26" rx="16" ry="12" fill="url(#heartShine)" />
          </svg>
          <div className="heart-mono">
            <span
              className="gold-text select-none"
              style={{ fontSize: "clamp(2.4rem, 11vw, 4.6rem)", lineHeight: 1, transform: "translateY(-6%)" }}
            >
              {MY_INITIAL}
              <span
                className="font-script"
                style={{ fontSize: "0.6em", margin: "0 0.08em", verticalAlign: "0.1em" }}
              >
                &amp;
              </span>
              {initial}
            </span>
          </div>
        </div>
      </motion.button>

      <motion.div
        className="mt-10 text-center"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.9 }}
      >
        <h1
          className="font-serif font-light text-[#FBE8E9]"
          style={{ fontSize: "clamp(1.7rem, 5vw, 2.6rem)" }}
          data-testid="hero-title"
        >
          Tap the heart, my love
        </h1>
        <p className="font-serif italic mt-2 text-[#f7b8c6] text-base md:text-lg tap-hint">
          …a little something is waiting inside for you.
        </p>
      </motion.div>
    </motion.section>
  );
};
