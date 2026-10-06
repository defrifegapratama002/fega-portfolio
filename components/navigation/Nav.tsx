"use client";

import { useEffect, useState } from "react";
import { useLang, type L10n } from "@/lib/i18n";
import ThemePicker from "@/components/navigation/ThemePicker";
import { contacts } from "@/data/brand";

const LINKS: { href: string; label: L10n }[] = [
  { href: "#projects", label: { en: "Work", id: "Karya" } },
  { href: "#lab", label: { en: "Lab", id: "Lab" } },
  { href: "#about", label: { en: "About", id: "Tentang" } },
  { href: "#contact", label: { en: "Contact", id: "Kontak" } },
];

export default function Nav() {
  const { lang, toggle, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const langButton = (
    <button
      type="button"
      onClick={toggle}
      className="text-sm text-mut transition-colors hover:text-fg"
      aria-label={lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
    >
      {lang === "en" ? "ID" : "EN"}
    </button>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-bg/90 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 sm:px-6" aria-label="Main">
        <a href="#top" className="h-display text-lg" onClick={() => setOpen(false)}>
          Defri Fega
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-mut transition-colors hover:text-fg">
              {t(l.label)}
            </a>
          ))}
          <a href={`mailto:${contacts.email}`} className="link text-sm">
            {contacts.email}
          </a>
          <ThemePicker />
          {langButton}
        </div>

        <div className="flex items-center gap-5 md:hidden">
          {langButton}
          <button
            type="button"
            className="text-sm text-fg"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (lang === "en" ? "Close" : "Tutup") : "Menu"}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line px-5 py-5 md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="h-display text-2xl" onClick={() => setOpen(false)}>
                  {t(l.label)}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contacts.email}`} className="link text-sm">
                {contacts.email}
              </a>
            </li>
            <li className="pt-2">
              <p className="label mb-2">{lang === "en" ? "Theme" : "Tema"}</p>
              <ThemePicker inline />
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
