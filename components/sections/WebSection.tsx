"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import { useLang } from "@/lib/i18n";

/**
 * Web chapter demo: the page measures itself in the visitor's browser.
 */

type Stats = {
  fps: number | null;
  loadMs: number | null;
  dpr: number;
  viewport: string;
  reducedMotion: boolean;
};

function useLiveStats(): Stats {
  const [stats, setStats] = useState<Stats>({ fps: null, loadMs: null, dpr: 1, viewport: "…", reducedMotion: false });

  useEffect(() => {
    let frames = 0;
    let rafId = 0;
    let last = performance.now();

    const loop = (now: number) => {
      frames++;
      if (now - last >= 1000) {
        const fps = Math.round((frames * 1000) / (now - last));
        frames = 0;
        last = now;
        setStats((s) => (s.fps === fps ? s : { ...s, fps }));
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;

    const update = () =>
      setStats((s) => ({
        ...s,
        loadMs: nav ? Math.round(nav.duration) : null,
        dpr: Math.round(window.devicePixelRatio * 100) / 100,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      }));
    update();
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", update);
    };
  }, []);

  return stats;
}

export default function WebSection() {
  const { lang } = useLang();
  const stats = useLiveStats();

  const rows: { label: string; value: string }[] = [
    { label: lang === "en" ? "Frames per second" : "Frame per detik", value: stats.fps === null ? "…" : String(stats.fps) },
    { label: lang === "en" ? "Page load" : "Muat halaman", value: stats.loadMs === null ? "…" : `${stats.loadMs} ms` },
    { label: "Viewport", value: stats.viewport },
    { label: lang === "en" ? "Pixel ratio" : "Rasio piksel", value: `${stats.dpr}×` },
    { label: lang === "en" ? "Reduced motion" : "Reduced motion", value: stats.reducedMotion ? (lang === "en" ? "on, respected" : "aktif, dihormati") : lang === "en" ? "off" : "nonaktif" },
  ];

  const layers = ["Browser", "Frontend", "API", "Backend", "Database", lang === "en" ? "AI and services" : "AI dan layanan"];

  return (
    <Section
      id="tech-web"
      label={{ en: "Web", id: "Web" }}
      title={{
        en: "This page is the web demo. It measures itself while you read.",
        id: "Halaman ini adalah demo web-nya. Ia mengukur dirinya sendiri saat Anda membaca.",
      }}
      lede={{
        en: "A static export with no tracking, served from GitHub Pages. The numbers below are measured in your browser right now, not typed in.",
        id: "Ekspor statis tanpa pelacakan, disajikan dari GitHub Pages. Angka di bawah diukur di browser Anda sekarang, bukan diketik.",
      }}
    >
      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
          {rows.map((r) => (
            <div key={r.label} className="border-t border-line pt-3">
              <dt className="text-xs text-dim">{r.label}</dt>
              <dd className="mono mt-1 text-lg">{r.value}</dd>
            </div>
          ))}
        </dl>

        <div>
          <p className="label">{lang === "en" ? "The layers a product sits on" : "Lapisan tempat sebuah produk berdiri"}</p>
          <ol className="mt-3 flex flex-col text-sm">
            {layers.map((layer, i) => (
              <li key={layer} className="flex gap-4 border-t border-line py-2">
                <span className="mono text-dim">{i + 1}</span>
                <span>{layer}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-mut">
            {lang === "en"
              ? "The same layers run the shipped products: Laravel and Filament for the ERP, Supabase for the PWA, Node for the tutor server."
              : "Lapisan yang sama menjalankan produk yang sudah rilis: Laravel dan Filament untuk ERP, Supabase untuk PWA, Node untuk server tutor."}
          </p>
        </div>
      </div>
    </Section>
  );
}
