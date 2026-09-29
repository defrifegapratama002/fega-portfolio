"use client";

import Section from "@/components/ui/Section";
import { topics } from "@/data/exploring";
import { useLang } from "@/lib/i18n";

/** Specification §23 — "Things I'm Exploring": questions, not claims. */
export default function Exploring() {
  const { t } = useLang();

  return (
    <Section
      id="exploring"
      num="14"
      label={{ en: "Thinking & experiments", id: "Pemikiran & eksperimen" }}
      title={{
        en: "Things I'm exploring.",
        id: "Hal yang sedang saya jelajahi.",
      }}
      lede={{
        en: "Not finished work — the questions I am working on next.",
        id: "Bukan karya yang sudah selesai — pertanyaan yang sedang saya kerjakan berikutnya.",
      }}
    >
      <ol className="mt-12 border-t border-line">
        {topics.map((topic, i) => (
          <li
            key={topic.name.en}
            className="grid gap-x-8 gap-y-1 border-b border-line py-6 md:grid-cols-[3rem_1fr_1.4fr] md:items-baseline"
            data-reveal
          >
            <span className={`font-mono text-xs ${i % 2 ? "text-accent2" : "text-accent"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="h-display text-xl md:text-2xl">{t(topic.name)}</h3>
            <p className="prose-mut text-sm md:text-base">{t(topic.question)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
