"use client";

import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { useLang } from "@/lib/i18n";

/** Blueprint §30 — About. Short, on purpose. */
export default function About() {
  const { lang } = useLang();

  return (
    <Section
      id="about"
      num="13"
      label={{ en: "About", id: "Tentang" }}
      title={{
        en: "Who is behind the technology?",
        id: "Siapa di balik teknologinya?",
      }}
    >
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="prose-mut text-base md:text-lg" data-reveal>
            {lang === "en"
              ? "I'm Defri Fega Pratama, a Minangkabau software engineer — focused on solving real problems with precise, creative, and modern solutions through AI, data, software, and automation. Systems I build run companies' daily operations, teach people to speak English, and sell products in three market languages."
              : "Saya Defri Fega Pratama, software engineer berdarah Minangkabau — fokus menyelesaikan masalah nyata dengan solusi yang tepat, kreatif, dan modern lewat AI, data, software, dan otomasi. Sistem yang saya bangun menjalankan operasi harian perusahaan, mengajari orang berbicara bahasa Inggris, dan menjual produk dalam tiga bahasa pasar."}
          </p>
          <div className="mt-10" data-reveal>
            <Pipeline
              steps={
                lang === "en"
                  ? ["LEARN", "BUILD", "EXPERIMENT", "SOLVE", "IMPROVE"]
                  : ["BELAJAR", "BANGUN", "EKSPERIMEN", "SELESAIKAN", "PERBAIKI"]
              }
            />
          </div>
        </div>

        <div className="h-display text-right text-5xl leading-tight md:text-6xl" aria-hidden="true" data-reveal>
          BUILD.
          <br />
          SOLVE.
          <br />
          <span className="accent-split">EVOLVE.</span>
        </div>
      </div>

      <p className="mt-12 font-mono text-xs tracking-[0.2em] text-dim uppercase" data-reveal>
        Minangkabau · Indonesia · UTC+7 · {lang === "en" ? "working with anywhere" : "bekerja dengan mana saja"}
      </p>
    </Section>
  );
}
