"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang, type L10n } from "@/lib/i18n";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Blueprint §21 — How I Think. One object travels through six stages
 * as the user scrolls (pinned, scrubbed). On small screens or with
 * reduced motion it degrades to a plain readable list.
 */

const STAGES: { num: string; name: L10n; q: L10n }[] = [
  {
    num: "01",
    name: { en: "Understand", id: "Pahami" },
    q: { en: "What is the problem, really?", id: "Apa sebenarnya masalahnya?" },
  },
  {
    num: "02",
    name: { en: "Analyze", id: "Analisis" },
    q: { en: "What are the causes and constraints?", id: "Apa penyebab dan batasannya?" },
  },
  {
    num: "03",
    name: { en: "Design", id: "Rancang" },
    q: { en: "What is the most sensible solution?", id: "Apa solusi yang paling masuk akal?" },
  },
  {
    num: "04",
    name: { en: "Build", id: "Bangun" },
    q: { en: "Implement the solution.", id: "Implementasikan solusinya." },
  },
  {
    num: "05",
    name: { en: "Test", id: "Uji" },
    q: { en: "Hunt for failures and edge cases.", id: "Buru kegagalan dan edge case." },
  },
  {
    num: "06",
    name: { en: "Improve", id: "Perbaiki" },
    q: { en: "Iterate. Then iterate again.", id: "Iterasi. Lalu iterasi lagi." },
  },
];

/** One object, six states — the same hexagonal "solution" maturing. */
function StageGlyph({ stage }: { stage: number }) {
  const hex = "M100,30 L160,65 L160,135 L100,170 L40,135 L40,65 Z";
  const g = (i: number) =>
    `transition-opacity duration-500 ${stage === i ? "opacity-100" : "opacity-0"}`;

  return (
    <svg viewBox="0 0 200 200" className="h-full max-h-[340px] w-full" aria-hidden="true">
      {/* 0 — Understand: a faint outline and a question */}
      <g className={g(0)}>
        <path d={hex} fill="none" stroke="#3a3a42" strokeWidth="1.5" strokeDasharray="3 6" />
        <text x="100" y="112" textAnchor="middle" fontSize="44" fill="#2fe0b8" fontFamily="monospace">?</text>
      </g>
      {/* 1 — Analyze: scan lines through the shape */}
      <g className={g(1)}>
        <path d={hex} fill="none" stroke="#3a3a42" strokeWidth="1.5" />
        {[55, 75, 95, 115, 135, 155].map((y) => (
          <line key={y} x1="30" x2="170" y1={y} y2={y} stroke="#2fe0b8" strokeWidth="0.7" opacity="0.5" />
        ))}
        <circle cx="100" cy="100" r="12" fill="none" stroke="#2fe0b8" strokeWidth="1.5" />
      </g>
      {/* 2 — Design: blueprint with dimension marks */}
      <g className={g(2)}>
        <path d={hex} fill="none" stroke="#2fe0b8" strokeWidth="1.2" strokeDasharray="6 4" />
        <line x1="100" y1="30" x2="100" y2="170" stroke="#3a3a42" strokeWidth="0.7" />
        <line x1="40" y1="100" x2="160" y2="100" stroke="#3a3a42" strokeWidth="0.7" />
        <text x="168" y="104" fontSize="9" fill="#6b6b75" fontFamily="monospace">r</text>
      </g>
      {/* 3 — Build: the shape becomes solid */}
      <g className={g(3)}>
        <path d={hex} fill="#17705d" stroke="#2fe0b8" strokeWidth="1.5" />
        <path d="M100,30 L160,65 L100,100 L40,65 Z" fill="#2fe0b8" opacity="0.25" />
      </g>
      {/* 4 — Test: checks and one caught failure */}
      <g className={g(4)}>
        <path d={hex} fill="#101014" stroke="#2fe0b8" strokeWidth="1.5" />
        <text x="70" y="85" fontSize="16" fill="#2fe0b8" fontFamily="monospace">✓</text>
        <text x="120" y="105" fontSize="16" fill="#2fe0b8" fontFamily="monospace">✓</text>
        <text x="85" y="140" fontSize="16" fill="#c05252" fontFamily="monospace">✕</text>
      </g>
      {/* 5 — Improve: solid shape with an orbit */}
      <g className={g(5)}>
        <path d={hex} fill="#17705d" stroke="#2fe0b8" strokeWidth="1.5" />
        <ellipse cx="100" cy="100" rx="82" ry="30" fill="none" stroke="#2fe0b8" strokeWidth="0.8" strokeDasharray="4 5" />
        <circle cx="182" cy="100" r="4" fill="#2fe0b8" />
      </g>
    </svg>
  );
}

export default function HowIThink() {
  const { lang, t } = useLang();
  const root = useRef<HTMLElement>(null);
  const [stage, setStage] = useState(0);
  const [pinned, setPinned] = useState(false);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        setPinned(true);
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const idx = Math.min(STAGES.length - 1, Math.floor(self.progress * STAGES.length));
            setStage((s) => (s === idx ? s : idx));
          },
        });
        return () => setPinned(false);
      });
    },
    { scope: root },
  );

  return (
    <section id="think" ref={root} className={pinned ? "relative md:h-[300vh]" : ""}>
      <div className={pinned ? "md:sticky md:top-0 md:flex md:h-svh md:items-center" : ""}>
        <div className="mx-auto w-full max-w-6xl px-6 py-28 md:py-0">
          <p className="kicker" data-reveal>
            09 · {lang === "en" ? "How I think" : "Cara saya berpikir"}
          </p>
          <h2 className="h-display mt-4 max-w-3xl text-3xl md:text-5xl" data-reveal>
            {lang === "en"
              ? "Good technology starts with good questions."
              : "Teknologi yang baik dimulai dari pertanyaan yang baik."}
          </h2>

          <div className="mt-12 grid items-center gap-10 md:grid-cols-2">
            <ol className="flex flex-col gap-4">
              {STAGES.map((s, i) => {
                const active = !pinned || stage === i;
                return (
                  <li
                    key={s.num}
                    className={`flex items-baseline gap-4 border-l-2 pl-5 transition-all duration-300 ${
                      active ? "border-accent opacity-100" : "border-line opacity-40"
                    }`}
                    aria-current={pinned && stage === i ? "step" : undefined}
                  >
                    <span className="font-mono text-xs text-accent">{s.num}</span>
                    <div>
                      <p className="h-display text-lg text-fg md:text-xl">{t(s.name)}</p>
                      <p className="mt-0.5 text-sm text-mut">{t(s.q)}</p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="hidden justify-center md:flex" aria-hidden="true">
              <div className="relative aspect-square w-full max-w-[340px]">
                <div className="absolute inset-0">
                  <StageGlyph stage={pinned ? stage : 5} />
                </div>
              </div>
            </div>
          </div>

          {pinned ? (
            <p className="mt-10 hidden font-mono text-[0.65rem] tracking-[0.25em] text-dim uppercase md:block">
              {lang === "en" ? "Keep scrolling — the object matures" : "Terus gulir — objeknya berkembang"} ·{" "}
              {stage + 1}/6
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
