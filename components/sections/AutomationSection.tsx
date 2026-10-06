"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import { useLang } from "@/lib/i18n";

/** Automation chapter demo: the same workflow, by hand and as a system. */
export default function AutomationSection() {
  const { lang } = useLang();
  const [automated, setAutomated] = useState(false);

  const before = lang === "en" ? ["Person", "Spreadsheet", "Manual work", "Result"] : ["Orang", "Spreadsheet", "Kerja manual", "Hasil"];
  const after = lang === "en" ? ["Input", "Validation", "Database", "Report"] : ["Input", "Validasi", "Database", "Laporan"];
  const steps = automated ? after : before;

  return (
    <Section
      id="tech-automation"
      label={{ en: "Automation · try it", id: "Otomasi · coba" }}
      title={{
        en: "The same workflow, by hand and as a system.",
        id: "Alur kerja yang sama, dikerjakan manual dan sebagai sistem.",
      }}
    >
      <div className="mt-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className={!automated ? "text-fg" : "text-dim"}>{lang === "en" ? "By hand" : "Manual"}</span>
          <button
            type="button"
            role="switch"
            aria-checked={automated}
            aria-label={lang === "en" ? "Toggle automation" : "Aktifkan otomasi"}
            onClick={() => setAutomated((v) => !v)}
            className={`relative h-7 w-12 border transition-colors duration-300 ${automated ? "border-accent bg-accent-dim" : "border-line bg-panel2"}`}
            style={{ borderRadius: "999px" }}
          >
            <span
              className={`absolute top-[3px] left-[3px] h-5 w-5 transition-all duration-300 ${automated ? "translate-x-5 bg-accent" : "translate-x-0 bg-dim"}`}
              style={{ borderRadius: "999px" }}
              aria-hidden="true"
            />
          </button>
          <span className={automated ? "text-accent" : "text-dim"}>{lang === "en" ? "As a system" : "Sebagai sistem"}</span>
        </div>

        <ol className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2" aria-live="polite">
          {steps.map((s, i) => (
            <li key={s + String(automated)} className="flex items-center gap-3">
              <span className={`chip ${automated ? "border-accent text-fg" : "border-dashed"}`}>{s}</span>
              {i < steps.length - 1 ? <span className="text-dim" aria-hidden="true">→</span> : null}
            </li>
          ))}
        </ol>

        <p className="prose-mut mt-6 text-sm md:text-base">
          {automated
            ? lang === "en"
              ? "Data enters once, at the source. The system validates, records, audits and reports. The same event cannot be typed twice, and nothing depends on someone remembering."
              : "Data masuk sekali, di sumbernya. Sistem memvalidasi, mencatat, mengaudit, dan melaporkan. Kejadian yang sama tidak bisa diketik dua kali, dan tidak ada yang bergantung pada ingatan seseorang."
            : lang === "en"
              ? "A person carries data between spreadsheets by hand. Every copy is a chance for an error, every report is hours of work, and every absence is a bottleneck."
              : "Seseorang memindahkan data antar-spreadsheet secara manual. Setiap salinan adalah peluang kesalahan, setiap laporan berarti berjam-jam kerja, dan setiap ketidakhadiran jadi hambatan."}
        </p>

        <p className="mt-5 text-sm text-mut">
          {lang === "en" ? "This is what " : "Inilah yang dilakukan "}
          <a href="#project-itsfr" className="link">
            ITSFR Platform
          </a>
          {lang === "en"
            ? " did for an export company: inventory computed from audited movements instead of typed, and prices that cannot leak because they are never stored."
            : " untuk sebuah perusahaan ekspor: inventori dihitung dari pergerakan teraudit alih-alih diketik, dan harga yang tidak bisa bocor karena tidak pernah disimpan."}
        </p>
      </div>
    </Section>
  );
}
