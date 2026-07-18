import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { Volume2, VolumeX } from "lucide-react";
import { Toaster } from "sonner";
import "@/App.css";

import { HeartHero } from "@/components/HeartHero";
import { Proposal } from "@/components/Proposal";
import { Celebration } from "@/components/Celebration";
import { MusicPlayer } from "@/components/MusicPlayer";
import { SONG_BEFORE, SONG_AFTER } from "@/data";

function App() {
  const [stage, setStage] = useState("heart"); // heart -> proposal -> celebration
  const [song, setSong] = useState(null);
  const [muted, setMuted] = useState(false);

  // Smooth momentum scrolling
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [stage]);

  const openHeart = () => {
    setSong(SONG_BEFORE); // Love Story starts (triggered by this tap)
    setStage("proposal");
  };

  const sayYes = () => {
    setSong(SONG_AFTER); // song changes on YES
    setStage("celebration");
  };

  return (
    <div className="App grain relative min-h-[100dvh] w-full">
      <MusicPlayer videoId={song} muted={muted} />
      <Toaster position="top-center" theme="dark" richColors />

      {song && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          data-testid="mute-toggle"
          aria-label={muted ? "Unmute music" : "Mute music"}
          className="fixed bottom-5 right-5 z-[70] grid h-12 w-12 place-items-center rounded-full border border-rose-300/30 bg-black/40 text-[#f7b8c6] backdrop-blur-md transition-transform hover:scale-110"
        >
          {muted ? <VolumeX size={22} /> : <Volume2 size={22} />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {stage === "heart" && <HeartHero key="heart" onOpen={openHeart} />}
        {stage === "proposal" && <Proposal key="proposal" onYes={sayYes} />}
        {stage === "celebration" && <Celebration key="celebration" />}
      </AnimatePresence>
    </div>
  );
}

export default App;
