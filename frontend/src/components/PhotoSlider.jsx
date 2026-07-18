import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PHOTO_CARDS } from "../data";

const AUTO_MS = 4500;

// Auto-advancing photo carousel — each card has a photo of Shree + a compliment.
export const PhotoSlider = () => {
  const [[index, dir], setState] = useState([0, 1]);
  const count = PHOTO_CARDS.length;

  const go = useCallback(
    (step) => setState(([i]) => [(i + step + count) % count, step]),
    [count]
  );

  useEffect(() => {
    const t = setInterval(() => go(1), AUTO_MS); // moves by itself
    return () => clearInterval(t);
  }, [go]);

  const card = PHOTO_CARDS[index];

  return (
    <div className="w-full max-w-md" data-testid="photo-slider">
      <div className="relative h-[560px] sm:h-[600px]">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.article
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 120, scale: 0.92, rotate: dir * 3 }}
            animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, x: dir * -120, scale: 0.92, rotate: dir * -3 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="glass-card dashed absolute inset-0 overflow-hidden p-4"
            data-testid={`photo-card-${index}`}
          >
            <div className="h-[62%] w-full overflow-hidden rounded-2xl ring-1 ring-rose-300/50">
              <img
                src={card.img}
                alt={`${card.title}`}
                loading="lazy"
                className="h-full w-full object-cover"
                style={{ imageOrientation: "from-image" }}
              />
            </div>
            <div className="px-1 pt-4">
              <h3
                className="font-serif font-semibold text-[#9c0f34]"
                style={{ fontSize: "clamp(1.4rem,4.5vw,1.85rem)", lineHeight: 1.1 }}
              >
                {card.title}
              </h3>
              <p className="font-serif italic mt-2 text-[#6b1226] text-base sm:text-lg leading-snug">
                {card.text}
              </p>
            </div>
          </motion.article>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(-1)}
          data-testid="slider-prev"
          className="absolute left-1 top-[31%] z-10 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-[#FBE8E9] backdrop-blur transition-colors hover:bg-black/50"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(1)}
          data-testid="slider-next"
          className="absolute right-1 top-[31%] z-10 grid h-10 w-10 place-items-center rounded-full bg-black/30 text-[#FBE8E9] backdrop-blur transition-colors hover:bg-black/50"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2.5">
        {PHOTO_CARDS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => setState([i, i > index ? 1 : -1])}
            data-testid={`slider-dot-${i}`}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: i === index ? 26 : 10,
              background: i === index ? "#f43f5e" : "rgba(251,232,233,0.35)",
            }}
          />
        ))}
      </div>
    </div>
  );
};
