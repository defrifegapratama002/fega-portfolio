"use client";

import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { useLang } from "@/lib/i18n";

/** Blueprint §8 — Technology is a tool. */
export default function TechnologyTool() {
  const { lang } = useLang();

  return (
    <Section
      id="tool"
      num="01"
      label={{ en: "The starting point", id: "Titik awal" }}
      title={{
        en: "Technology is a tool. Understanding the problem is the first step.",
        id: "Teknologi adalah alat. Memahami masalah adalah langkah pertama.",
      }}
      lede={{
        en: "I don't start by asking which technology to use. I start by understanding what needs to be solved.",
        id: "Saya tidak mulai dengan bertanya teknologi apa yang dipakai. Saya mulai dengan memahami apa yang perlu diselesaikan.",
      }}
    >
      <div className="mt-14" data-reveal>
        <Pipeline
          steps={
            lang === "en"
              ? ["PROBLEM", "UNDERSTAND", "ANALYZE", "DESIGN", "BUILD", "TEST", "IMPROVE"]
              : ["MASALAH", "PAHAMI", "ANALISIS", "RANCANG", "BANGUN", "UJI", "PERBAIKI"]
          }
        />
      </div>
      <p className="mt-10 max-w-2xl font-mono text-xs leading-relaxed tracking-wide text-dim" data-reveal>
        {lang === "en"
          ? "Every system on this page went through this pipeline — and this page itself is going through it right now, in front of you."
          : "Setiap sistem di halaman ini melewati pipeline ini — dan halaman ini sendiri sedang melewatinya sekarang, di depan Anda."}
      </p>
    </Section>
  );
}
