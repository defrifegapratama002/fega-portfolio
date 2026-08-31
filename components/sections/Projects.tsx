"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { projects, moreProjects } from "@/data/projects";
import { useLang, type L10n } from "@/lib/i18n";

/**
 * Blueprint §23 — "Problems I've Turned Into Solutions."
 * Every project answers problem → approach → technology → solution →
 * result → lesson, with honest status labels (§47). Case study in place
 * (§46), no screenshot gallery.
 */

const FIELDS: { key: "problem" | "approach" | "solution" | "result" | "lesson"; label: L10n }[] = [
  { key: "problem", label: { en: "The problem", id: "Masalahnya" } },
  { key: "approach", label: { en: "My approach", id: "Pendekatan saya" } },
  { key: "solution", label: { en: "The solution", id: "Solusinya" } },
  { key: "result", label: { en: "The result", id: "Hasilnya" } },
  { key: "lesson", label: { en: "The lesson", id: "Pelajarannya" } },
];

function CaseStudy({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const project = projects.find((p) => p.slug === slug)!;
  const [open, setOpen] = useState(false);

  return (
    <article className="card overflow-hidden transition-colors hover:border-accent-dim" data-reveal>
      <div className="p-7 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
            {project.year} · {t(project.category)}
          </p>
          <p
            className={`font-mono text-[0.65rem] tracking-wide ${
              project.status === "production" || project.status === "shipped"
                ? "text-accent"
                : "text-mut"
            }`}
          >
            {t(project.statusLabel)}
          </p>
        </div>

        <h3 className="h-display mt-3 text-2xl md:text-3xl">{project.title}</h3>
        <p className="prose-mut mt-2 text-sm md:text-base">{t(project.logline)}</p>

        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase hover:underline"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open
            ? lang === "en" ? "Close case study" : "Tutup studi kasus"
            : lang === "en" ? "Open case study" : "Buka studi kasus"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-line p-7 md:p-8">
            <Pipeline steps={project.pipeline} className="mb-8" />

            <dl className="grid gap-6 md:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.key} className={f.key === "lesson" ? "md:col-span-2" : ""}>
                  <dt className="font-mono text-[0.65rem] tracking-widest text-accent uppercase">
                    {t(f.label)}
                  </dt>
                  <dd className="prose-mut mt-2 text-sm">{t(project[f.key])}</dd>
                </div>
              ))}
              <div className="md:col-span-2">
                <dt className="font-mono text-[0.65rem] tracking-widest text-accent uppercase">
                  {lang === "en" ? "Technology" : "Teknologi"}
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { lang, t } = useLang();
  const featured = projects.filter((p) => p.featured);

  return (
    <Section
      id="projects"
      num="11"
      label={{ en: "The proof", id: "Buktinya" }}
      title={{
        en: "Problems I've turned into solutions.",
        id: "Masalah yang saya ubah menjadi solusi.",
      }}
      lede={{
        en: "Not a screenshot gallery — case studies. Every project answers the same six questions, and every status label is honest.",
        id: "Bukan galeri tangkapan layar — studi kasus. Setiap project menjawab enam pertanyaan yang sama, dan setiap label status jujur.",
      }}
    >
      <div className="mt-14 flex flex-col gap-6">
        {featured.map((p) => (
          <CaseStudy key={p.slug} slug={p.slug} />
        ))}
      </div>

      {/* The rest of the shipped systems */}
      <div className="mt-16" data-reveal>
        <p className="kicker">{lang === "en" ? "Also built" : "Juga dibangun"}</p>
        <div className="scroll-x mt-5">
          <table className="w-full min-w-[640px] text-left font-mono text-xs">
            <thead>
              <tr className="text-[0.62rem] tracking-widest text-dim uppercase">
                <th className="border-b border-line py-3 pr-4 font-normal">{lang === "en" ? "Year" : "Tahun"}</th>
                <th className="border-b border-line py-3 pr-4 font-normal">{lang === "en" ? "System" : "Sistem"}</th>
                <th className="border-b border-line py-3 pr-4 font-normal">{lang === "en" ? "What it is" : "Apa ini"}</th>
                <th className="border-b border-line py-3 font-normal">Stack</th>
              </tr>
            </thead>
            <tbody>
              {moreProjects.map((m) => (
                <tr key={m.title} className="text-mut">
                  <td className="border-b border-line py-3 pr-4 align-top text-dim">{m.year}</td>
                  <td className="border-b border-line py-3 pr-4 align-top text-fg">{m.title}</td>
                  <td className="border-b border-line py-3 pr-4 align-top">{t(m.what)}</td>
                  <td className="border-b border-line py-3 align-top text-dim">{m.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
