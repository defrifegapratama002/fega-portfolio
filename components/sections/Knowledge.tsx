"use client";

import Section from "@/components/ui/Section";
import { knowledge } from "@/data/certificates";
import { useLang } from "@/lib/i18n";

/**
 * Blueprint §29 — "Knowledge I've Built." Certificates and study are
 * supporting evidence: certificate → what was learned → related skill →
 * related project. Never the center of the portfolio.
 */
export default function Knowledge() {
  const { lang, t } = useLang();

  return (
    <Section
      id="knowledge"
      num="15"
      label={{ en: "Knowledge I've built", id: "Pengetahuan yang saya bangun" }}
      title={{
        en: "Every piece of knowledge points at a shipped system.",
        id: "Setiap pengetahuan menunjuk pada sistem yang sudah jadi.",
      }}
      lede={{
        en: "Credentials support the work — they don't replace it. Each entry answers: what was learned, which skill it built, and where it was proven.",
        id: "Kredensial mendukung karya — bukan menggantikannya. Setiap entri menjawab: apa yang dipelajari, skill apa yang terbangun, dan di mana itu dibuktikan.",
      }}
    >
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {knowledge.map((k) => (
          <article key={k.title} className="card flex flex-col p-7" data-reveal>
            <p className="kicker">{k.category}</p>
            <h3 className="h-display mt-2 text-xl">{k.title}</h3>
            <p className="mt-1 font-mono text-[0.65rem] tracking-wide text-dim">
              {k.provider}
              {k.date ? ` · ${k.date}` : ""}
            </p>
            <p className="prose-mut mt-4 flex-1 text-sm">{t(k.learned)}</p>
            <dl className="mt-5 flex flex-col gap-1 font-mono text-[0.68rem] text-dim">
              <div className="flex gap-2">
                <dt className="tracking-widest uppercase">{lang === "en" ? "Skill" : "Skill"} →</dt>
                <dd className="text-mut">{k.relatedSkill}</dd>
              </div>
              {k.relatedProject ? (
                <div className="flex gap-2">
                  <dt className="tracking-widest uppercase">{lang === "en" ? "Proven in" : "Dibuktikan di"} →</dt>
                  <dd className="text-mut">{k.relatedProject}</dd>
                </div>
              ) : null}
            </dl>
            {k.credentialUrl ? (
              <a
                href={k.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 font-mono text-xs tracking-widest text-accent uppercase hover:underline"
              >
                {lang === "en" ? "Verify credential ↗" : "Verifikasi kredensial ↗"}
              </a>
            ) : null}
          </article>
        ))}
      </div>

      {/* Trust model (§48) */}
      <div className="mt-14" data-reveal>
        <div className="pipe">
          {(lang === "en"
            ? ["REAL PROJECT", "DEMONSTRATION", "PROBLEM SOLVING", "CERTIFICATION"]
            : ["PROJECT NYATA", "DEMONSTRASI", "PROBLEM SOLVING", "SERTIFIKASI"]
          ).map((s, i, arr) => (
            <span key={s} className="contents">
              <span className="pipe-step is-on">{s}</span>
              {i < arr.length - 1 ? <span className="pipe-arrow">+</span> : null}
            </span>
          ))}
          <span className="pipe-arrow">=</span>
          <span className="pipe-step is-on !border-accent !text-accent">
            {lang === "en" ? "CREDIBILITY" : "KREDIBILITAS"}
          </span>
        </div>
      </div>
    </Section>
  );
}
