# PRD — Proposal for Shree 💖

## Original Problem Statement
A romantic, mobile + desktop proposal website for the user's girlfriend **Shree**.
Opens with a glossy heart engraved with an **A & S** monogram. Tapping the heart reveals a
card-format proposal (love story + auto-rotating photo cards of Shree, each with a compliment).
A **YES** button and an **evasive NO** button (NO only dodges on hover, never disappears, only YES
is clickable). On YES: confetti/hearts celebration + colorful acceptance love letter + an Instagram
message box to send a custom message to **@anuragchoudhary_02**. Hidden background music (YouTube)
plays after the heart opens and changes after YES. Everything in English. Deployable to Vercel.

## User Choices
- Music: hidden YouTube player (no music tab, no song name). Love Story (Taylor Swift) `8xg3vE8Ie_E`
  on heart open; switches to `CZy2lfqz-6s` after YES.
- Instagram "send": opens `ig.me/m/anuragchoudhary_02` + copies message to clipboard.
- Frontend-only, no database (best for Vercel).

## Architecture
- **Frontend-only** React (CRA + craco). No backend, no DB.
- Stages state machine in `App.js`: `heart → proposal → celebration`.
- Libraries: framer-motion (animations), lenis (smooth scroll), react-confetti (heart confetti),
  lucide-react (icons), sonner (toasts).
- Photos bundled in `frontend/public/photos/photo1..5.jpg`.
- `frontend/vercel.json` added for SPA routing.

## Components
- `HeartHero.jsx` — SVG glossy heart + gold A&S monogram, `open-heart-btn`.
- `Proposal.jsx` — love story card, photo slider, question, `yes-btn`, evasive `no-btn`.
- `PhotoSlider.jsx` — auto-advancing carousel (5 cards), dots, prev/next.
- `Celebration.jsx` — confetti + acceptance letter + Instagram box.
- `InstagramBox.jsx` — editable message + send (clipboard + ig.me).
- `MusicPlayer.jsx` — hidden offscreen YouTube iframe, mute via postMessage.
- `data.js` — all editable copy, names, song IDs, photo list.

## Status — Implemented (2025)
- ✅ Opening heart with engraved A&S + tap-to-open
- ✅ Hidden music autoplay on open + song switch on YES + mute toggle
- ✅ Love story card + 5 auto-rotating photo cards (Shree's real photos) with compliments
- ✅ Evasive NO button (never disappears) + YES flow
- ✅ Confetti celebration + colorful acceptance letter
- ✅ Instagram custom-message box (@anuragchoudhary_02)
- ✅ Responsive (390px + 1440px), Emergent branding removed
- ✅ Automated testing passed 100% (iteration_1)

## Backlog / Next
- P2: Pause auto-slider while dragging; deterministic YT onReady play.
- P2: Optional "her reply" saved somewhere (would require backend).
