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
              ? "I'm Defri Fega Pratama, a technology enthusiast and problem solver from Batam, Indonesia — focused on building practical solutions through AI, data, software, automation, and modern digital technologies. Systems I build run a factory's daily operations, teach people to speak English, and sell products in three market languages."
              : "Saya Defri Fega Pratama, penggemar teknologi dan pemecah masalah dari Batam, Indonesia — fokus membangun solusi praktis lewat AI, data, software, otomasi, dan teknologi digital modern. Sistem yang saya bangun menjalankan operasi harian sebuah pabrik, mengajari orang berbicara bahasa Inggris, dan menjual produk dalam tiga bahasa pasar."}
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
          <span className="text-accent">EVOLVE.</span>
        </div>
      </div>

      <p className="mt-12 font-mono text-xs tracking-[0.2em] text-dim uppercase" data-reveal>
        Batam, Indonesia · 1.13°N 104.05°E · UTC+7 · {lang === "en" ? "working with anywhere" : "bekerja dengan mana saja"}
      </p>
    </Section>
  );
}
