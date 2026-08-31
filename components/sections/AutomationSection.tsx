"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import { useLang } from "@/lib/i18n";

/**
 * Blueprint §19 — Automation & Systems: "Turn repetitive work into
 * systems." An interactive before/after switch — flip the workflow.
 */
export default function AutomationSection() {
  const { lang } = useLang();
  const [automated, setAutomated] = useState(false);

  const before =
    lang === "en"
      ? ["PERSON", "SPREADSHEET", "MANUAL WORK", "RESULT"]
      : ["ORANG", "SPREADSHEET", "KERJA MANUAL", "HASIL"];
  const after =
    lang === "en"
      ? ["INPUT", "AUTOMATION", "DATABASE", "SYSTEM", "RESULT"]
      : ["INPUT", "OTOMASI", "DATABASE", "SISTEM", "HASIL"];

  const steps = automated ? after : before;

  return (
    <Section
      id="tech-automation"
      num="08"
      label={{ en: "Demonstration — Automation & Systems", id: "Demonstrasi — Otomasi & Sistem" }}
      title={{
        en: "Turn repetitive work into systems.",
        id: "Ubah pekerjaan berulang menjadi sistem.",
      }}
      lede={{
        en: "Not just programming — process improvement. Flip the switch and watch the workflow change shape.",
        id: "Bukan sekadar pemrograman — perbaikan proses. Geser sakelarnya dan lihat alur kerjanya berubah bentuk.",
      }}
    >
      <div className="card mt-12 p-7 md:p-9" data-reveal>
        <div className="flex flex-wrap items-center gap-4">
          <span
            className={`font-mono text-xs tracking-widest ${!automated ? "text-fg" : "text-dim"}`}
          >
            {lang === "en" ? "MANUAL" : "MANUAL"}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={automated}
            aria-label={lang === "en" ? "Toggle automation" : "Aktifkan otomasi"}
            onClick={() => setAutomated((v) => !v)}
            className={`relative h-8 w-16 rounded-full border transition-colors duration-300 ${
              automated ? "border-accent bg-accent-dim" : "border-line bg-panel2"
            }`}
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full transition-all duration-300 ${
                automated ? "translate-x-8 bg-accent" : "translate-x-0 bg-dim"
              }`}
              aria-hidden="true"
            />
          </button>
          <span
            className={`font-mono text-xs tracking-widest ${automated ? "text-accent" : "text-dim"}`}
          >
            {lang === "en" ? "AUTOMATED" : "OTOMATIS"}
          </span>
        </div>

        <div className="pipe mt-8" aria-live="polite">
          {steps.map((s, i) => (
            <span key={s + automated} className="contents">
              <span
                className={`pipe-step ${automated ? "is-on" : ""}`}
                style={!automated ? { borderStyle: "dashed", color: "#a3a3ae" } : undefined}
              >
                {s}
              </span>
              {i < steps.length - 1 ? <span className="pipe-arrow">→</span> : null}
            </span>
          ))}
        </div>

        <p className="prose-mut mt-8 text-sm">
          {automated
            ? lang === "en"
              ? "Data enters once, at the source. The system validates, records, audits and reports — the same event can never be typed twice, and nothing depends on someone remembering."
              : "Data masuk sekali, di sumbernya. Sistem memvalidasi, mencatat, mengaudit, dan melaporkan — kejadian yang sama tak mungkin diketik dua kali, dan tak ada yang bergantung pada ingatan seseorang."
            : lang === "en"
              ? "A person carries data between spreadsheets by hand. Every copy is a chance for an error; every report is hours of work; every absence is a bottleneck."
              : "Seseorang memindahkan data antar-spreadsheet secara manual. Setiap salinan adalah peluang kesalahan; setiap laporan berarti berjam-jam kerja; setiap ketidakhadiran menjadi hambatan."}
        </p>

        <p className="mt-6 font-mono text-[0.65rem] leading-relaxed tracking-wide text-dim">
          {lang === "en"
            ? "REAL EXAMPLE — ITSFR Platform replaced scattered spreadsheets with an ERP used in daily operations: inventory computed from audited movements, never typed; prices that physically cannot leak because they are never stored."
            : "CONTOH NYATA — ITSFR Platform menggantikan spreadsheet berserakan dengan ERP yang dipakai operasional setiap hari: inventori dihitung dari pergerakan teraudit, tak pernah diketik; harga yang secara fisik tak bisa bocor karena tak pernah disimpan."}
        </p>
      </div>

      <p className="mt-8 font-mono text-xs tracking-wide text-dim" data-reveal>
        {lang === "en" ? "Proven by:" : "Dibuktikan oleh:"}{" "}
        <span className="text-mut">ITSFR Platform · SupplierDaging</span>
      </p>
    </Section>
  );
}
