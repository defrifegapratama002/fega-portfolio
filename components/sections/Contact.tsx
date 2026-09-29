"use client";

import { useState } from "react";
import Magnetic from "@/components/ui/Magnetic";
import { useLang } from "@/lib/i18n";

const EMAIL = "defrifegapratama002@gmail.com";
const GITHUB = "https://github.com/defrifegapratama002";

/** Blueprint §31 — Contact: "Have a problem worth solving?" */
export default function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = EMAIL;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <section id="contact" className="mx-auto max-w-6xl px-6 py-32 text-center md:py-44">
        <p className="kicker kicker-2" data-reveal>
          16 · {lang === "en" ? "The invitation" : "Undangan"}
        </p>
        <h2 className="h-display mt-6 text-4xl md:text-6xl" data-reveal>
          {lang === "en" ? (
            <>
              Have a problem <span className="text-accent">worth solving?</span>
            </>
          ) : (
            <>
              Punya masalah yang <span className="text-accent">layak diselesaikan?</span>
            </>
          )}
        </h2>
        <p className="prose-mut mx-auto mt-6 text-lg" data-reveal>
          {lang === "en" ? "Let's turn it into a system." : "Mari kita ubah menjadi sebuah sistem."}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4" data-reveal>
          <Magnetic>
            <a href={`mailto:${EMAIL}?subject=A%20problem%20worth%20solving`} className="btn btn-solid">
              {lang === "en" ? "START A CONVERSATION" : "MULAI PERCAKAPAN"}
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#projects" className="btn btn-line">
              {lang === "en" ? "EXPLORE MY WORK" : "JELAJAHI KARYA SAYA"}
            </a>
          </Magnetic>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 font-mono text-xs text-mut" data-reveal>
          <button type="button" onClick={copyEmail} className="tracking-wide hover:text-accent" aria-live="polite">
            {copied
              ? lang === "en" ? "COPIED ✓" : "TERSALIN ✓"
              : `${EMAIL} — ${lang === "en" ? "click to copy" : "klik untuk salin"}`}
          </button>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="tracking-wide hover:text-accent">
            GITHUB ↗
          </a>
        </div>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-8 font-mono text-[0.68rem] tracking-wide text-dim">
          <span>© {new Date().getFullYear()} DEFRI FEGA PRATAMA</span>
          <span>
            {lang === "en"
              ? "This site is itself a case study — Next.js · React Three Fiber · GSAP"
              : "Situs ini adalah studi kasusnya sendiri — Next.js · React Three Fiber · GSAP"}
          </span>
        </div>
      </footer>
    </>
  );
}
