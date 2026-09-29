"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { projects, moreProjects, type Project } from "@/data/projects";
import { useLang, type L10n } from "@/lib/i18n";

/**
 * Blueprint §23 — "Problems I've Turned Into Solutions."
 * Every project answers problem → approach → technology → solution →
 * result → lesson, with honest status labels (§47). Case study in place
 * (§46), no screenshot gallery. Cards are editor windows: path, status
 * and stack are readable before anything is opened.
 */

const FIELDS: { key: "problem" | "approach" | "solution" | "result" | "lesson"; label: L10n }[] = [
  { key: "problem", label: { en: "The problem", id: "Masalahnya" } },
  { key: "approach", label: { en: "My approach", id: "Pendekatan saya" } },
  { key: "solution", label: { en: "The solution", id: "Solusinya" } },
  { key: "result", label: { en: "The result", id: "Hasilnya" } },
  { key: "lesson", label: { en: "The lesson", id: "Pelajarannya" } },
];

/** Filter tabs → ecosystem domain keys (data/technologies.ts). */
const FILTERS: { key: string; label: L10n; domains: string[] }[] = [
  { key: "all", label: { en: "All", id: "Semua" }, domains: [] },
  { key: "ai", label: { en: "AI", id: "AI" }, domains: ["ai", "vision"] },
  { key: "data", label: { en: "Data", id: "Data" }, domains: ["data-analytics", "data-science"] },
  { key: "web", label: { en: "Web", id: "Web" }, domains: ["web"] },
  { key: "mobile", label: { en: "Mobile", id: "Mobile" }, domains: ["mobile"] },
  { key: "automation", label: { en: "Automation", id: "Otomasi" }, domains: ["automation"] },
];

const featured = projects.filter((p) => p.featured);

function matches(project: Project, filterKey: string): boolean {
  const filter = FILTERS.find((f) => f.key === filterKey);
  if (!filter || filter.domains.length === 0) return true;
  return project.domains.some((d) => filter.domains.includes(d));
}

function isLive(project: Project): boolean {
  return project.status === "production" || project.status === "shipped";
}

function CaseStudy({
  project,
  open,
  hidden,
  onToggle,
}: {
  project: Project;
  open: boolean;
  hidden: boolean;
  onToggle: () => void;
}) {
  const { lang, t } = useLang();
  const live = isLive(project);

  return (
    <article
      id={`project-${project.slug}`}
      hidden={hidden}
      className={`win scroll-mt-24 transition-colors hover:border-accent-dim ${open ? "lg:col-span-2" : ""}`}
      data-reveal
    >
      <div className="win-bar">
        <span className="win-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="truncate">~/work/{project.slug}</span>
        <span className={`ml-auto flex items-center gap-1.5 whitespace-nowrap ${live ? "text-accent" : "text-mut"}`}>
          <span
            className={`inline-block h-1.5 w-1.5 rounded-full ${live ? "bg-accent" : "border border-dim"}`}
            aria-hidden="true"
          />
          {project.status}
        </span>
      </div>

      <div className="p-6 md:p-7">
        <p className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
          {project.year} · {t(project.category)}
        </p>

        <h3 className="h-display mt-3 text-2xl md:text-[1.7rem]">{project.title}</h3>
        <p className="prose-mut mt-2 text-sm md:text-base">{t(project.logline)}</p>
        <p className={`mt-3 font-mono text-[0.68rem] tracking-wide ${live ? "text-accent" : "text-mut"}`}>
          {t(project.statusLabel)}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={lang === "en" ? "Technology" : "Teknologi"}>
          {project.technologies.map((tech) => (
            <li key={tech} className="chip !rounded-md !px-2 !py-1 !text-[0.65rem]">
              {tech}
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent2 uppercase hover:underline"
          aria-expanded={open}
          onClick={onToggle}
        >
          <span aria-hidden="true">{open ? "▾" : "▸"}</span>
          {open
            ? lang === "en" ? "Close case study" : "Tutup studi kasus"
            : lang === "en" ? "Open case study" : "Buka studi kasus"}
        </button>
      </div>

      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="border-t border-line p-6 md:p-7">
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
            </dl>

            {project.demoUrl || project.sourceUrl ? (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.demoUrl ? (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid !px-4 !py-2 text-[0.7rem]">
                    {lang === "en" ? "OPEN DEMO" : "BUKA DEMO"} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                {project.sourceUrl ? (
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line !px-4 !py-2 text-[0.7rem]">
                    {lang === "en" ? "SOURCE CODE" : "KODE SUMBER"} <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);

  // Links to #project-<slug> (Consult, command palette, shared URLs) must
  // always land: clear the filter, open the case study, then scroll to it.
  useEffect(() => {
    const focus = (slug: string) => {
      if (!featured.some((p) => p.slug === slug)) return;
      setFilter("all");
      setOpenSlug(slug);
      setFocusSlug(slug);
    };
    const onHash = () => {
      const m = window.location.hash.match(/^#project-(.+)$/);
      if (m) focus(m[1]);
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href^="#project-"]');
      const href = a?.getAttribute("href");
      if (href) focus(href.slice("#project-".length));
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!focusSlug) return;
    document.getElementById(`project-${focusSlug}`)?.scrollIntoView({ block: "start" });
    setFocusSlug(null);
  }, [focusSlug]);

  const shown = featured.filter((p) => matches(p, filter)).length;

  return (
    <Section
      id="projects"
      num="02"
      label={{ en: "The proof", id: "Buktinya" }}
      title={{
        en: "Problems I've solved.",
        id: "Masalah yang sudah saya selesaikan.",
      }}
      lede={{
        en: "Not a screenshot gallery — case studies. Every project answers the same six questions, and every status label is honest.",
        id: "Bukan galeri tangkapan layar — studi kasus. Setiap project menjawab enam pertanyaan yang sama, dan setiap label status jujur.",
      }}
    >
      <div
        className="mt-12 flex flex-wrap items-center gap-2"
        role="group"
        aria-label={lang === "en" ? "Filter projects" : "Saring project"}
        data-reveal
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className="tab"
            aria-pressed={filter === f.key}
            onClick={() => setFilter(f.key)}
          >
            {t(f.label)}
            <span className="tab-count">{featured.filter((p) => matches(p, f.key)).length}</span>
          </button>
        ))}
        <p className="ml-auto font-mono text-[0.65rem] tracking-wide text-dim" aria-live="polite">
          {shown} / {featured.length} {lang === "en" ? "case studies" : "studi kasus"}
        </p>
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
        {featured.map((p) => (
          <CaseStudy
            key={p.slug}
            project={p}
            open={openSlug === p.slug}
            hidden={!matches(p, filter)}
            onToggle={() => setOpenSlug((cur) => (cur === p.slug ? null : p.slug))}
          />
        ))}
      </div>

      {/* The rest of the shipped systems — a terminal listing */}
      <div className="win win-dark mt-16" data-reveal>
        <div className="win-bar">
          <span className="win-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{lang === "en" ? "also built" : "juga dibangun"}</span>
        </div>
        <div className="scroll-x px-4 py-4 md:px-5">
          <p className="font-mono text-xs">
            <span className="tok-kw">$</span> ls ~/work --more
          </p>
          <table className="mt-3 w-full min-w-[640px] text-left font-mono text-xs">
            <thead>
              <tr className="tok-com text-[0.62rem] tracking-widest uppercase">
                <th className="py-2 pr-4 font-normal">{lang === "en" ? "Year" : "Tahun"}</th>
                <th className="py-2 pr-4 font-normal">{lang === "en" ? "System" : "Sistem"}</th>
                <th className="py-2 pr-4 font-normal">{lang === "en" ? "What it is" : "Apa ini"}</th>
                <th className="py-2 font-normal">Stack</th>
              </tr>
            </thead>
            <tbody>
              {moreProjects.map((m) => (
                <tr key={m.title}>
                  <td className="tok-com py-2 pr-4 align-top whitespace-nowrap">{m.year}</td>
                  <td className="tok-kw py-2 pr-4 align-top whitespace-nowrap">{m.title}</td>
                  <td className="py-2 pr-4 align-top">{t(m.what)}</td>
                  <td className="tok-prop py-2 align-top">{m.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
