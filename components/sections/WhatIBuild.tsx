"use client";

import Section from "@/components/ui/Section";
import { builds, steps } from "@/data/builds";
import { projects } from "@/data/projects";
import { useLang } from "@/lib/i18n";

/**
 * What I work on: six fields, each with the kinds of systems and the
 * projects that back it. Then how a project is worked, in six steps.
 */
export default function WhatIBuild() {
  const { lang, t } = useLang();

  return (
    <Section
      id="build"
      label={{ en: "What I work on", id: "Yang saya kerjakan" }}
      title={{
        en: "Six fields. The problem decides which ones a project needs.",
        id: "Enam bidang. Masalahnya yang menentukan bidang mana yang dibutuhkan.",
      }}
    >
      <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {builds.map((b) => {
          const proofs = b.projects
            .map((slug) => projects.find((p) => p.slug === slug))
            .filter((p): p is NonNullable<typeof p> => Boolean(p));
          return (
            <div key={b.key} className="border-t border-line pt-5">
              <h3 className="h-display text-2xl">{t(b.name)}</h3>
              <p className="prose-mut mt-2 text-sm">{t(b.summary)}</p>
              <ul className="mt-4 flex flex-col gap-1 text-sm text-mut">
                {b.items.map((item) => (
                  <li key={item.en}>{t(item)}</li>
                ))}
              </ul>
              <p className="mt-4 text-sm">
                {proofs.length ? (
                  <>
                    <span className="text-dim">{lang === "en" ? "In: " : "Di: "}</span>
                    {proofs.map((p, i) => (
                      <span key={p.slug}>
                        <a href={`#project-${p.slug}`} className="link">
                          {p.title}
                        </a>
                        {i < proofs.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </>
                ) : (
                  <span className="text-dim">
                    {lang === "en" ? "No shipped project yet. " : "Belum ada proyek yang rilis. "}
                    <a href={`#${b.demo}`} className="link">
                      {lang === "en" ? "Sketch in the lab" : "Sketsa di lab"}
                    </a>
                  </span>
                )}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-[14rem_1fr]">
        <div>
          <p className="label">{lang === "en" ? "How I work" : "Cara saya bekerja"}</p>
          <p className="prose-mut mt-3 text-sm">
            {lang === "en"
              ? "The same six steps on every project, whether it is an ERP or a weekend tool."
              : "Enam langkah yang sama di setiap proyek, entah itu ERP atau alat akhir pekan."}
          </p>
        </div>
        <ol className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.name.en} className="grid grid-cols-[1.6rem_1fr] gap-x-3 text-sm">
              <span className="mono pt-0.5 text-dim">{i + 1}</span>
              <div>
                <p className="font-medium text-fg">{t(s.name)}</p>
                <p className="mt-1 text-mut">{t(s.note)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
