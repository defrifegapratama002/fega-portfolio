"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { technologies } from "@/data/technologies";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP);

/**
 * Blueprint §11 — Computer Vision, demonstrated through the Manga OCR
 * project concept: image → vision → analysis → understanding → result.
 * The scan is a staged visualization (honestly labeled); the speech at
 * the end is real (Web Speech API).
 */

const JP_TEXT = "こんにちは、世界！";
const EN_TEXT = "Hello, world!";

export default function VisionSection() {
  const { lang } = useLang();
  const tech = technologies.find((x) => x.key === "vision")!;
  const root = useRef<HTMLDivElement>(null);
  const scanLine = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0); // 0 idle · 1 scanning · 2 extracted · 3 translated
  // Determined after mount so server and client render identically.
  const [canSpeak, setCanSpeak] = useState(false);
  useEffect(() => {
    setCanSpeak("speechSynthesis" in window);
  }, []);
  const contextSafeRef = useRef<((fn: () => void) => () => void) | null>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      contextSafeRef.current = contextSafe ?? null;
    },
    { scope: root },
  );

  const runScan = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !scanLine.current) {
      setStage(3);
      return;
    }
    setStage(1);
    const safe = contextSafeRef.current;
    const animate = () => {
      gsap.fromTo(
        scanLine.current,
        { top: "0%", opacity: 1 },
        {
          top: "100%",
          duration: 1.4,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(scanLine.current, { opacity: 0, duration: 0.3 });
            setStage(2);
            window.setTimeout(() => setStage(3), 700);
          },
        },
      );
    };
    (safe ? safe(animate) : animate)();
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
      num="05"
      label={{ en: "Demonstration — Computer Vision", id: "Demonstrasi — Computer Vision" }}
      title={{
        en: "Teaching computers to understand what they see.",
        id: "Mengajari komputer memahami apa yang mereka lihat.",
      }}
      lede={{
        en: "From the Manga OCR project: text locked inside an image becomes readable, translatable, and audible. Run the pipeline yourself.",
        id: "Dari project Manga OCR: teks yang terkunci di dalam gambar menjadi terbaca, terterjemahkan, dan terdengar. Jalankan sendiri pipeline-nya.",
      }}
    >
      <div className="mt-10 flex flex-wrap gap-2" data-reveal>
        {tech.areas.map((a) => (
          <span key={a} className="chip">
            {a}
          </span>
        ))}
      </div>

      <div ref={root} className="mt-14 grid items-start gap-8 md:grid-cols-2" data-reveal>
        {/* The "image" being scanned */}
        <figure className="card relative overflow-hidden p-5">
          <div className="relative overflow-hidden rounded-lg border border-line bg-panel2">
            <svg viewBox="0 0 320 240" className="block w-full" role="img" aria-label="Manga panel with Japanese speech bubble">
              <rect x="8" y="8" width="304" height="224" rx="6" style={{ fill: "var(--color-bg)", stroke: "var(--color-line)" }} />
              {/* character silhouette */}
              <circle cx="95" cy="150" r="28" style={{ fill: "var(--color-panel2)", stroke: "var(--color-line)" }} />
              <rect x="65" y="180" width="60" height="52" rx="14" style={{ fill: "var(--color-panel2)", stroke: "var(--color-line)" }} />
              {/* speed lines */}
              <g strokeWidth="1" style={{ stroke: "var(--color-line)" }}>
                <line x1="240" y1="24" x2="300" y2="18" />
                <line x1="248" y1="44" x2="304" y2="42" />
                <line x1="244" y1="64" x2="300" y2="68" />
              </g>
              {/* speech bubble */}
              <ellipse cx="205" cy="105" rx="88" ry="46" style={{ fill: "var(--color-panel2)", stroke: "var(--color-line)" }} />
              <path d="M150 138 L128 165 L166 144 Z" style={{ fill: "var(--color-panel2)", stroke: "var(--color-line)" }} />
              <text x="205" y="112" textAnchor="middle" fontSize="19" fontFamily="serif" style={{ fill: "var(--color-fg)" }}>
                {JP_TEXT}
              </text>
              {/* bounding box after detection */}
              {stage >= 2 ? (
                <rect
                  x="120"
                  y="86"
                  width="170"
                  height="36"
                  fill="none"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  style={{ stroke: "var(--color-accent)" }}
                />
              ) : null}
              {stage >= 2 ? (
                <text x="122" y="80" fontSize="9" fontFamily="monospace" style={{ fill: "var(--color-accent2)" }}>
                  text 0.98
                </text>
              ) : null}
            </svg>
            {/* scan line */}
            <div
              ref={scanLine}
              className="pointer-events-none absolute right-0 left-0 h-[2px] bg-accent opacity-0"
              style={{
                top: "0%",
                boxShadow: "0 0 16px 2px color-mix(in srgb, var(--color-accent) 70%, transparent)",
              }}
              aria-hidden="true"
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4">
            <span className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
              {lang === "en" ? "input: manga panel" : "input: panel manga"}
            </span>
            <button type="button" className="btn btn-line !px-4 !py-2 text-[0.7rem]" onClick={runScan}>
              {stage === 0
                ? lang === "en" ? "RUN SCAN ▶" : "JALANKAN SCAN ▶"
                : lang === "en" ? "SCAN AGAIN ↺" : "SCAN ULANG ↺"}
            </button>
          </figcaption>
        </figure>

        {/* Pipeline output */}
        <div className="card p-7">
          <div className="pipe" aria-hidden="true">
            {["IMAGE", "VISION", "ANALYSIS", "UNDERSTANDING", "RESULT"].map((s, i) => (
              <span key={s} className="contents">
                <span
                  className={`pipe-step ${
                    (stage >= 1 && i === 0) || (stage >= 2 && i <= 2) || (stage >= 3 && i <= 4) ? "is-on" : ""
                  }`}
                >
                  {s}
                </span>
                {i < 4 ? <span className="pipe-arrow">→</span> : null}
              </span>
            ))}
          </div>

          <dl className="mt-7 flex flex-col gap-5 font-mono text-sm">
            <div>
              <dt className="text-[0.65rem] tracking-widest text-dim uppercase">
                OCR — {lang === "en" ? "extracted text" : "teks hasil ekstraksi"}
              </dt>
              <dd className={`mt-1 transition-opacity duration-500 ${stage >= 2 ? "opacity-100" : "opacity-25"}`}>
                {stage >= 2 ? JP_TEXT : "…"}
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-widest text-dim uppercase">
                {lang === "en" ? "translation" : "terjemahan"}
              </dt>
              <dd className={`mt-1 transition-opacity duration-500 ${stage >= 3 ? "opacity-100" : "opacity-25"}`}>
                {stage >= 3 ? EN_TEXT : "…"}
              </dd>
            </div>
            <div>
              <dt className="text-[0.65rem] tracking-widest text-dim uppercase">text-to-speech</dt>
              <dd className="mt-2">
                <button
                  type="button"
                  className="btn btn-solid !px-4 !py-2 text-[0.7rem] disabled:cursor-not-allowed disabled:opacity-30"
                  disabled={stage < 3 || !canSpeak}
                  onClick={speak}
                >
                  {lang === "en" ? "SPEAK IT 🔊" : "UCAPKAN 🔊"}
                </button>
                {!canSpeak ? (
                  <span className="ml-3 text-[0.65rem] text-dim">
                    {lang === "en" ? "(speech not supported here)" : "(speech tak didukung di sini)"}
                  </span>
                ) : null}
              </dd>
            </div>
          </dl>

          <p className="mt-7 font-mono text-[0.65rem] leading-relaxed tracking-wide text-dim">
            {lang === "en"
              ? "HONEST LABEL — the scan is a staged visualization of the real pipeline; the speech is real (your browser's Web Speech API). The actual project runs OCR + translation in Python."
              : "LABEL JUJUR — animasi scan adalah visualisasi dari pipeline aslinya; suaranya sungguhan (Web Speech API browser Anda). Project aslinya menjalankan OCR + terjemahan di Python."}
          </p>
        </div>
      </div>

      <div className="mt-12" data-reveal>
        <Pipeline steps={["MANGA IMAGE", "OCR", "TEXT", "TRANSLATION", "TEXT-TO-SPEECH", "VOICE"]} />
      </div>

      <p className="mt-8 font-mono text-xs tracking-wide text-dim" data-reveal>
        {lang === "en" ? "Proven by:" : "Dibuktikan oleh:"}{" "}
        <span className="text-mut">{tech.projects.join(" · ")}</span>
      </p>
    </Section>
  );
}
