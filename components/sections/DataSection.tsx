"use client";

import { useMemo, useState } from "react";
import Section from "@/components/ui/Section";
import { useLang, type L10n } from "@/lib/i18n";

/**
 * Data chapter demo. The chart is real data: the systems listed on this
 * page, counted by year, filterable by field.
 */

type Row = { title: string; year: number; domains: string[] };

const SYSTEMS: Row[] = [
  { title: "Leaf-Disease CNN (thesis)", year: 2024, domains: ["data", "vision"] },
  { title: "Manga OCR, Translation, TTS", year: 2025, domains: ["ai", "vision"] },
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
  { title: "This site", year: 2026, domains: ["web"] },
];

const FILTERS: { key: string; label: L10n }[] = [
  { key: "all", label: { en: "All", id: "Semua" } },
  { key: "ai", label: { en: "AI", id: "AI" } },
  { key: "web", label: { en: "Web", id: "Web" } },
  { key: "mobile", label: { en: "Mobile", id: "Mobile" } },
  { key: "data", label: { en: "Data", id: "Data" } },
  { key: "automation", label: { en: "Automation", id: "Otomasi" } },
];

const QUESTIONS: { name: string; q: L10n; a: L10n }[] = [
  {
    name: "Data analytics",
    q: { en: "What happened?", id: "Apa yang terjadi?" },
    a: {
      en: "Cleaning, exploring and charting the data so a decision-maker can see what is actually going on.",
      id: "Membersihkan, menjelajahi, dan menggrafikkan data agar pengambil keputusan bisa melihat apa yang sebenarnya terjadi.",
    },
  },
  {
    name: "Data science",
    q: { en: "Why, and what comes next?", id: "Mengapa, dan apa berikutnya?" },
    a: {
      en: "Statistics and models on top of the data, to explain causes and estimate what follows.",
      id: "Statistika dan model di atas data, untuk menjelaskan penyebab dan memperkirakan apa yang menyusul.",
    },
  },
  {
    name: "Machine learning",
    q: { en: "Can a system learn the pattern?", id: "Bisakah sistem mempelajari polanya?" },
    a: {
      en: "Models that generalise from examples, like the leaf-disease CNN from my thesis.",
      id: "Model yang menggeneralisasi dari contoh, seperti CNN penyakit daun dari skripsi saya.",
    },
  },
  {
    name: "AI",
    q: { en: "Can it act on that?", id: "Bisakah ia bertindak atas dasar itu?" },
    a: {
      en: "Putting the learned capability into a product: assistants, tutors, automation that acts on understanding.",
      id: "Memasukkan kemampuan yang dipelajari ke dalam produk: asisten, tutor, otomasi yang bertindak atas pemahaman.",
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

  return (
    <Section
      id="tech-data"
      label={{ en: "Data · try it", id: "Data · coba" }}
      title={{
        en: "The systems on this page, counted by year.",
        id: "Sistem-sistem di halaman ini, dihitung per tahun.",
      }}
      lede={{
        en: "A small real dataset: everything listed under Work, by the year it shipped. Filter by field, hover a bar for the names.",
        id: "Dataset nyata yang kecil: semua yang tercantum di Karya, menurut tahun rilisnya. Saring per bidang, arahkan kursor ke batang untuk melihat namanya.",
      }}
    >
      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-3" role="group" aria-label={lang === "en" ? "Filter by field" : "Saring per bidang"}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            className="tab"
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

      <div className="relative mt-6 max-w-3xl">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H}`}
          className="block w-full"
          role="img"
          aria-label={lang === "en" ? "Bar chart of systems shipped per year" : "Diagram batang sistem rampung per tahun"}
        >
          {ticks.map((v) => (
            <g key={v}>
              <line x1={PAD.left} x2={CHART_W - PAD.right} y1={yFor(v)} y2={yFor(v)} strokeWidth="1" style={{ stroke: "var(--color-line)" }} />
              <text x={PAD.left - 8} y={yFor(v) + 4} textAnchor="end" fontSize="11" fontFamily="monospace" style={{ fill: "var(--color-dim)" }}>
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
                {h > 0 ? (
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={h}
                    opacity={hover === null || hover === i ? 1 : 0.35}
                    style={{ fill: "var(--color-accent)", transition: "opacity 0.2s ease" }}
                    tabIndex={0}
                    role="graphics-symbol"
                    aria-label={`${b.year}: ${b.count}`}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                  />
                ) : null}
                {b.count > 0 ? (
                  <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize="12" fontFamily="monospace" style={{ fill: "var(--color-fg)" }}>
                    {b.count}
                  </text>
                ) : null}
                <text x={x + barW / 2} y={CHART_H - 12} textAnchor="middle" fontSize="12" fontFamily="monospace" style={{ fill: "var(--color-mut)" }}>
                  {b.year}
                </text>
              </g>
            );
          })}
        </svg>

        {hover !== null && bars[hover] && bars[hover].count > 0 ? (
          <div
            className="pointer-events-none absolute z-10 max-w-[240px] border border-line bg-panel p-3 text-xs"
            style={{ left: `${((xFor(hover) + barW / 2) / CHART_W) * 100}%`, top: 0, transform: "translateX(-50%)" }}
            role="status"
          >
            <p className="mono text-accent">{bars[hover].year}</p>
            <ul className="mt-1 leading-relaxed text-mut">
              {bars[hover].items.map((it) => (
                <li key={it.title}>{it.title}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-mut" aria-live="polite">
        {lang === "en"
          ? `${total} systems in this view. Busiest year: ${topYear.year}, with ${topYear.count}.`
          : `${total} sistem dalam tampilan ini. Tahun tersibuk: ${topYear.year}, dengan ${topYear.count}.`}
      </p>

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

      <div className="mt-16">
        <p className="label">{lang === "en" ? "Four questions, four disciplines" : "Empat pertanyaan, empat disiplin"}</p>
        <dl className="mt-4 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {QUESTIONS.map((q) => (
            <div key={q.name} className="border-t border-line pt-4">
              <dt>
                <span className="text-sm text-dim">{q.name}</span>
                <p className="h-display mt-1 text-xl">{t(q.q)}</p>
              </dt>
              <dd className="prose-mut mt-2 text-sm">{t(q.a)}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
