"use client";

import Section from "@/components/ui/Section";
import { experiments, LAB_STATUS } from "@/data/lab";
import { useLang } from "@/lib/i18n";

/**
 * Specification §18 — Live Lab. The index of everything on this page a
 * visitor can actually operate; each entry is labelled for what it is.
 */
export default function LiveLab() {
  const { lang, t } = useLang();

  return (
    <Section
      id="lab"
      num="03"
      label={{ en: "Live lab", id: "Lab langsung" }}
      title={{
        en: "Don't take my word for it. Run it.",
        id: "Jangan percaya kata saya. Jalankan sendiri.",
      }}
      lede={{
        en: "Six experiments run in your browser, grouped into five chapters. Every one is labelled honestly: live means real computation; experiment means an interactive model of the idea.",
        id: "Enam eksperimen berjalan di browser Anda, dikelompokkan dalam lima bab. Semuanya diberi label jujur: live berarti komputasi nyata; eksperimen berarti model interaktif dari idenya.",
      }}
    >
      <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((e, i) => (
          <li key={e.href} className="bg-panel" data-reveal>
            <a href={e.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-panel2">
              <span className="flex items-center justify-between font-mono text-[0.65rem] tracking-widest uppercase">
                <span className="text-dim">0{i + 1}</span>
                <span className={`flex items-center gap-1.5 ${e.status === "live" ? "text-accent" : "text-mut"}`}>
                  <span
                    className={`inline-block h-1.5 w-1.5 rounded-full ${
                      e.status === "live" ? "bg-accent" : "border border-dim"
                    }`}
                    aria-hidden="true"
                  />
                  {t(LAB_STATUS[e.status])}
                </span>
              </span>
              <span className="h-display mt-5 text-xl group-hover:text-accent">{t(e.name)}</span>
              <span className="prose-mut mt-2 flex-1 text-sm">{t(e.what)}</span>
              <span className="mt-5 font-mono text-xs tracking-widest text-accent2 uppercase">
                {lang === "en" ? "Run" : "Jalankan"} ↓
              </span>
            </a>
          </li>
        ))}
      </ol>
    </Section>
  );
}
