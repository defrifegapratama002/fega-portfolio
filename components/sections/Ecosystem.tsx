"use client";

import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Section from "@/components/ui/Section";
import { technologies } from "@/data/technologies";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP);

/**
 * Blueprint §9 — the technology ecosystem: one PROBLEM in the middle,
 * technologies around it. An interactive map, not a grid of cards.
 */
export default function Ecosystem() {
  const { lang, t } = useLang();
  const [selectedKey, setSelectedKey] = useState(technologies[0].key);
  const root = useRef<HTMLDivElement>(null);

  const positions = useMemo(() => {
    const n = technologies.length;
    return technologies.map((tech, i) => {
      const angle = (-90 + (i * 360) / n) * (Math.PI / 180);
      return {
        key: tech.key,
        x: 50 + 42 * Math.cos(angle),
        y: 50 + 42 * Math.sin(angle),
      };
    });
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".eco-node", root.current).forEach((el, i) => {
          gsap.to(el, {
            y: "+=7",
            duration: 2.6 + (i % 3) * 0.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: i * 0.2,
          });
        });
      });
    },
    { scope: root },
  );

  const selected = technologies.find((tech) => tech.key === selectedKey) ?? technologies[0];

  return (
    <Section
      id="ecosystem"
      num="02"
      label={{ en: "Technology ecosystem", id: "Ekosistem teknologi" }}
      title={{
        en: "One problem. Many possible technologies.",
        id: "Satu masalah. Banyak kemungkinan teknologi.",
      }}
      lede={{
        en: "The right solution often comes from combining different areas of technology. Select a node to explore it — every area links to a live demonstration below.",
        id: "Solusi yang tepat sering lahir dari kombinasi berbagai area teknologi. Pilih sebuah node untuk menjelajahinya — setiap area terhubung ke demonstrasi langsung di bawah.",
      }}
    >
      <div ref={root} className="mt-14 grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
        {/* Radial map — desktop */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[560px] md:block" data-reveal>
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {positions.map((p) => (
              <line
                key={p.key}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke={p.key === selectedKey ? "#2fe0b8" : "#232329"}
                strokeWidth={p.key === selectedKey ? 0.35 : 0.2}
                style={{ transition: "stroke 0.3s ease" }}
              />
            ))}
          </svg>

          <div
            className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-accent-dim bg-panel px-6 py-4 text-center shadow-[0_0_40px_-10px_rgba(47,224,184,0.4)]"
            aria-hidden="true"
          >
            <span className="h-display block text-lg tracking-wide">
              {lang === "en" ? "PROBLEM" : "MASALAH"}
            </span>
            <span className="font-mono text-[0.6rem] tracking-widest text-dim uppercase">
              {lang === "en" ? "always the center" : "selalu pusatnya"}
            </span>
          </div>

          {technologies.map((tech, i) => (
            <button
              key={tech.key}
              type="button"
              className="eco-node"
              style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
              aria-pressed={tech.key === selectedKey}
              onClick={() => setSelectedKey(tech.key)}
            >
              <span className="font-mono text-[0.6rem] tracking-widest text-accent">{tech.short}</span>
              <span className="text-xs font-medium whitespace-nowrap text-fg">{tech.name}</span>
            </button>
          ))}
        </div>

        {/* Node list — mobile */}
        <div className="flex flex-wrap gap-2 md:hidden" data-reveal>
          {technologies.map((tech) => (
            <button
              key={tech.key}
              type="button"
              className={`chip transition-colors ${
                tech.key === selectedKey ? "!border-accent !text-fg" : ""
              }`}
              aria-pressed={tech.key === selectedKey}
              onClick={() => setSelectedKey(tech.key)}
            >
              {tech.name}
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="card p-7 md:p-8" data-reveal aria-live="polite">
          <p className="kicker">{selected.short}</p>
          <h3 className="h-display mt-2 text-2xl">{selected.name}</h3>
          <p className="prose-mut mt-4 text-sm">{t(selected.description)}</p>

          <p className="mt-6 font-mono text-[0.65rem] tracking-widest text-dim uppercase">
            {lang === "en" ? "When I reach for it" : "Kapan saya memakainya"}
          </p>
          <p className="prose-mut mt-2 text-sm">{t(selected.purpose)}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {selected.areas.map((area) => (
              <span key={area} className="chip">
                {area}
              </span>
            ))}
          </div>

          <p className="mt-6 font-mono text-[0.65rem] tracking-widest text-dim uppercase">
            {lang === "en" ? "Proven by" : "Dibuktikan oleh"}
          </p>
          <p className="mt-2 text-sm text-mut">{selected.projects.join(" · ")}</p>

          <a
            href={`#${selected.sectionId}`}
            className="mt-7 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase hover:underline"
          >
            {lang === "en" ? "See it demonstrated" : "Lihat demonstrasinya"} ↓
          </a>
        </div>
      </div>
    </Section>
  );
}
