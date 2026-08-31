"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Section from "@/components/ui/Section";
import Pipeline from "@/components/ui/Pipeline";
import { useLang } from "@/lib/i18n";

gsap.registerPlugin(useGSAP);

/**
 * Blueprint §18 — Mobile Development: "A digital solution in your hands."
 * An interactive device replaying the real conversation loop of the
 * AI English Speaking Tutor. Tilt it with your pointer.
 */

export default function MobileSection() {
  const { lang } = useLang();
  const phoneWrap = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0); // conversation replay index
  const maxStep = 4;

  // Conversation replay loop (static when reduced motion).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStep(maxStep);
      return;
    }
    const id = window.setInterval(() => {
      setStep((s) => (s >= maxStep ? 0 : s + 1));
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  // Pointer tilt (fine pointers, full motion only).
  useGSAP(
    (_ctx, contextSafe) => {
      const wrap = phoneWrap.current;
      const el = phone.current;
      if (!wrap || !el || !contextSafe) return;
      const media = window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
      if (!media.matches) return;

      const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power2.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power2.out" });

      const onMove = contextSafe((e: PointerEvent) => {
        const r = wrap.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * 18);
        rx(-py * 14);
      });
      const onLeave = contextSafe(() => {
        rx(0);
        ry(0);
      });

      wrap.addEventListener("pointermove", onMove);
      wrap.addEventListener("pointerleave", onLeave);
      return () => {
        wrap.removeEventListener("pointermove", onMove);
        wrap.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: phoneWrap },
  );

  const bubble = (visible: boolean) =>
    `transition-all duration-500 ${visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`;

  return (
    <Section
      id="tech-mobile"
      num="07"
      label={{ en: "Demonstration — Mobile Development", id: "Demonstrasi — Mobile Development" }}
      title={{
        en: "A digital solution in your hands.",
        id: "Solusi digital dalam genggaman Anda.",
      }}
      lede={{
        en: "This device is replaying the real loop of the AI English Speaking Tutor — speak, get understood, get corrected, hear the answer. Move your pointer over it.",
        id: "Perangkat ini memutar ulang loop asli AI English Speaking Tutor — bicara, dipahami, dikoreksi, dengar jawabannya. Gerakkan kursor Anda di atasnya.",
      }}
    >
      <div className="mt-14 grid items-center gap-10 md:grid-cols-2">
        {/* Interactive device */}
        <div ref={phoneWrap} className="flex justify-center" style={{ perspective: "1000px" }} data-reveal>
          <div
            ref={phone}
            className="w-[260px] rounded-[2rem] border border-line bg-panel p-3 shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="rounded-[1.5rem] bg-bg p-4">
              <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-line" aria-hidden="true" />
              <p className="font-mono text-[0.6rem] tracking-widest text-dim uppercase">SpeakEnglish · AI Tutor</p>

              <div className="mt-4 flex min-h-[280px] flex-col gap-3" aria-live="off">
                {/* AI greeting */}
                <div className={`max-w-[85%] rounded-xl rounded-tl-sm border border-line bg-panel2 px-3 py-2 text-xs text-mut ${bubble(step >= 1)}`}>
                  What did you do yesterday?
                </div>
                {/* User voice */}
                <div className={`ml-auto max-w-[85%] rounded-xl rounded-tr-sm bg-accent-dim px-3 py-2 ${bubble(step >= 2)}`}>
                  <span className="flex items-end gap-[3px]" aria-hidden="true">
                    {[10, 18, 26, 14, 22, 12, 8].map((h, i) => (
                      <span key={i} className="w-[3px] rounded-full bg-accent" style={{ height: `${h}px` }} />
                    ))}
                  </span>
                  <span className="mt-1 block text-xs text-fg">“I goed to school…”</span>
                </div>
                {/* Correction */}
                <div className={`max-w-[85%] rounded-lg border border-accent-dim bg-panel2 px-3 py-2 font-mono text-[0.65rem] text-accent ${bubble(step >= 3)}`}>
                  ## CORRECTION ## <span className="text-mut">I goed → </span>
                  <span className="text-fg">I went</span> ✓
                </div>
                {/* AI reply */}
                <div className={`max-w-[85%] rounded-xl rounded-tl-sm border border-line bg-panel2 px-3 py-2 text-xs text-mut ${bubble(step >= 4)}`}>
                  Nice — “I <em className="text-fg">went</em> to school.” What did you learn there? 🔊
                </div>
              </div>

              <p className="mt-3 border-t border-line pt-3 font-mono text-[0.55rem] tracking-widest text-dim uppercase">
                SPEAK → STT → LLM → TTS → REPEAT
              </p>
            </div>
          </div>
        </div>

        <div data-reveal>
          <div className="pipe">
            {["SMARTPHONE", "MOBILE APP", "API", "DATABASE", "AI / SERVICES"].map((s, i) => (
              <span key={s} className="contents">
                <span className="pipe-step is-on">{s}</span>
                {i < 4 ? <span className="pipe-arrow">→</span> : null}
              </span>
            ))}
          </div>
          <p className="prose-mut mt-8 text-sm">
            {lang === "en"
              ? "Shipped mobile work spans native Android (Kotlin + Jetpack Compose) and Flutter — including a signed, sold AI tutor with eight failover LLM providers, and an offline-first back office where money is integer rupiah and every sale is one atomic transaction."
              : "Karya mobile yang rampung mencakup Android native (Kotlin + Jetpack Compose) dan Flutter — termasuk tutor AI ter-sign yang dijual dengan delapan provider LLM failover, dan back office offline-first di mana uang adalah rupiah bulat dan setiap penjualan satu transaksi atomik."}
          </p>
          <p className="mt-6 font-mono text-xs tracking-wide text-dim">
            {lang === "en" ? "Proven by:" : "Dibuktikan oleh:"}{" "}
            <span className="text-mut">AI English Speaking Tutor · SupplierDaging · SpeakJapanese</span>
          </p>
        </div>
      </div>
    </Section>
  );
}
