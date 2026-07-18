import { useEffect, useRef } from "react";

// Hidden YouTube audio player. No visible video, no song name, no music tab.
// Plays automatically because it is (re)mounted right after a user gesture
// (tapping the heart / clicking YES), which browsers allow.
export const MusicPlayer = ({ videoId, muted }) => {
  const iframeRef = useRef(null);

  const post = (func, args = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  };

  useEffect(() => {
    // give the player a moment to load, then apply mute state
    const t = setTimeout(() => {
      post(muted ? "mute" : "unMute");
      post("playVideo");
    }, 700);
    return () => clearTimeout(t);
  }, [muted, videoId]);

  if (!videoId) return null;

  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&loop=1&playlist=${videoId}` +
    `&controls=0&modestbranding=1&enablejsapi=1&playsinline=1&rel=0`;

  return (
    <iframe
      key={videoId}
      ref={iframeRef}
      title="ambient-music"
      data-testid="hidden-music-player"
      src={src}
      allow="autoplay; encrypted-media"
      style={{
        position: "fixed",
        width: 1,
        height: 1,
        left: -9999,
        top: -9999,
        border: 0,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
};
