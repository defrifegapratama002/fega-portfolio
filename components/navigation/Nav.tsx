"use client";

import { useEffect, useState } from "react";
import { useLang, type L10n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

/** Preview dot showing the accent of the theme you would switch TO. */
const THEME_PREVIEW: Record<string, { dot: string; label: string }> = {
  merah: { dot: "#7c3aed", label: "UNGU" },
  ungu: { dot: "#d21f2f", label: "MERAH" },
};

function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const target = THEME_PREVIEW[theme];
  return (
    <button
      type="button"
      onClick={toggle}
      className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-mut transition-colors hover:text-fg"
      aria-label={`Ganti tema ke ${target.label.toLowerCase()}`}
      title={`Tema: ${target.label.toLowerCase()}`}
    >
      <span
        className="inline-block h-2.5 w-2.5 rounded-full border border-line"
        style={{ background: target.dot }}
        aria-hidden="true"
      />
      {compact ? null : target.label}
    </button>
  );
}

const LINKS: { href: string; label: L10n }[] = [
  { href: "#ecosystem", label: { en: "Technology", id: "Teknologi" } },
  { href: "#projects", label: { en: "Work", id: "Karya" } },
  { href: "#knowledge", label: { en: "Knowledge", id: "Pengetahuan" } },
  { href: "#about", label: { en: "About", id: "Tentang" } },
  { href: "#contact", label: { en: "Contact", id: "Kontak" } },
];

/** Light floating navigation (blueprint §37). */
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <a href="#top" className="h-display text-sm tracking-widest" onClick={() => setOpen(false)}>
          DEFRI<span className="text-accent">·</span>FEGA
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs tracking-[0.14em] text-mut uppercase transition-colors hover:text-fg"
            >
              {t(l.label)}
            </a>
          ))}
          <a href="#contact" className="btn btn-solid !px-4 !py-2 text-[0.7rem]">
            {lang === "en" ? "LET'S TALK" : "AYO BICARA"}
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={toggle}
            className="font-mono text-xs tracking-widest text-mut transition-colors hover:text-accent"
            aria-label={lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
          >
            {lang === "en" ? "ID" : "EN"}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle compact />
          <button
            type="button"
            onClick={toggle}
            className="font-mono text-xs tracking-widest text-mut"
            aria-label={lang === "en" ? "Ganti ke Bahasa Indonesia" : "Switch to English"}
          >
            {lang === "en" ? "ID" : "EN"}
          </button>
          <button
            type="button"
            className="font-mono text-xs tracking-widest text-fg"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "CLOSE ✕" : "MENU ☰"}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="mobile-menu" className="border-t border-line px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-mono text-sm tracking-[0.14em] text-mut uppercase"
                  onClick={() => setOpen(false)}
                >
                  {t(l.label)}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="btn btn-solid" onClick={() => setOpen(false)}>
                {lang === "en" ? "LET'S TALK" : "AYO BICARA"}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
