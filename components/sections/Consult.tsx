"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Magnetic from "@/components/ui/Magnetic";
import { consultCases, type ConsultCase } from "@/data/consult";
import { technologies } from "@/data/technologies";
import { projects } from "@/data/projects";
import { contacts } from "@/data/brand";
import { useLang, type Lang } from "@/lib/i18n";

const EMAIL = contacts.email;

/**
 * Consult — the visitor's problem, routed to the technology areas that
 * usually solve it, the case studies that prove it, and one step they
 * can take today. Ends in a pre-filled email, never a promise.
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
    <div key={c.id} className="consult-answer">
      <p className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
        {lang === "en" ? "Your problem" : "Masalah Anda"}
      </p>
      <h3 className="h-display mt-2 text-2xl md:text-3xl">{t(c.label)}</h3>

      <dl className="mt-8 grid gap-7">
        <div>
          <dt className="font-mono text-[0.65rem] tracking-widest text-accent uppercase">
            {lang === "en" ? "What is usually going on" : "Yang biasanya terjadi"}
          </dt>
          <dd className="prose-mut mt-2 text-sm md:text-base">{t(c.cause)}</dd>
        </div>

        <div>
          <dt className="font-mono text-[0.65rem] tracking-widest text-accent uppercase">
            {lang === "en" ? "How I would approach it" : "Bagaimana saya menanganinya"}
          </dt>
          <dd className="mt-3">
            <ol className="flex flex-col gap-2.5">
              {c.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-mut md:text-base">
                  <span className="font-mono text-xs text-accent2">0{i + 1}</span>
                  <span>{t(s)}</span>
                </li>
              ))}
            </ol>
          </dd>
        </div>

        <div>
          <dt className="font-mono text-[0.65rem] tracking-widest text-accent uppercase">
            {lang === "en" ? "Technology that usually applies" : "Teknologi yang biasanya berlaku"}
          </dt>
          <dd className="mt-3 flex flex-wrap gap-2">
            {techs.map((tech) => (
              <a
                key={tech.key}
                href={`#${tech.sectionId}`}
                className="chip transition-colors hover:border-accent hover:text-fg"
                title={lang === "en" ? "See the demonstration" : "Lihat demonstrasinya"}
              >
                {tech.name} ↗
              </a>
            ))}
          </dd>
        </div>

        {proofs.length ? (
          <div>
            <dt className="font-mono text-[0.65rem] tracking-widest text-accent uppercase">
              {lang === "en" ? "Proof — case studies" : "Bukti — studi kasus"}
            </dt>
            <dd className="mt-3 flex flex-col gap-2">
              {proofs.map((p) => (
                <a
                  key={p.slug}
                  href={`#project-${p.slug}`}
                  className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-2 text-sm"
                >
                  <span className="text-fg group-hover:text-accent">{p.title}</span>
                  <span className="font-mono text-[0.65rem] tracking-wide text-dim">{t(p.statusLabel)}</span>
                </a>
              ))}
            </dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-8 border-l-2 border-accent2 bg-panel2 p-5">
        <p className="font-mono text-[0.65rem] tracking-widest text-accent2 uppercase">
          {lang === "en" ? "One step you can take today" : "Satu langkah yang bisa Anda ambil hari ini"}
        </p>
        <p className="mt-2 text-sm text-fg md:text-base">{t(c.today)}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Magnetic>
          <a href={mailto(c, lang)} className="btn btn-solid">
            {lang === "en" ? "DISCUSS THIS PROBLEM" : "BAHAS MASALAH INI"}
          </a>
        </Magnetic>
        <p className="font-mono text-[0.65rem] tracking-wide text-dim">
          {lang === "en"
            ? "Opens an email with the subject already filled in."
            : "Membuka email dengan subjek yang sudah terisi."}
        </p>
      </div>
    </div>
  );
}

export default function Consult() {
  const { lang, t } = useLang();
  const [selected, setSelected] = useState<string | null>(null);
  const current = consultCases.find((c) => c.id === selected) ?? null;

  return (
    <Section
      id="consult"
      num="16"
      label={{ en: "Consult", id: "Konsultasi" }}
      title={{
        en: "What are you dealing with right now?",
        id: "Apa yang sedang Anda hadapi sekarang?",
      }}
      lede={{
        en: "Pick the problem closest to yours. I'll say what is usually behind it, how I would approach it, which technology areas apply, and one thing you can do today — before we ever talk.",
        id: "Pilih masalah yang paling dekat dengan situasi Anda. Saya jelaskan apa yang biasanya ada di baliknya, bagaimana saya menanganinya, area teknologi mana yang berlaku, dan satu hal yang bisa Anda lakukan hari ini — sebelum kita bicara.",
      }}
    >
      <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1fr_1.35fr]">
        {/* Picker */}
        <div className="flex flex-col gap-3" role="tablist" aria-label={lang === "en" ? "Problems" : "Masalah"}>
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
                className={`card cursor-pointer p-5 text-left transition-colors ${
                  active ? "border-accent bg-panel2" : "hover:border-accent-dim"
                }`}
                data-reveal
              >
                <p className={`h-display text-base md:text-lg ${active ? "text-accent" : "text-fg"}`}>
                  {t(c.label)}
                </p>
                <p className="mt-1 text-sm text-mut">{t(c.symptom)}</p>
              </button>
            );
          })}
        </div>

        {/* Answer panel */}
        <div
          id="consult-panel"
          role="tabpanel"
          aria-live="polite"
          className="card p-7 md:p-9 lg:sticky lg:top-24"
          data-reveal
        >
          {current ? (
            <Answer c={current} />
          ) : (
            <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
              <span
                className="mb-6 h-16 w-16 rounded-full border-4 border-line border-r-transparent"
                aria-hidden="true"
              />
              <p className="prose-mut text-sm md:text-base">
                {lang === "en"
                  ? "Choose a problem on the left. If none fits, skip ahead and write to me directly — that works too."
                  : "Pilih masalah di sebelah kiri. Jika tidak ada yang cocok, lompat ke bawah dan tulis langsung ke saya — itu juga boleh."}
              </p>
              <a href="#contact" className="btn btn-line mt-6">
                {lang === "en" ? "WRITE DIRECTLY" : "TULIS LANGSUNG"}
              </a>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
