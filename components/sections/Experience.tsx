"use client";

import Section from "@/components/ui/Section";
import { experience } from "@/data/experience";
import { useLang } from "@/lib/i18n";

/**
 * Specification §21 — Experience: problems met and systems built, with
 * the official role kept separate. Renders nothing while
 * data/experience.ts is empty.
 */
export default function Experience() {
  const { lang, t } = useLang();
  if (experience.length === 0) return null;

  return (
    <Section
      id="experience"
      num="XP"
      label={{ en: "Experience", id: "Pengalaman" }}
      title={{
        en: "Real problems, met at work.",
        id: "Masalah nyata, ditemui di tempat kerja.",
      }}
    >
      <ol className="mt-12 border-t border-line">
        {experience.map((e) => (
          <li
            key={e.period + e.role.en}
            className="grid gap-x-10 gap-y-4 border-b border-line py-8 md:grid-cols-[14rem_1fr]"
            data-reveal
          >
            <div>
              <p className="font-mono text-xs tracking-wide text-accent">{e.period}</p>
              <h3 className="h-display mt-2 text-xl">{t(e.role)}</h3>
              <p className="mt-1 text-sm text-mut">{t(e.place)}</p>
            </div>
            <dl className="grid gap-5">
              <div>
                <dt className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
                  {lang === "en" ? "The problem" : "Masalahnya"}
                </dt>
                <dd className="prose-mut mt-1 text-sm md:text-base">{t(e.problem)}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
                  {lang === "en" ? "What I built" : "Yang saya bangun"}
                </dt>
                <dd className="mt-2">
                  <ul className="flex flex-col gap-1.5">
                    {e.built.map((b) => (
                      <li key={b.en} className="flex gap-3 text-sm text-mut md:text-base">
                        <span className="font-mono text-accent" aria-hidden="true">
                          +
                        </span>
                        {t(b)}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              {e.outcome ? (
                <div>
                  <dt className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
                    {lang === "en" ? "Outcome" : "Hasilnya"}
                  </dt>
                  <dd className="prose-mut mt-1 text-sm md:text-base">{t(e.outcome)}</dd>
                </div>
              ) : null}
            </dl>
          </li>
        ))}
      </ol>
    </Section>
  );
}
