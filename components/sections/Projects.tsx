"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import { projects, moreProjects, type Project } from "@/data/projects";
import { useLang, type L10n } from "@/lib/i18n";

/**
 * Work. Each project is a row: year and title on the left, what it is
 * and what state it is in on the right. "Detail" opens the problem,
 * approach, solution and result. No screenshots exist yet, so none are
 * faked.
 */

const FIELDS: { key: "problem" | "approach" | "solution" | "result"; label: L10n }[] = [
  { key: "problem", label: { en: "Problem", id: "Masalah" } },
  { key: "approach", label: { en: "Approach", id: "Pendekatan" } },
  { key: "solution", label: { en: "What was built", id: "Yang dibangun" } },
  { key: "result", label: { en: "Result", id: "Hasil" } },
];

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

function Row({
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
  const live = project.status === "production" || project.status === "shipped";

  return (
    <article
      id={`project-${project.slug}`}
      hidden={hidden}
      className="grid scroll-mt-20 gap-x-10 gap-y-3 border-b border-line py-7 md:grid-cols-[8rem_1fr]"
    >
      <div>
        <p className="mono text-dim">{project.year}</p>
        <p className="mt-1 text-sm text-mut">{t(project.category)}</p>
      </div>

      <div className="min-w-0">
        <h3 className="h-display text-2xl md:text-[1.75rem]">{project.title}</h3>
        <p className="prose-mut mt-2">{t(project.logline)}</p>
        <p className={`mt-3 text-sm ${live ? "text-accent" : "text-dim"}`}>{t(project.statusLabel)}</p>
        <p className="mono mt-3 text-dim">{project.technologies.join(" · ")}</p>

        <button type="button" className="link mt-4 text-sm" aria-expanded={open} onClick={onToggle}>
          {open ? (lang === "en" ? "Close" : "Tutup") : lang === "en" ? "Detail" : "Detail"}
        </button>

        <div
          className="grid transition-[grid-template-rows] duration-400 ease-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden" inert={!open}>
            <dl className="mt-6 grid gap-6 border-t border-line pt-6 md:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.key}>
                  <dt className="label">{t(f.label)}</dt>
                  <dd className="prose-mut mt-2 text-sm">{t(project[f.key])}</dd>
                </div>
              ))}
            </dl>

            {project.demoUrl || project.sourceUrl ? (
              <p className="mt-6 flex flex-wrap gap-5 text-sm">
                {project.demoUrl ? (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {lang === "en" ? "Open demo" : "Buka demo"}
                  </a>
                ) : null}
                {project.sourceUrl ? (
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {lang === "en" ? "Source code" : "Kode sumber"}
                  </a>
                ) : null}
              </p>
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

  // Links to #project-<slug> (Consult, shared URLs) must always land:
  // clear the filter, open the detail, then scroll to it.
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

  return (
    <Section
      id="projects"
      label={{ en: "Work", id: "Karya" }}
      title={{
        en: "Eight projects, each with what it was for and what state it is in.",
        id: "Delapan proyek, masing-masing dengan tujuannya dan statusnya sekarang.",
      }}
      lede={{
        en: "Two run a business every day. One is sold to users. The rest are personal tools and experiments, labelled as such.",
        id: "Dua di antaranya menjalankan bisnis setiap hari. Satu dijual ke pengguna. Sisanya alat pribadi dan eksperimen, dan ditandai begitu.",
      }}
    >
      <div
        className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-3"
        role="group"
        aria-label={lang === "en" ? "Filter projects" : "Saring proyek"}
      >
        {FILTERS.map((f) => (
          <button key={f.key} type="button" className="tab" aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
            {t(f.label)}
            <span className="tab-count">{featured.filter((p) => matches(p, f.key)).length}</span>
          </button>
        ))}
      </div>

      <div>
        {featured.map((p) => (
          <Row
            key={p.slug}
            project={p}
            open={openSlug === p.slug}
            hidden={!matches(p, filter)}
            onToggle={() => setOpenSlug((cur) => (cur === p.slug ? null : p.slug))}
          />
        ))}
      </div>

      <div className="mt-16">
        <p className="label">{lang === "en" ? "Also built" : "Juga dibangun"}</p>
        <div className="scroll-x mt-4">
          <table className="w-full min-w-[560px] text-left text-sm">
            <tbody>
              {moreProjects.map((m) => (
                <tr key={m.title} className="border-t border-line">
                  <td className="mono py-3 pr-5 align-top whitespace-nowrap text-dim">{m.year}</td>
                  <td className="py-3 pr-5 align-top font-medium whitespace-nowrap">{m.title}</td>
                  <td className="py-3 pr-5 align-top text-mut">{t(m.what)}</td>
                  <td className="mono py-3 align-top whitespace-nowrap text-dim">{m.stack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}
