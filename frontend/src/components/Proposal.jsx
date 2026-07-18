import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FloatingHearts } from "./FloatingHearts";
import { PhotoSlider } from "./PhotoSlider";
import { LOVE_STORY, HER_NAME } from "../data";

const NO_MESSAGES = [
  "Nice try 😄 that little button is far too shy…",
  "Oops! It keeps running away from you 🏃‍♀️💨",
  "The 'No' doesn't work today, my love 💕",
  "Are you sure? Because my heart says otherwise 💖",
  "Catch it if you can… but you never will 😉",
  "Only 'Yes' is allowed to live on this page 🥰",
  "Even the button knows we're meant to be 💘",
];

// Evasive NO button — it only playfully dodges, it never disappears.
const NoButton = ({ onDodge }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dodge = () => {
    const x = (Math.random() - 0.5) * 260;
    const y = (Math.random() - 0.5) * 180;
    setPos({ x, y });
    onDodge?.();
  };
  return (
    <motion.button
      type="button"
      data-testid="no-btn"
      onMouseEnter={dodge}
      onTouchStart={(e) => {
        e.preventDefault();
        dodge();
      }}
      onClick={dodge}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 16 }}
      className="rounded-full border border-rose-300/50 bg-white/5 px-9 py-4 font-serif text-lg text-[#f7b8c6] backdrop-blur"
    >
      No
    </motion.button>
  );
};

export const Proposal = ({ onYes }) => {
  const [noTries, setNoTries] = useState(0);
  const noMessage = noTries > 0 ? NO_MESSAGES[(noTries - 1) % NO_MESSAGES.length] : "";
  return (
    <motion.section
      key="proposal"
      className="relative w-full overflow-hidden px-5 py-16 sm:py-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      data-testid="proposal-section"
    >
      <FloatingHearts count={12} />

      {/* Heading */}
      <div className="relative mx-auto max-w-2xl text-center">
        <motion.h2
          className="font-script text-[#f7b8c6]"
          style={{ fontSize: "clamp(2.2rem,8vw,3.4rem)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          For my {HER_NAME},
        </motion.h2>
        <div className="mx-auto my-3 h-px w-24 bg-gradient-to-r from-transparent via-amber-300/70 to-transparent" />
        <motion.p
          className="font-serif font-light text-[#FBE8E9]"
          style={{ fontSize: "clamp(1.6rem,5.5vw,2.4rem)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          A little proposal, only for you.
        </motion.p>
      </div>

      {/* Love story card */}
      <motion.div
        className="glass-card dashed relative mx-auto mt-10 max-w-2xl p-8 sm:p-12"
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ type: "spring", stiffness: 90, damping: 18 }}
        data-testid="love-story-card"
      >
        <h3 className="text-center font-script text-3xl text-[#9c0f34]">
          Our little love story…
        </h3>
        <div className="mx-auto my-4 h-px w-40 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        {LOVE_STORY.map((p, i) => (
          <p
            key={i}
            className="font-serif italic mt-4 text-[#4a0f1e] text-lg sm:text-xl leading-relaxed"
          >
            {p}
          </p>
        ))}
        <p className="mt-6 flex items-center gap-2 font-serif text-xl font-semibold text-[#9c0f34]">
          So… baby, just say yes.
          <Heart size={22} className="text-rose-500" fill="#f43f5e" strokeWidth={0} />
        </p>
      </motion.div>

      {/* Photo slider */}
      <div className="relative mt-16 flex justify-center">
        <PhotoSlider />
      </div>

      {/* The question */}
      <div className="relative mx-auto mt-20 max-w-3xl text-center">
        <motion.h2
          className="flex flex-wrap items-center justify-center gap-3 font-script text-[#FBE8E9]"
          style={{ fontSize: "clamp(2rem,7vw,3.2rem)" }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          data-testid="proposal-question"
        >
          {HER_NAME}, will you be my girlfriend?
          <Heart size={40} className="text-rose-500" fill="#e11d48" strokeWidth={0} />
        </motion.h2>

        <div className="relative mt-12 flex items-center justify-center gap-6">
          <motion.button
            type="button"
            data-testid="yes-btn"
            onClick={onYes}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="yes-btn flex items-center gap-2 rounded-full px-12 py-4 font-serif text-2xl font-semibold text-white"
          >
            Yes, I will
            <Heart size={24} fill="#fff" strokeWidth={0} />
          </motion.button>
          <NoButton onDodge={() => setNoTries((n) => n + 1)} />
        </div>

        <div className="mt-8 flex min-h-[2.5rem] items-center justify-center">
          <AnimatePresence mode="wait">
            {noMessage && (
              <motion.p
                key={noTries}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="font-serif italic text-lg sm:text-xl text-[#f7b8c6]"
                data-testid="no-message"
              >
                {noMessage}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};
