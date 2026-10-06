"use client";

import { useEffect, useState } from "react";
import Section from "@/components/ui/Section";
import { useLang } from "@/lib/i18n";

/**
 * Mobile chapter demo: a phone replaying the conversation loop of the
 * AI English Speaking Tutor. The replay is staged; the app is real.
 */
export default function MobileSection() {
  const { lang } = useLang();
  const [step, setStep] = useState(0);
  const maxStep = 4;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(maxStep);
      return;
    }
    const id = window.setInterval(() => setStep((s) => (s >= maxStep ? 0 : s + 1)), 1400);
    return () => window.clearInterval(id);
  }, []);

  const bubble = (visible: boolean) => `transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`;

  return (
    <Section
      id="tech-mobile"
      label={{ en: "Mobile", id: "Mobile" }}
      title={{
        en: "One conversation turn of the English tutor, replayed.",
        id: "Satu giliran percakapan tutor bahasa Inggris, diputar ulang.",
      }}
      lede={{
        en: "The app listens, understands, corrects the grammar, and answers out loud. This replay is staged from a real session; the app itself is sold and in use.",
        id: "Aplikasinya mendengar, memahami, mengoreksi tata bahasa, dan menjawab dengan suara. Putar ulang ini disusun dari sesi nyata; aplikasinya sendiri dijual dan dipakai.",
      }}
    >
      <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
        <div className="flex justify-center md:justify-start">
          <div className="w-[260px] border border-line bg-panel p-3" style={{ borderRadius: "1.6rem" }}>
            <div className="bg-bg p-4" style={{ borderRadius: "1.1rem" }}>
              <p className="text-[0.65rem] text-dim">SpeakEnglish</p>
              <div className="mt-4 flex min-h-[280px] flex-col gap-3" aria-live="off">
                <div className={`max-w-[85%] rounded-xl rounded-tl-sm border border-line bg-panel2 px-3 py-2 text-xs text-mut ${bubble(step >= 1)}`}>
                  What did you do yesterday?
                </div>
                <div className={`ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-accent-dim px-3 py-2 ${bubble(step >= 2)}`}>
                  <span className="flex items-end gap-[3px]" aria-hidden="true">
                    {[10, 18, 26, 14, 22, 12, 8].map((h, i) => (
                      <span key={i} className="w-[3px] bg-accent" style={{ height: `${h}px` }} />
                    ))}
                  </span>
                  <span className="mt-1 block text-xs text-fg">“I goed to school…”</span>
                </div>
                <div className={`max-w-[85%] border border-accent-dim bg-panel2 px-3 py-2 text-[0.7rem] text-accent ${bubble(step >= 3)}`}>
                  <span className="text-mut">I goed → </span>
                  <span className="text-fg">I went</span>
                </div>
                <div className={`max-w-[85%] rounded-xl rounded-tl-sm border border-line bg-panel2 px-3 py-2 text-xs text-mut ${bubble(step >= 4)}`}>
                  Nice. “I <em className="text-fg">went</em> to school.” What did you learn there?
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="prose-mut text-sm md:text-base">
          <p>
            {lang === "en"
              ? "Shipped mobile work so far: native Android with Kotlin and Jetpack Compose (the tutor, with eight failover LLM providers behind it) and Flutter (the offline back office where money is integer rupiah and every sale is one atomic transaction)."
              : "Karya mobile yang sudah rilis: Android native dengan Kotlin dan Jetpack Compose (tutor, dengan delapan provider LLM failover di belakangnya) dan Flutter (back office offline yang uangnya rupiah bulat dan setiap penjualannya satu transaksi atomik)."}
          </p>
          <p className="mt-4 text-sm">
            <a href="#project-speakenglish" className="link">
              AI English Speaking Tutor
            </a>
            {" · "}
            <a href="#project-supplierdaging" className="link">
              SupplierDaging
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
