"use client";

import { useMemo, useRef, useState } from "react";
import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { technologies } from "@/data/technologies";
import { useLang } from "@/lib/i18n";

/**
 * Blueprint §10 — Artificial Intelligence, with a mini interactive AI
 * experience: a deliberately tiny in-browser "problem router" that
 * demonstrates the input → understanding → decision → output pipeline.
 * Honest by design: the caption says exactly what it is (§47).
 */

const SIGNALS: Record<string, string[]> = {
  ai: ["chat", "assistant", "asisten", "speak", "voice", "suara", "bicara", "predict", "recommend", "rekomendasi", "llm", "tutor", "answer", "jawab", "smart", "cerdas"],
  vision: ["image", "gambar", "photo", "foto", "camera", "kamera", "scan", "ocr", "detect", "deteksi", "document", "dokumen", "visual"],
  "data-analytics": ["report", "laporan", "dashboard", "excel", "spreadsheet", "insight", "chart", "grafik", "trend", "tren", "analytics", "analisis", "data"],
  "data-science": ["forecast", "peramalan", "model", "pattern", "pola", "prediksi", "prediction", "classify", "klasifikasi", "sentiment", "sentimen", "machine learning"],
  web: ["website", "web", "landing", "e-commerce", "shop", "toko", "online", "seo", "portal", "browser"],
  mobile: ["app", "aplikasi", "mobile", "android", "phone", "hp", "ponsel", "offline", "apk", "tablet"],
  automation: ["manual", "repetitive", "berulang", "automation", "otomasi", "workflow", "invoice", "faktur", "stock", "stok", "inventory", "inventori", "erp", "pos", "kasir", "warehouse", "gudang", "follow-up", "spreadsheet"],
};

type RouteResult = {
  matches: { key: string; name: string; hits: string[] }[];
  none: boolean;
};

function routeProblem(input: string): RouteResult {
  const text = ` ${input.toLowerCase()} `;
  const matches = technologies
    .map((tech) => {
      const hits = (SIGNALS[tech.key] ?? []).filter((kw) => text.includes(kw));
      return { key: tech.key, name: tech.name, hits };
    })
    .filter((m) => m.hits.length > 0)
    .sort((a, b) => b.hits.length - a.hits.length)
    .slice(0, 3);
  return { matches, none: matches.length === 0 };
}

const EXAMPLES = {
  en: [
    "Our warehouse stock is tracked in Excel and always wrong",
    "I want an app that helps students practice speaking",
    "We have thousands of reviews and no idea what customers feel",
  ],
  id: [
    "Stok gudang kami dicatat di Excel dan selalu meleset",
    "Saya ingin aplikasi yang membantu siswa latihan berbicara",
    "Kami punya ribuan ulasan dan tak tahu apa yang dirasakan pelanggan",
  ],
};

export default function AISection() {
  const { lang, t } = useLang();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<RouteResult | null>(null);
  const [stage, setStage] = useState(0); // 0 idle · 1..3 processing stages · 4 done
  const timeouts = useRef<number[]>([]);
  const tech = useMemo(() => technologies.find((x) => x.key === "ai")!, []);

  const run = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    const res = routeProblem(clean);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(4);
      setResult(res);
      return;
    }
    setResult(null);
    setStage(1);
    timeouts.current.push(
      window.setTimeout(() => setStage(2), 350),
      window.setTimeout(() => setStage(3), 700),
      window.setTimeout(() => {
        setStage(4);
        setResult(res);
      }, 1050),
    );
  };

  const stages =
    lang === "en"
      ? ["INPUT", "UNDERSTANDING", "DECISION", "OUTPUT"]
      : ["INPUT", "PEMAHAMAN", "KEPUTUSAN", "OUTPUT"];

  return (
    <Section
      id="tech-ai"
      num="04"
      label={{ en: "Demonstration — Artificial Intelligence", id: "Demonstrasi — Artificial Intelligence" }}
      title={{
        en: "Systems that understand, decide, and assist.",
        id: "Sistem yang memahami, memutuskan, dan membantu.",
      }}
      lede={tech.description}
    >
      <div className="mt-10 flex flex-wrap gap-2" data-reveal>
        {tech.areas.map((a) => (
          <span key={a} className="chip">
            {a}
          </span>
        ))}
      </div>

      <div className="mt-12" data-reveal>
        <Pipeline steps={["USER", "INPUT", "AI MODEL", "UNDERSTANDING", "DECISION", "OUTPUT"]} />
      </div>

      {/* Interactive demo */}
      <div className="card mt-14 p-7 md:p-9" data-reveal>
        <p className="kicker">{lang === "en" ? "Try it — the problem router" : "Coba — router masalah"}</p>
        <p className="prose-mut mt-3 text-sm">
          {lang === "en"
            ? "Describe a problem. A tiny model routes it to the technologies it likely needs — the same first step I take on every project."
            : "Deskripsikan sebuah masalah. Sebuah model kecil mengarahkannya ke teknologi yang kemungkinan dibutuhkan — langkah pertama yang sama yang saya ambil di setiap project."}
        </p>

        <form
          className="mt-6 flex flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
          }}
        >
          <label className="sr-only" htmlFor="ai-demo-input">
            {lang === "en" ? "Describe your problem" : "Deskripsikan masalah Anda"}
          </label>
          <input
            id="ai-demo-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              lang === "en" ? "e.g. sales are recorded on paper and…" : "mis. penjualan dicatat di kertas dan…"
            }
            className="w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-fg placeholder:text-dim focus:border-accent focus:outline-none"
          />
          <button type="submit" className="btn btn-solid shrink-0">
            {lang === "en" ? "ROUTE IT →" : "ARAHKAN →"}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES[lang].map((ex) => (
            <button
              key={ex}
              type="button"
              className="chip !whitespace-normal text-left transition-colors hover:border-accent hover:text-fg"
              onClick={() => {
                setInput(ex);
                run(ex);
              }}
            >
              {ex}
            </button>
          ))}
        </div>

        {stage > 0 ? (
          <div className="mt-8 border-t border-line pt-6">
            <div className="pipe" aria-hidden="true">
              {stages.map((s, i) => (
                <span key={s} className="contents">
                  <span className={`pipe-step ${stage > i ? "is-on" : ""}`}>{s}</span>
                  {i < stages.length - 1 ? <span className="pipe-arrow">→</span> : null}
                </span>
              ))}
            </div>

            {stage === 4 && result ? (
              <div className="mt-6" aria-live="polite">
                {result.none ? (
                  <p className="text-sm text-mut">
                    {lang === "en"
                      ? "No strong technology signal — and that's a valid decision too: this problem starts with a conversation, not a stack."
                      : "Tidak ada sinyal teknologi yang kuat — dan itu pun keputusan yang valid: masalah ini dimulai dengan percakapan, bukan dengan stack."}
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {result.matches.map((m, i) => (
                      <li key={m.key} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className={`font-mono text-xs ${i === 0 ? "text-accent" : "text-accent2"}`}>
                          {i === 0 ? "PRIMARY" : "COMBINE"}
                        </span>
                        <span className="text-sm font-medium text-fg">{m.name}</span>
                        <span className="font-mono text-[0.65rem] text-dim">
                          {lang === "en" ? "signals:" : "sinyal:"} {m.hits.join(", ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : null}
          </div>
        ) : null}

        <p className="mt-8 font-mono text-[0.65rem] leading-relaxed tracking-wide text-dim">
          {lang === "en"
            ? "HONEST LABEL — a deliberately tiny keyword model running entirely in your browser. The point is the pipeline shape, not the model size. The shipped products below use real LLMs with streaming and failover."
            : "LABEL JUJUR — model kata kunci yang sengaja dibuat kecil, berjalan sepenuhnya di browser Anda. Intinya adalah bentuk pipeline-nya, bukan ukuran modelnya. Produk rampung di bawah memakai LLM sungguhan dengan streaming dan failover."}
        </p>
      </div>

      <p className="mt-8 font-mono text-xs tracking-wide text-dim" data-reveal>
        {lang === "en" ? "Proven by:" : "Dibuktikan oleh:"}{" "}
        <span className="text-mut">{tech.projects.join(" · ")}</span>
      </p>
    </Section>
  );
}
