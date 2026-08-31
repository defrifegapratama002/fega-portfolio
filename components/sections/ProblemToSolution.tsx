"use client";

import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { useLang } from "@/lib/i18n";

/** Blueprint §22 — From Problems to Solutions. */
export default function ProblemToSolution() {
  const { lang } = useLang();

  return (
    <Section
      id="shift"
      num="10"
      label={{ en: "From problem to solution", id: "Dari masalah ke solusi" }}
      title={{
        en: "This is how I use technology.",
        id: "Beginilah cara saya menggunakan teknologi.",
      }}
      lede={{
        en: "Not to make something look sophisticated — to make something work better.",
        id: "Bukan untuk membuat sesuatu terlihat canggih — tapi untuk membuat sesuatu bekerja lebih baik.",
      }}
    >
      <div className="mt-12" data-reveal>
        <Pipeline
          steps={
            lang === "en"
              ? ["MANUAL PROCESS", "DATA SCATTERED", "SLOW WORKFLOW", "SYSTEM DESIGN", "AUTOMATION", "BETTER WORKFLOW"]
              : ["PROSES MANUAL", "DATA BERSERAKAN", "ALUR LAMBAT", "DESAIN SISTEM", "OTOMASI", "ALUR LEBIH BAIK"]
          }
        />
      </div>
    </Section>
  );
}
