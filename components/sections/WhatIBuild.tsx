"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { builds, method } from "@/data/builds";
import { projects } from "@/data/projects";
import { useLang } from "@/lib/i18n";

/**
 * Specification §11 — "What I Build" (never "My Skills"): pick a field,
 * see the kinds of systems, the proof, and where it is demonstrated.
 */
export default function WhatIBuild() {
  const { lang, t } = useLang();
  const [activeKey, setActiveKey] = useState(builds[0].key);
  const active = builds.find((b) => b.key === activeKey) ?? builds[0];
  const proofs = active.projects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <Section
      id="build"
      num="01"
      label={{ en: "What I build", id: "Yang saya bangun" }}
      title={{
        en: "Give me a problem. I build the system that solves it.",
        id: "Beri saya masalah. Saya bangun sistem yang menyelesaikannya.",
      }}
      lede={{
        en: "Technology is the tool; understanding the problem comes first. These are the kinds of systems I build.",
        id: "Teknologi adalah alatnya; memahami masalah adalah langkah pertama. Inilah jenis sistem yang saya bangun.",
      }}
    >
      <div className="mt-12 grid items-start gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
        <div
          className="flex flex-wrap gap-2 lg:flex-col lg:gap-0 lg:border-t lg:border-line"
          role="tablist"
          aria-label={lang === "en" ? "Fields" : "Bidang"}
          data-reveal
        >
          {builds.map((b, i) => {
            const on = b.key === activeKey;
            return (
              <button
                key={b.key}
                type="button"
                role="tab"
                id={`build-tab-${b.key}`}
                aria-selected={on}
                aria-controls="build-panel"
                onClick={() => setActiveKey(b.key)}
                className={`build-tab ${on ? "is-on" : ""}`}
              >
                <span className={`font-mono text-xs ${i % 2 ? "text-accent2" : "text-accent"}`}>0{i + 1}</span>
                <span className="h-display text-lg uppercase lg:text-2xl">{t(b.name)}</span>
                <span className="ml-auto hidden font-mono text-xs lg:block" aria-hidden="true">
                  {on ? "●" : "→"}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="build-panel"
          role="tabpanel"
          aria-labelledby={`build-tab-${active.key}`}
          className="win"
          data-reveal
        >
          <div className="win-bar">
            <span className="win-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>~/build/{active.key}</span>
          </div>
          <div key={active.key} className="scene-enter p-6 md:p-8">
            <p className="h-display text-xl leading-snug md:text-2xl">{t(active.summary)}</p>

            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {active.items.map((item) => (
                <li key={item.en} className="flex gap-3 text-sm text-mut md:text-base">
                  <span className="font-mono text-accent" aria-hidden="true">
                    +
                  </span>
                  {t(item)}
                </li>
              ))}
            </ul>

            {proofs.length ? (
              <div className="mt-8 border-t border-line pt-6">
                <p className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
                  {lang === "en" ? "Proven in" : "Dibuktikan di"}
                </p>
                <ul className="mt-3 flex flex-col">
                  {proofs.map((p) => (
                    <li key={p.slug}>
                      <a
                        href={`#project-${p.slug}`}
                        className="group flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-2.5 text-sm"
                      >
                        <span className="text-fg group-hover:text-accent">{p.title}</span>
                        <span className="font-mono text-[0.65rem] tracking-wide text-dim">{p.status}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <a
              href={`#${active.demo}`}
              className="mt-7 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent2 uppercase hover:underline"
            >
              {lang === "en" ? "See it in the lab" : "Lihat di lab"} ↓
            </a>
          </div>
        </div>
      </div>

      <div className="mt-14" data-reveal>
        <p className="mb-4 font-mono text-[0.65rem] tracking-widest text-dim uppercase">
          {lang === "en" ? "How every system gets built" : "Bagaimana setiap sistem dibangun"}
        </p>
        <Pipeline steps={method.map((m) => t(m))} />
      </div>
    </Section>
  );
}
