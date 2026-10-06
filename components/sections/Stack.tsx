"use client";

import Section from "@/components/ui/Section";
import { stack } from "@/data/stack";
import { useLang } from "@/lib/i18n";

/** Tools, grouped by what they are used for. No ratings, no percentages. */
export default function Stack() {
  const { lang } = useLang();

  return (
    <Section
      id="stack"
      label={{ en: "Tools", id: "Alat" }}
      title={{
        en: "What I use. Everything here has shipped in a project on this page.",
        id: "Yang saya pakai. Semua yang tertulis di sini pernah dipakai di proyek pada halaman ini.",
      }}
    >
      <dl className="mt-10 border-t border-line">
        {stack.map((g) => (
          <div key={g.name} className="grid gap-x-8 gap-y-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:items-baseline">
            <dt className="text-sm font-medium">{g.name}</dt>
            <dd className="text-sm text-mut">{g.tools.join(", ")}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-dim">
        {lang === "en"
          ? "Missing from this list means I have not used it in real work, not that I could not."
          : "Yang tidak ada di daftar ini berarti belum saya pakai di kerja nyata, bukan berarti tidak bisa."}
      </p>
    </Section>
  );
}
