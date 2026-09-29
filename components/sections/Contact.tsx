"use client";

import { useState } from "react";
import Magnetic from "@/components/ui/Magnetic";
import { contacts } from "@/data/brand";
import { useLang } from "@/lib/i18n";

/** Specification §24 — Contact: "Have a problem worth solving?" */
export default function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contacts.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = contacts.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  // Only channels that are filled in are shown.
  const channels = [
    { label: "EMAIL", href: `mailto:${contacts.email}?subject=A%20problem%20worth%20solving` },
    contacts.whatsapp ? { label: "WHATSAPP", href: `https://wa.me/${contacts.whatsapp}` } : null,
    contacts.linkedin ? { label: "LINKEDIN", href: contacts.linkedin } : null,
    { label: "GITHUB", href: contacts.github },
  ].filter((c): c is { label: string; href: string } => Boolean(c));

  return (
    <>
      <section id="contact" className="mx-auto max-w-6xl px-6 py-32 text-center md:py-44">
        <p className="kicker" data-reveal>
          17 · {lang === "en" ? "The invitation" : "Undangan"}
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
          {lang === "en" ? "Let's explore what technology can do." : "Mari kita lihat apa yang bisa dilakukan teknologi."}
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3" data-reveal>
          {channels.map((c, i) => (
            <Magnetic key={c.label}>
              <a
                href={c.href}
                className={`btn ${i === 0 ? "btn-solid" : "btn-line"}`}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {c.label}
                {c.href.startsWith("http") ? <span aria-hidden="true">↗</span> : null}
              </a>
            </Magnetic>
          ))}
        </div>

        <div className="mt-8 font-mono text-xs text-mut" data-reveal>
          <button type="button" onClick={copyEmail} className="tracking-wide hover:text-accent" aria-live="polite">
            {copied
              ? lang === "en" ? "COPIED ✓" : "TERSALIN ✓"
              : `${contacts.email} — ${lang === "en" ? "click to copy" : "klik untuk salin"}`}
          </button>
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
