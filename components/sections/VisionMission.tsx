"use client";

import Section from "@/components/ui/Section";
import { vision, visionNote, missions } from "@/data/vision";
import { useLang } from "@/lib/i18n";

/**
 * Vision & mission — what the work is for. Sits after About ("who")
 * and before Consult ("how can I help you"). Content in data/vision.ts.
 */
export default function VisionMission() {
  const { lang, t } = useLang();

  return (
    <Section
      id="vision-mission"
      num="14"
      label={{ en: "Vision & mission", id: "Visi & misi" }}
      title={{
        en: "What the technology is for.",
        id: "Untuk apa teknologinya.",
      }}
    >
      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Vision */}
        <div className="card relative overflow-hidden p-8 md:p-10" data-reveal>
          <p className="font-mono text-[0.65rem] tracking-widest text-accent2 uppercase">
            {lang === "en" ? "Vision" : "Visi"}
          </p>
          <blockquote className="h-display mt-5 text-2xl leading-snug md:text-4xl">{t(vision)}</blockquote>
          <p className="prose-mut mt-6 text-sm md:text-base">{t(visionNote)}</p>
          <span
            className="pointer-events-none absolute -right-4 -bottom-6 font-mono text-[7rem] leading-none text-accent-dim select-none"
            aria-hidden="true"
          >
            ∞
          </span>
        </div>

        {/* Mission */}
        <div>
          <p className="font-mono text-[0.65rem] tracking-widest text-accent2 uppercase" data-reveal>
            {lang === "en" ? "Mission" : "Misi"}
          </p>
          <ol className="mt-5 flex flex-col gap-3">
            {missions.map((m) => (
              <li
                key={m.num}
                className="card flex gap-5 p-5 transition-colors hover:border-accent md:p-6"
                data-reveal
              >
                <span className="font-mono text-xs text-accent">{m.num}</span>
                <div>
                  <h3 className="h-display text-lg md:text-xl">{t(m.title)}</h3>
                  <p className="prose-mut mt-1.5 text-sm">{t(m.desc)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
