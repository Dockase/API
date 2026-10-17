"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Build your AI on it.",
  "Build your research engine on it.",
  "Build your drafting copilot on it.",
  "Build your compliance engine on it.",
];

const TYPE_MS = 55;
const DELETE_MS = 30;
const HOLD_MS = 1800;
const NEXT_PHRASE_MS = 300;

const LONGEST = PHRASES.reduce((a, b) => (b.length > a.length ? b : a));

export default function Typewriter() {
  // First render (server + hydration) is always the full first phrase —
  // no animation starts until after mount, so there is no mismatch.
  const [text, setText] = useState(PHRASES[0]);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // leave the static first phrase in place
    }
    setAnimating(true);

    let timer: ReturnType<typeof setTimeout>;
    let phrase = 0;
    let len = PHRASES[0].length;

    const type = () => {
      const current = PHRASES[phrase];
      if (len < current.length) {
        len += 1;
        setText(current.slice(0, len));
        timer = setTimeout(type, TYPE_MS);
      } else {
        timer = setTimeout(erase, HOLD_MS);
      }
    };

    const erase = () => {
      const current = PHRASES[phrase];
      if (len > 0) {
        len -= 1;
        setText(current.slice(0, len));
        timer = setTimeout(erase, DELETE_MS);
      } else {
        phrase = (phrase + 1) % PHRASES.length;
        timer = setTimeout(type, NEXT_PHRASE_MS);
      }
    };

    // Hold the full first phrase, then start the carousel.
    timer = setTimeout(erase, HOLD_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="relative inline-block">
      {/* Invisible longest phrase reserves the line box so the layout never shifts */}
      <span aria-hidden="true" className="invisible">
        {LONGEST}
      </span>
      <span className="absolute inset-0">
        {text}
        {animating && (
          <span className="ml-1 inline-block h-[0.9em] w-[0.55em] translate-y-[0.12em] animate-[cursor-blink_1s_step-end_infinite] bg-gold" />
        )}
      </span>
    </span>
  );
}
