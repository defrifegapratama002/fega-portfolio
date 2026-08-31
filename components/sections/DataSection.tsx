"use client";

import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { useLang, type L10n } from "@/lib/i18n";

/**
 * Blueprint §12–13 — Data Analytics & Data Science.
 * The chart is real data: the systems listed on this very page,
 * aggregated by year, filterable by domain, hoverable per bar.
 * Single series → single accent hue; labels wear text tokens.
 */

type Row = { title: string; year: number; domains: string[] };

const SYSTEMS: Row[] = [
  { title: "Leaf-Disease CNN (thesis)", year: 2024, domains: ["data", "vision"] },
  { title: "Manga OCR / Translation / TTS", year: 2025, domains: ["ai", "vision"] },
  { title: "Tourism Data Intelligence", year: 2025, domains: ["data"] },
  { title: "Sentiment Analysis", year: 2025, domains: ["data", "ai"] },
  { title: "July Sunflowers", year: 2025, domains: ["web"] },
  { title: "ITS RYO Configurator", year: 2025, domains: ["web"] },
  { title: "SpeakJapanese", year: 2026, domains: ["mobile", "ai"] },
  { title: "AI English Speaking Tutor", year: 2026, domains: ["mobile", "ai"] },
  { title: "SupplierDaging", year: 2026, domains: ["mobile", "automation"] },
  { title: "ITSFR Platform", year: 2026, domains: ["web", "automation", "data"] },
  { title: "ZONZON × zonzon.shop", year: 2026, domains: ["web"] },
  { title: "GalonHarmoni", year: 2026, domains: ["web", "mobile"] },
  { title: "FegaTutor", year: 2026, domains: ["ai", "web"] },
  { title: "Secure DMS", year: 2026, domains: ["web"] },
  { title: "Interactive Technology Portfolio", year: 2026, domains: ["web"] },
];

const FILTERS: { key: string; label: L10n }[] = [
  { key: "all", label: { en: "All", id: "Semua" } },
  { key: "ai", label: { en: "AI", id: "AI" } },
  { key: "web", label: { en: "Web", id: "Web" } },
  { key: "mobile", label: { en: "Mobile", id: "Mobile" } },
  { key: "data", label: { en: "Data", id: "Data" } },
  { key: "automation", label: { en: "Automation", id: "Otomasi" } },
];

const COMPARISON: { key: string; name: string; q: L10n; a: L10n }[] = [
  {
    key: "analyst",
    name: "Data Analytics",
    q: { en: "What happened?", id: "Apa yang terjadi?" },
    a: {
      en: "Cleaning, exploring and visualizing data so a decision-maker can see what is actually going on.",
      id: "Membersihkan, mengeksplorasi, dan memvisualisasikan data agar pengambil keputusan bisa melihat apa yang sebenarnya terjadi.",
    },
  },
  {
    key: "science",
    name: "Data Science",
    q: { en: "Why did it happen — and what might happen next?", id: "Mengapa itu terjadi — dan apa yang mungkin terjadi berikutnya?" },
    a: {
      en: "Statistics and modeling on top of the data to explain causes and estimate what comes next.",
      id: "Statistika dan pemodelan di atas data untuk menjelaskan penyebab dan memperkirakan apa yang terjadi berikutnya.",
    },
  },
  {
    key: "ml",
    name: "Machine Learning",
    q: { en: "Can a system learn the pattern?", id: "Bisakah sebuah sistem mempelajari polanya?" },
    a: {
      en: "Training models that generalize from examples — like the leaf-disease CNN trained for my thesis.",
      id: "Melatih model yang menggeneralisasi dari contoh — seperti CNN penyakit daun yang dilatih untuk skripsi saya.",
    },
  },
  {
    key: "ai",
    name: "AI",
    q: { en: "Can the system use that capability to assist or act?", id: "Bisakah sistem memakai kemampuan itu untuk membantu atau bertindak?" },
    a: {
      en: "Putting learned capability to work in products — assistants, tutors, automation that acts on understanding.",
      id: "Menerapkan kemampuan yang dipelajari ke dalam produk — asisten, tutor, otomasi yang bertindak atas dasar pemahaman.",
    },
  },
];

const CHART_W = 640;
const CHART_H = 260;
const PAD = { top: 28, right: 16, bottom: 34, left: 36 };

export default function DataSection() {
  const { lang, t } = useLang();
  const [filter, setFilter] = useState("all");
  const [hover, setHover] = useState<number | null>(null);
  const [tab, setTab] = useState("analyst");

  const { bars, maxCount, total, topYear } = useMemo(() => {
    const rows = filter === "all" ? SYSTEMS : SYSTEMS.filter((r) => r.domains.includes(filter));
    const years = [2024, 2025, 2026];
    const bars = years.map((year) => {
      const items = rows.filter((r) => r.year === year);
      return { year, count: items.length, items };
    });
    const maxCount = Math.max(...bars.map((b) => b.count), 1);
    const top = bars.reduce((a, b) => (b.count > a.count ? b : a), bars[0]);
    return { bars, maxCount, total: rows.length, topYear: top };
  }, [filter]);

  const innerW = CHART_W - PAD.left - PAD.right;
  const innerH = CHART_H - PAD.top - PAD.bottom;
  const barW = Math.min(72, (innerW / bars.length) * 0.5);
  const yFor = (count: number) => PAD.top + innerH - (count / maxCount) * innerH;
  const xFor = (i: number) => PAD.left + (innerW / bars.length) * (i + 0.5) - barW / 2;

  const ticks = useMemo(() => {
    const step = maxCount > 6 ? 3 : maxCount > 3 ? 2 : 1;
    const out: number[] = [];
    for (let v = 0; v <= maxCount; v += step) out.push(v);
    return out;
  }, [maxCount]);

  const barPath = (x: number, y: number, w: number, h: number) => {
    if (h <= 0) return "";
    const r = Math.min(4, h);
    return `M${x},${y + h} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} Z`;
  };

  const active = COMPARISON.find((c) => c.key === tab) ?? COMPARISON[0];

  return (
    <Section
      id="tech-data"
      num="05"
      label={{ en: "Demonstration — Data", id: "Demonstrasi — Data" }}
      title={{
        en: "Data becomes valuable when it helps someone decide.",
        id: "Data menjadi bernilai saat membantu seseorang memutuskan.",
      }}
      lede={{
        en: "This chart is not a mockup: it aggregates the real systems listed on this page. Filter it, hover it — raw data to insight, live.",
        id: "Chart ini bukan mockup: ia mengagregasi sistem-sistem nyata yang tercantum di halaman ini. Filter, arahkan kursor — data mentah menjadi insight, langsung.",
      }}
    >
      <div className="mt-12" data-reveal>
        <Pipeline
          steps={
            lang === "en"
              ? ["RAW DATA", "CLEAN", "ANALYZE", "VISUALIZE", "INSIGHT", "DECISION"]
              : ["DATA MENTAH", "BERSIHKAN", "ANALISIS", "VISUALISASI", "INSIGHT", "KEPUTUSAN"]
          }
        />
      </div>

      {/* Interactive chart */}
      <div className="card mt-12 p-6 md:p-8" data-reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-sm font-medium text-fg">
            {lang === "en" ? "Systems shipped per year" : "Sistem rampung per tahun"}
          </h3>
          <div className="flex flex-wrap gap-2" role="group" aria-label={lang === "en" ? "Filter by domain" : "Filter berdasarkan domain"}>
            {FILTERS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`chip transition-colors hover:text-fg ${filter === f.key ? "!border-accent !text-fg" : ""}`}
                aria-pressed={filter === f.key}
                onClick={() => {
                  setFilter(f.key);
                  setHover(null);
                }}
              >
                {t(f.label)}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-6">
          <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} className="block w-full" role="img"
            aria-label={lang === "en" ? "Bar chart of systems shipped per year" : "Diagram batang sistem rampung per tahun"}>
            {/* recessive grid */}
            {ticks.map((v) => (
              <g key={v}>
                <line x1={PAD.left} x2={CHART_W - PAD.right} y1={yFor(v)} y2={yFor(v)} stroke="#232329" strokeWidth="1" />
                <text x={PAD.left - 8} y={yFor(v) + 4} textAnchor="end" fontSize="11" fontFamily="monospace" fill="#6b6b75">
                  {v}
                </text>
              </g>
            ))}
            {bars.map((b, i) => {
              const h = (b.count / maxCount) * innerH;
              const x = xFor(i);
              const y = yFor(b.count);
              return (
                <g key={b.year}>
                  <path
                    d={barPath(x, y, barW, h)}
                    fill="#2fe0b8"
                    opacity={hover === null || hover === i ? 1 : 0.35}
                    style={{ transition: "opacity 0.2s ease, d 0.4s ease" }}
                    tabIndex={0}
                    role="graphics-symbol"
                    aria-label={`${b.year}: ${b.count}`}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                  />
                  {b.count > 0 ? (
                    <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="12" fontFamily="monospace" fill="#ededf2">
                      {b.count}
                    </text>
                  ) : null}
                  <text x={x + barW / 2} y={CHART_H - 12} textAnchor="middle" fontSize="12" fontFamily="monospace" fill="#a3a3ae">
                    {b.year}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* tooltip */}
          {hover !== null && bars[hover] && bars[hover].count > 0 ? (
            <div
              className="pointer-events-none absolute z-10 max-w-[240px] rounded-lg border border-line bg-panel2 p-3 shadow-xl"
              style={{
                left: `${((xFor(hover) + barW / 2) / CHART_W) * 100}%`,
                top: 0,
                transform: "translateX(-50%)",
              }}
              role="status"
            >
              <p className="font-mono text-[0.65rem] tracking-widest text-accent">{bars[hover].year}</p>
              <ul className="mt-1 text-xs leading-relaxed text-mut">
                {bars[hover].items.map((it) => (
                  <li key={it.title}>{it.title}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <p className="mt-4 font-mono text-xs tracking-wide text-mut" aria-live="polite">
          <span className="text-accent">INSIGHT —</span>{" "}
          {lang === "en"
            ? `${total} systems in this view · peak year ${topYear.year} with ${topYear.count}.`
            : `${total} sistem dalam tampilan ini · tahun puncak ${topYear.year} dengan ${topYear.count}.`}
        </p>

        {/* Accessible table view of the same data */}
        <div className="sr-only">
        <table>
          <caption>{lang === "en" ? "Systems shipped per year" : "Sistem rampung per tahun"}</caption>
          <thead>
            <tr>
              <th scope="col">{lang === "en" ? "Year" : "Tahun"}</th>
              <th scope="col">{lang === "en" ? "Count" : "Jumlah"}</th>
              <th scope="col">{lang === "en" ? "Systems" : "Sistem"}</th>
            </tr>
          </thead>
          <tbody>
            {bars.map((b) => (
              <tr key={b.year}>
                <td>{b.year}</td>
                <td>{b.count}</td>
                <td>{b.items.map((it) => it.title).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Data science: the four questions */}
      <div className="mt-14" data-reveal>
        <Pipeline steps={["DATA", "PATTERN", "MODEL", "PREDICTION", "EVALUATION", "INSIGHT"]} />
      </div>

      <div className="card mt-10 p-6 md:p-8" data-reveal>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={lang === "en" ? "Data disciplines" : "Disiplin data"}>
          {COMPARISON.map((c) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={tab === c.key}
              className={`chip transition-colors hover:text-fg ${tab === c.key ? "!border-accent !text-fg" : ""}`}
              onClick={() => setTab(c.key)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <div role="tabpanel" className="mt-6">
          <p className="h-display text-xl text-fg md:text-2xl">“{t(active.q)}”</p>
          <p className="prose-mut mt-3 text-sm">{t(active.a)}</p>
        </div>
      </div>

      <p className="mt-8 font-mono text-xs tracking-wide text-dim" data-reveal>
        {lang === "en" ? "Proven by:" : "Dibuktikan oleh:"}{" "}
        <span className="text-mut">Tourism Data Intelligence · Sentiment Analysis · ITSFR dashboards · Leaf-Disease CNN</span>
      </p>
    </Section>
  );
}
