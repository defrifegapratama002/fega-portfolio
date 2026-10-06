"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import { consultCases, type ConsultCase } from "@/data/consult";
import { technologies } from "@/data/technologies";
import { projects } from "@/data/projects";
import { contacts } from "@/data/brand";
import { useLang, type Lang } from "@/lib/i18n";

const EMAIL = contacts.email;

/**
 * Consult: pick the problem closest to yours; the answer says what is
 * usually behind it, how it would be approached, which fields apply and
 * which projects are the evidence. Ends in a pre-filled email.
 */

function mailto(c: ConsultCase, lang: Lang): string {
  const subject = encodeURIComponent(c.subject[lang]);
  const body = encodeURIComponent(c.body[lang]);
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
}

function Answer({ c }: { c: ConsultCase }) {
  const { lang, t } = useLang();
  const techs = c.techKeys
    .map((k) => technologies.find((tech) => tech.key === k))
    .filter((tech): tech is NonNullable<typeof tech> => Boolean(tech));
  const proofs = c.projectSlugs
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div key={c.id}>
      <h3 className="h-display text-2xl md:text-3xl">{t(c.label)}</h3>

      <dl className="mt-7 grid gap-6">
        <div>
          <dt className="label">{lang === "en" ? "What is usually going on" : "Yang biasanya terjadi"}</dt>
          <dd className="prose-mut mt-2 text-sm md:text-base">{t(c.cause)}</dd>
        </div>

        <div>
          <dt className="label">{lang === "en" ? "How I would approach it" : "Bagaimana saya menanganinya"}</dt>
          <dd className="mt-3">
            <ol className="flex flex-col gap-2">
              {c.steps.map((s, i) => (
                <li key={i} className="grid grid-cols-[1.4rem_1fr] text-sm text-mut md:text-base">
                  <span className="mono pt-0.5 text-dim">{i + 1}</span>
                  <span>{t(s)}</span>
                </li>
              ))}
            </ol>
          </dd>
        </div>

        <div>
          <dt className="label">{lang === "en" ? "Fields that usually apply" : "Bidang yang biasanya terlibat"}</dt>
          <dd className="mt-2 text-sm">
            {techs.map((tech, i) => (
              <span key={tech.key}>
                <a href={`#${tech.sectionId}`} className="link">
                  {tech.name}
                </a>
                {i < techs.length - 1 ? ", " : ""}
              </span>
            ))}
          </dd>
        </div>

        {proofs.length ? (
          <div>
            <dt className="label">{lang === "en" ? "Where I have done this" : "Di mana saya pernah mengerjakannya"}</dt>
            <dd className="mt-2 flex flex-col gap-1.5 text-sm">
              {proofs.map((p) => (
                <span key={p.slug}>
                  <a href={`#project-${p.slug}`} className="link">
                    {p.title}
                  </a>
                  <span className="text-dim"> · {t(p.statusLabel)}</span>
                </span>
              ))}
            </dd>
          </div>
        ) : null}

        <div>
          <dt className="label">{lang === "en" ? "One thing you can do today" : "Satu hal yang bisa Anda lakukan hari ini"}</dt>
          <dd className="prose-mut mt-2 text-sm md:text-base">{t(c.today)}</dd>
        </div>
      </dl>

      <p className="mt-8">
        <a href={mailto(c, lang)} className="btn btn-solid">
          {lang === "en" ? "Email me about this" : "Kirim email soal ini"}
        </a>
      </p>
    </div>
  );
}

export default function Consult() {
  const { lang, t } = useLang();
  const [selected, setSelected] = useState<string>(consultCases[0].id);
  const current = consultCases.find((c) => c.id === selected) ?? consultCases[0];

  return (
    <Section
      id="consult"
      label={{ en: "Before you write", id: "Sebelum menulis" }}
      title={{
        en: "If one of these sounds like your situation, here is what I would do first.",
        id: "Kalau salah satu ini terdengar seperti situasi Anda, ini yang akan saya lakukan lebih dulu.",
      }}
    >
      <div className="mt-10 grid items-start gap-10 md:grid-cols-[1fr_1.5fr]">
        <div className="flex flex-col" role="tablist" aria-label={lang === "en" ? "Problems" : "Masalah"}>
          {consultCases.map((c) => {
            const active = c.id === selected;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="consult-panel"
                onClick={() => setSelected(c.id)}
                className={`border-l-2 py-3 pl-4 text-left transition-colors ${
                  active ? "border-accent" : "border-line hover:border-fg"
                }`}
              >
                <p className={`text-base ${active ? "text-fg" : "text-mut"}`}>{t(c.label)}</p>
                <p className="mt-0.5 text-sm text-dim">{t(c.symptom)}</p>
              </button>
            );
          })}
        </div>

        <div id="consult-panel" role="tabpanel" aria-live="polite" className="md:sticky md:top-20">
          <Answer c={current} />
        </div>
      </div>
    </Section>
  );
}
