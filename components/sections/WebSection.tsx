"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import { useLang } from "@/lib/i18n";

/**
 * Blueprint §14–15 — Web Development & UI/UX. The demonstration is the
 * site itself: live runtime telemetry measured in the visitor's browser,
 * plus the layered architecture every real product of mine sits on.
 */

type Stats = {
  fps: number | null;
  loadMs: number | null;
  dpr: number;
  viewport: string;
  reducedMotion: boolean;
  webgl: boolean;
};

function useLiveStats(): Stats {
  const [stats, setStats] = useState<Stats>({
    fps: null,
    loadMs: null,
    dpr: 1,
    viewport: "…",
    reducedMotion: false,
    webgl: false,
  });

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

    const nav = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    let webgl = false;
    try {
      const canvas = document.createElement("canvas");
      webgl = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    } catch {
      webgl = false;
    }

    const update = () =>
      setStats((s) => ({
        ...s,
        loadMs: nav ? Math.round(nav.duration) : null,
        dpr: Math.round(window.devicePixelRatio * 100) / 100,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        webgl,
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

const LAYERS = ["USER", "FRONTEND", "API", "BACKEND", "DATABASE", "AI / SERVICES"];

export default function WebSection() {
  const { lang } = useLang();
  const stats = useLiveStats();

  const rows: { label: string; value: string }[] = [
    { label: "FPS", value: stats.fps === null ? "…" : String(stats.fps) },
    {
      label: lang === "en" ? "PAGE LOAD" : "MUAT HALAMAN",
      value: stats.loadMs === null ? "…" : `${stats.loadMs} ms`,
    },
    { label: "VIEWPORT", value: stats.viewport },
    { label: "PIXEL RATIO", value: `${stats.dpr}×` },
    { label: "WEBGL", value: stats.webgl ? "ACTIVE" : "OFF" },
    {
      label: "REDUCED MOTION",
      value: stats.reducedMotion ? "ON — RESPECTED" : "OFF",
    },
  ];

  return (
    <Section
      id="tech-web"
      num="07"
      label={{ en: "Demonstration — Web Development & UI/UX", id: "Demonstrasi — Web Development & UI/UX" }}
      title={{
        en: "You are currently experiencing one of my web development projects.",
        id: "Anda sedang mengalami salah satu project web development saya.",
      }}
      lede={{
        en: "This site is the demo: responsive layout, real-time 3D, scroll-driven motion, accessibility, performance. If you understood this page without thinking about the interface — the UX is doing its job.",
        id: "Situs ini adalah demonya: layout responsif, 3D real-time, motion berbasis scroll, aksesibilitas, performa. Jika Anda memahami halaman ini tanpa memikirkan interface-nya — UX-nya sedang bekerja.",
      }}
    >
      <div className="mt-14 grid items-start gap-8 lg:grid-cols-2">
        {/* Live telemetry — measured right now, in this browser */}
        <div className="card p-7" data-reveal>
          <p className="kicker">{lang === "en" ? "Live — measured in your browser" : "Live — diukur di browser Anda"}</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 font-mono">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="text-[0.62rem] tracking-widest text-dim">{r.label}</dt>
                <dd className="mt-1 text-lg text-fg">{r.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 font-mono text-[0.65rem] leading-relaxed tracking-wide text-dim">
            {lang === "en"
              ? "Nothing here is mocked — these numbers are being measured as you read. One WebGL canvas, paused when offscreen; motion disabled when you ask for it."
              : "Tidak ada yang dipalsukan — angka-angka ini diukur saat Anda membaca. Satu canvas WebGL, dijeda saat tak terlihat; motion dimatikan saat Anda memintanya."}
          </p>
        </div>

        {/* Layered architecture */}
        <div className="card group p-7" data-reveal>
          <p className="kicker">{lang === "en" ? "The architecture underneath" : "Arsitektur di baliknya"}</p>
          <div className="mt-6 flex flex-col gap-2" style={{ perspective: "800px" }}>
            {LAYERS.map((layer, i) => (
              <div
                key={layer}
                className="rounded-lg border border-line bg-panel2 px-5 py-3 font-mono text-xs tracking-widest text-mut transition-all duration-500 group-hover:border-accent-dim group-hover:text-fg"
                style={{
                  transform: `translateX(${i * 4}px)`,
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <span className="mr-3 text-dim">{String(i + 1).padStart(2, "0")}</span>
                {layer}
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-[0.65rem] leading-relaxed tracking-wide text-dim">
            {lang === "en"
              ? "The same layers run my shipped products — Laravel/Filament ERPs, Supabase PWAs, Node servers, LLM services."
              : "Lapisan yang sama menjalankan produk-produk saya — ERP Laravel/Filament, PWA Supabase, server Node, layanan LLM."}
          </p>
        </div>
      </div>

      <p className="mt-8 font-mono text-xs tracking-wide text-dim" data-reveal>
        {lang === "en" ? "Proven by:" : "Dibuktikan oleh:"}{" "}
        <span className="text-mut">This website · ZONZON × zonzon.shop · ITSFR Platform · GalonHarmoni</span>
      </p>
    </Section>
  );
}
