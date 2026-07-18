import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { FloatingHearts } from "./FloatingHearts";
import { InstagramBox } from "./InstagramBox";
import { LETTER, HER_NAME, MY_INITIAL } from "../data";

const drawHeart = (ctx) => {
  const s = 7;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.35);
  ctx.bezierCurveTo(0, -s * 0.1, -s, -s * 0.1, -s, s * 0.35);
  ctx.bezierCurveTo(-s, s, 0, s * 1.2, 0, s * 1.5);
  ctx.bezierCurveTo(0, s * 1.2, s, s, s, s * 0.35);
  ctx.bezierCurveTo(s, -s * 0.1, 0, -s * 0.1, 0, s * 0.35);
  ctx.closePath();
  ctx.fill();
};

export const Celebration = () => {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const [pieces, setPieces] = useState(320);

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    const slow = setTimeout(() => setPieces(90), 6500); // ease off after the burst
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(slow);
    };
  }, []);

  return (
    <motion.section
      key="celebration"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      data-testid="celebration-section"
    >
      <Confetti
        width={size.w}
        height={size.h}
        numberOfPieces={pieces}
        gravity={0.14}
        recycle
        colors={["#e11d48", "#f43f5e", "#ff8fab", "#f5d061", "#ffd9a0", "#ff5c8a"]}
        drawShape={drawHeart}
      />
      <FloatingHearts count={16} />

      <motion.h1
        className="relative flex flex-wrap items-center justify-center gap-3 text-center font-script text-[#FBE8E9]"
        style={{ fontSize: "clamp(2.2rem,8vw,3.6rem)" }}
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.2 }}
        data-testid="celebration-title"
      >
        <Heart size={40} className="text-rose-500" fill="#e11d48" strokeWidth={0} />
        {HER_NAME} said YES!
        <Heart size={40} className="text-rose-500" fill="#e11d48" strokeWidth={0} />
      </motion.h1>

      <motion.div
        className="letter-card dashed relative mx-auto mt-10 max-w-2xl p-8 sm:p-12"
        initial={{ opacity: 0, y: 60, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.4 }}
        data-testid="acceptance-letter"
      >
        <h2 className="text-center font-serif italic text-2xl sm:text-3xl love-gradient font-semibold">
          A Little Note From Me — for You, {HER_NAME}
        </h2>
        <div className="mx-auto my-4 h-px w-40 bg-gradient-to-r from-transparent via-amber-500/70 to-transparent" />
        {LETTER.map((p, i) => (
          <p
            key={i}
            className="mt-4 font-serif text-lg sm:text-xl leading-relaxed text-[#7a1226]"
          >
            {p}
          </p>
        ))}
        <p className="mt-8 flex items-center justify-center gap-3 text-center font-script text-2xl sm:text-3xl love-gradient font-bold">
          <Heart size={22} className="text-rose-500" fill="#f43f5e" strokeWidth={0} />
          Yours, from the very first heartbeat — {MY_INITIAL}.
          <Heart size={22} className="text-rose-500" fill="#f43f5e" strokeWidth={0} />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative w-full"
      >
        <InstagramBox />
      </motion.div>
    </motion.section>
  );
};
