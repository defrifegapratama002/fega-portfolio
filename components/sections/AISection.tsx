"use client";

import { useRef, useState } from "react";
import Section from "@/components/ui/Section";
import { technologies } from "@/data/technologies";
import { useLang } from "@/lib/i18n";

/**
 * AI chapter demo: a small keyword router. Type a problem, it says which
 * fields usually apply. It is not a language model and the caption says so.
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

type Match = { key: string; name: string; hits: string[] };

function routeProblem(input: string): Match[] {
  const text = ` ${input.toLowerCase()} `;
  return technologies
    .map((tech) => ({ key: tech.key, name: tech.name, hits: (SIGNALS[tech.key] ?? []).filter((kw) => text.includes(kw)) }))
    .filter((m) => m.hits.length > 0)
    .sort((a, b) => b.hits.length - a.hits.length)
    .slice(0, 3);
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
  const { lang } = useLang();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Match[] | null>(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<number | null>(null);

  const run = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    if (timer.current) window.clearTimeout(timer.current);
    const res = routeProblem(clean);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setResult(res);
      return;
    }
    setBusy(true);
    setResult(null);
    timer.current = window.setTimeout(() => {
      setBusy(false);
      setResult(res);
    }, 600);
  };

  return (
    <Section
      id="tech-ai"
      label={{ en: "AI · try it", id: "AI · coba" }}
      title={{
        en: "Describe a problem. This routes it to the fields that usually apply.",
        id: "Tulis sebuah masalah. Ini mengarahkannya ke bidang yang biasanya terlibat.",
      }}
      lede={{
        en: "It is the first step I take on every project, done here by a small keyword list that runs in your browser. Not a language model; the shipped products use real ones.",
        id: "Ini langkah pertama saya di setiap proyek, di sini dikerjakan oleh daftar kata kunci kecil yang jalan di browser Anda. Bukan model bahasa; produk yang sudah rilis memakai model sungguhan.",
      }}
    >
      <form
        className="mt-10 flex flex-col gap-3 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          run(input);
        }}
      >
        <label className="sr-only" htmlFor="ai-demo-input">
          {lang === "en" ? "Describe your problem" : "Tulis masalah Anda"}
        </label>
        <input
          id="ai-demo-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={lang === "en" ? "e.g. sales are recorded on paper and…" : "mis. penjualan dicatat di kertas dan…"}
          className="input"
        />
        <button type="submit" className="btn btn-solid shrink-0">
          {lang === "en" ? "Route" : "Arahkan"}
        </button>
      </form>

      <p className="mt-3 text-sm text-dim">
        {lang === "en" ? "Or try: " : "Atau coba: "}
        {EXAMPLES[lang].map((ex, i) => (
          <span key={ex}>
            <button
              type="button"
              className="link text-left"
              onClick={() => {
                setInput(ex);
                run(ex);
              }}
            >
              {ex}
            </button>
            {i < EXAMPLES[lang].length - 1 ? " · " : ""}
          </span>
        ))}
      </p>

      <div className="mt-8 min-h-[4rem] border-t border-line pt-6" aria-live="polite">
        {busy ? <p className="text-sm text-dim">{lang === "en" ? "Reading…" : "Membaca…"}</p> : null}
        {result && result.length === 0 ? (
          <p className="prose-mut text-sm">
            {lang === "en"
              ? "No clear signal. That happens; it means the conversation comes before the stack."
              : "Tidak ada sinyal yang jelas. Itu wajar; artinya percakapan datang lebih dulu daripada stack."}
          </p>
        ) : null}
        {result && result.length > 0 ? (
          <ol className="flex flex-col gap-2">
            {result.map((m, i) => (
              <li key={m.key} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
                <span className="text-dim">{i === 0 ? (lang === "en" ? "mainly" : "utamanya") : lang === "en" ? "with" : "dengan"}</span>
                <span className="font-medium text-fg">{m.name}</span>
                <span className="mono text-dim">
                  {lang === "en" ? "matched:" : "cocok:"} {m.hits.join(", ")}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </Section>
  );
}
