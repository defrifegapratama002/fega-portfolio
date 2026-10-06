"use client";

import { useState } from "react";
import { contacts } from "@/data/brand";
import { useLang } from "@/lib/i18n";

export default function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contacts.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is visible anyway */
    }
  };

  const channels = [
    contacts.whatsapp ? { label: "WhatsApp", href: `https://wa.me/${contacts.whatsapp}` } : null,
    contacts.linkedin ? { label: "LinkedIn", href: contacts.linkedin } : null,
    { label: "GitHub", href: contacts.github },
  ].filter((c): c is { label: string; href: string } => Boolean(c));

  return (
    <>
      <section id="contact" className="mx-auto max-w-5xl px-5 py-24 sm:px-6 md:py-36">
        <p className="label">{lang === "en" ? "Contact" : "Kontak"}</p>
        <h2 className="h-display mt-3 max-w-3xl text-3xl md:text-[2.8rem]">
          {lang === "en"
            ? "If you have a problem that software might fix, write to me. Describe the work, not the technology."
            : "Kalau ada masalah yang mungkin bisa diselesaikan perangkat lunak, tulis ke saya. Ceritakan pekerjaannya, bukan teknologinya."}
        </h2>

        <p className="mt-10">
          <a
            href={`mailto:${contacts.email}?subject=${encodeURIComponent(lang === "en" ? "A problem to look at" : "Ada masalah yang ingin dibahas")}`}
            className="h-display link text-2xl break-all sm:text-3xl md:text-4xl"
          >
            {contacts.email}
          </a>
        </p>
        <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-mut">
          <button type="button" onClick={copyEmail} className="link" aria-live="polite">
            {copied ? (lang === "en" ? "Copied" : "Tersalin") : lang === "en" ? "Copy address" : "Salin alamat"}
          </button>
          {channels.map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="link">
              {c.label}
            </a>
          ))}
        </p>
        <p className="mt-8 text-sm text-dim">
          {lang === "en" ? "Indonesia, UTC+7. I reply in English or Indonesian." : "Indonesia, UTC+7. Saya membalas dalam bahasa Indonesia atau Inggris."}
        </p>
      </section>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-xs text-dim sm:px-6">
          <span>
            © {new Date().getFullYear()} Defri Fega Pratama
          </span>
          <span>
            {lang === "en" ? "Built by hand with Next.js. " : "Dibuat sendiri dengan Next.js. "}
            <a href="https://github.com/defrifegapratama002/fega-portfolio" className="link" target="_blank" rel="noopener noreferrer">
              {lang === "en" ? "Source" : "Kode sumber"}
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
