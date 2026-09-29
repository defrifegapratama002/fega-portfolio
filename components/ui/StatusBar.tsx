"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { PALETTE_EVENT } from "@/components/ui/CommandPalette";

/**
 * Editor-style status bar (desktop only): where you are in the page,
 * how far you have read, and the active theme / language.
 */
export default function StatusBar() {
  const { lang, toggle: toggleLang } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [section, setSection] = useState("top");
  const [progress, setProgress] = useState(0);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      setProgress(Math.round(p * 100));
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;

      // The current section is the last one whose top has passed the upper third.
      const line = window.innerHeight / 3;
      let current = "top";
      for (const s of sections) {
        if (s.getBoundingClientRect().top <= line) current = s.id;
      }
      setSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const item = "flex h-full items-center px-3 transition-colors hover:bg-on-deep/15";

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 hidden h-7 bg-deep font-mono text-[0.65rem] tracking-wide text-on-deep md:block">
      <div ref={bar} className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent" aria-hidden="true" />
      <div className="flex h-full items-center">
        <span className="flex h-full items-center bg-accent px-3 text-[#fdfcfb]">⎇ main</span>
        <span className="px-3">defri-fega/{section}.tsx</span>
        <span className="px-3 opacity-60">{progress}%</span>

        <div className="ml-auto flex h-full items-center">
          <span className="px-3 opacity-60">TypeScript · React</span>
          <button
            type="button"
            className={item}
            onClick={toggleTheme}
            aria-label={lang === "en" ? "Switch theme" : "Ganti tema"}
          >
            {lang === "en" ? "theme" : "tema"}: {theme}
          </button>
          <button
            type="button"
            className={item}
            onClick={toggleLang}
            aria-label={lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
          >
            {lang.toUpperCase()}
          </button>
          <button
            type="button"
            className={item}
            onClick={() => window.dispatchEvent(new Event(PALETTE_EVENT))}
          >
            Ctrl K
          </button>
        </div>
      </div>
    </div>
  );
}
