"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/ui/Section";
import { useLang } from "@/lib/i18n";

/**
 * Computer vision chapter demo, after the Manga OCR project: text locked
 * in an image is read, translated and spoken. The scan is staged (CSS);
 * the speech is real (Web Speech API).
 */

const JP_TEXT = "こんにちは、世界！";
const EN_TEXT = "Hello, world!";

export default function VisionSection() {
  const { lang } = useLang();
  const [stage, setStage] = useState(0); // 0 idle · 1 scanning · 2 extracted · 3 translated
  const [run, setRun] = useState(0); // restarts the CSS animation
  const [canSpeak, setCanSpeak] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setCanSpeak("speechSynthesis" in window);
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const runScan = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(3);
      return;
    }
    setStage(1);
    setRun((n) => n + 1);
    timers.current.push(
      window.setTimeout(() => setStage(2), 1400),
      window.setTimeout(() => setStage(3), 2100),
    );
  };

  const speak = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(EN_TEXT);
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  return (
    <Section
      id="tech-vision"
      label={{ en: "Computer vision · try it", id: "Computer vision · coba" }}
      title={{
        en: "Text inside an image, read out loud.",
        id: "Teks di dalam gambar, dibacakan.",
      }}
      lede={{
        en: "The same chain as the Manga OCR tool: find the text, read it, translate it, speak it. The scan here is staged; the voice is your browser's own.",
        id: "Rantai yang sama dengan alat Manga OCR: temukan teksnya, baca, terjemahkan, ucapkan. Pemindaian di sini simulasi; suaranya dari browser Anda sendiri.",
      }}
    >
      <div className="mt-10 grid items-start gap-8 md:grid-cols-2">
        <figure>
          <div className="relative overflow-hidden border border-line bg-panel2">
            <svg viewBox="0 0 320 240" className="block w-full" role="img" aria-label="Manga panel with Japanese speech bubble">
              <rect x="8" y="8" width="304" height="224" style={{ fill: "var(--color-bg)", stroke: "var(--color-line)" }} />
              <circle cx="95" cy="150" r="28" style={{ fill: "var(--color-panel2)", stroke: "var(--color-line)" }} />
              <rect x="65" y="180" width="60" height="52" rx="14" style={{ fill: "var(--color-panel2)", stroke: "var(--color-line)" }} />
              <g strokeWidth="1" style={{ stroke: "var(--color-line)" }}>
                <line x1="240" y1="24" x2="300" y2="18" />
                <line x1="248" y1="44" x2="304" y2="42" />
                <line x1="244" y1="64" x2="300" y2="68" />
              </g>
              <ellipse cx="205" cy="105" rx="88" ry="46" style={{ fill: "var(--color-panel2)", stroke: "var(--color-line)" }} />
              <path d="M150 138 L128 165 L166 144 Z" style={{ fill: "var(--color-panel2)", stroke: "var(--color-line)" }} />
              <text x="205" y="112" textAnchor="middle" fontSize="19" fontFamily="serif" style={{ fill: "var(--color-fg)" }}>
                {JP_TEXT}
              </text>
              {stage >= 2 ? (
                <rect x="120" y="86" width="170" height="36" fill="none" strokeWidth="1.5" strokeDasharray="6 4" style={{ stroke: "var(--color-accent)" }} />
              ) : null}
              {stage >= 2 ? (
                <text x="122" y="80" fontSize="9" fontFamily="monospace" style={{ fill: "var(--color-accent)" }}>
                  text 0.98
                </text>
              ) : null}
            </svg>
            {stage === 1 ? (
              <div key={run} className="scan-run pointer-events-none absolute right-0 left-0 h-[2px] bg-accent" aria-hidden="true" />
            ) : null}
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-4 text-sm">
            <span className="text-dim">{lang === "en" ? "Input: a manga panel" : "Input: panel manga"}</span>
            <button type="button" className="btn btn-line" onClick={runScan}>
              {stage === 0 ? (lang === "en" ? "Scan" : "Pindai") : lang === "en" ? "Scan again" : "Pindai lagi"}
            </button>
          </figcaption>
        </figure>

        <dl className="flex flex-col gap-5 border-t border-line pt-5 md:border-t-0 md:pt-0">
          <div>
            <dt className="label">OCR</dt>
            <dd className={`mono mt-1 text-base transition-opacity duration-500 ${stage >= 2 ? "opacity-100" : "opacity-30"}`}>
              {stage >= 2 ? JP_TEXT : "…"}
            </dd>
          </div>
          <div>
            <dt className="label">{lang === "en" ? "Translation" : "Terjemahan"}</dt>
            <dd className={`mono mt-1 text-base transition-opacity duration-500 ${stage >= 3 ? "opacity-100" : "opacity-30"}`}>
              {stage >= 3 ? EN_TEXT : "…"}
            </dd>
          </div>
          <div>
            <dt className="label">{lang === "en" ? "Speech" : "Suara"}</dt>
            <dd className="mt-2">
              <button type="button" className="btn btn-solid" disabled={stage < 3 || !canSpeak} onClick={speak}>
                {lang === "en" ? "Speak it" : "Ucapkan"}
              </button>
              {!canSpeak ? (
                <span className="ml-3 text-xs text-dim">{lang === "en" ? "(no speech support here)" : "(speech tak didukung di sini)"}</span>
              ) : null}
            </dd>
          </div>
          <p className="text-xs text-dim">
            {lang === "en"
              ? "The real tool runs OCR and translation in Python. Here only the speech is computed."
              : "Alat aslinya menjalankan OCR dan terjemahan di Python. Di sini hanya suaranya yang dihitung."}
          </p>
        </dl>
      </div>
    </Section>
  );
}
