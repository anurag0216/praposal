import { useState } from "react";
import { Instagram, Send, Check } from "lucide-react";
import { toast } from "sonner";
import { INSTAGRAM_USERNAME, DEFAULT_IG_MESSAGE } from "../data";

// Shree types a message and sends it to your Instagram.
// (Instagram can't auto-fill DMs, so we copy her words + open the DM to paste.)
export const InstagramBox = () => {
  const [message, setMessage] = useState(DEFAULT_IG_MESSAGE);
  const [sent, setSent] = useState(false);

  const send = async () => {
    const text = message.trim();
    if (!text) {
      toast.error("Write a little something first 💕");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      /* clipboard may be blocked; we still open the DM */
    }
    setSent(true);
    toast.success("Copied! Opening Instagram — just paste & send 💌");
    window.open(`https://ig.me/m/${INSTAGRAM_USERNAME}`, "_blank", "noopener");
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div
      className="mx-auto mt-4 w-full max-w-lg rounded-3xl border border-rose-300/25 bg-black/30 p-6 backdrop-blur-xl"
      data-testid="instagram-box"
    >
      <div className="flex items-center justify-center gap-2 text-[#f7b8c6]">
        <Instagram size={20} />
        <span className="font-serif text-lg">
          Send a message to @{INSTAGRAM_USERNAME}
        </span>
      </div>
      <textarea
        data-testid="ig-message-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        placeholder="Type your message to him…"
        className="mt-4 w-full resize-none rounded-2xl border border-rose-300/30 bg-[#1a0710]/70 p-4 font-serif text-lg text-[#FBE8E9] placeholder:text-rose-200/40 outline-none focus:border-rose-400/70"
      />
      <button
        type="button"
        onClick={send}
        data-testid="ig-send-btn"
        className="yes-btn mt-4 flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-serif text-xl font-semibold text-white"
      >
        {sent ? <Check size={22} /> : <Send size={20} />}
        {sent ? "Copied — paste it to him!" : "Send on Instagram"}
      </button>
    </div>
  );
};
