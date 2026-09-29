"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projects } from "@/data/projects";
import { useLang, type L10n } from "@/lib/i18n";
import { useTheme, THEMES } from "@/lib/theme";

/**
 * Command palette (Ctrl/⌘ + K, or "/"): the whole site from the keyboard —
 * sections, case studies, theme, language, contact.
 * Open it from anywhere with `window.dispatchEvent(new Event(PALETTE_EVENT))`.
 */

export const PALETTE_EVENT = "fega:palette";

const EMAIL = "defrifegapratama002@gmail.com";
const GITHUB = "https://github.com/defrifegapratama002";

const SECTIONS: { href: string; label: L10n }[] = [
  { href: "#top", label: { en: "Home", id: "Beranda" } },
  { href: "#ecosystem", label: { en: "Technology ecosystem", id: "Ekosistem teknologi" } },
  { href: "#projects", label: { en: "Work — case studies", id: "Karya — studi kasus" } },
  { href: "#knowledge", label: { en: "Knowledge", id: "Pengetahuan" } },
  { href: "#about", label: { en: "About", id: "Tentang" } },
  { href: "#consult", label: { en: "Consult", id: "Konsultasi" } },
  { href: "#contact", label: { en: "Contact", id: "Kontak" } },
];

type Command = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

function goTo(hash: string) {
  history.replaceState(null, "", hash);
  // Case-study anchors are handled by Projects (it clears its filter first).
  window.dispatchEvent(new HashChangeEvent("hashchange"));
  if (!hash.startsWith("#project-")) document.querySelector(hash)?.scrollIntoView({ block: "start" });
}

export default function CommandPalette() {
  const { lang, toggle: toggleLang, t } = useLang();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    lastFocus.current?.focus();
  }, []);

  const commands = useMemo<Command[]>(() => {
    const en = lang === "en";
    const go = en ? "Go to" : "Buka";
    const work = en ? "Case study" : "Studi kasus";
    const action = en ? "Action" : "Aksi";
    return [
      ...SECTIONS.map((s) => ({
        id: s.href,
        group: go,
        label: t(s.label),
        hint: s.href,
        run: () => goTo(s.href),
      })),
      ...projects
        .filter((p) => p.featured)
        .map((p) => ({
          id: p.slug,
          group: work,
          label: p.title,
          hint: p.technologies.slice(0, 3).join(" · "),
          run: () => goTo(`#project-${p.slug}`),
        })),
      ...THEMES.filter((th) => th !== theme).map((th) => ({
        id: `theme-${th}`,
        group: action,
        label: `${en ? "Theme" : "Tema"}: ${th}`,
        run: () => setTheme(th),
      })),
      {
        id: "lang",
        group: action,
        label: en ? "Ganti ke Bahasa Indonesia" : "Switch to English",
        run: toggleLang,
      },
      {
        id: "email",
        group: action,
        label: en ? "Copy email address" : "Salin alamat email",
        hint: EMAIL,
        run: () => void navigator.clipboard?.writeText(EMAIL).catch(() => {}),
      },
      {
        id: "github",
        group: action,
        label: en ? "Open GitHub" : "Buka GitHub",
        hint: "↗",
        run: () => window.open(GITHUB, "_blank", "noopener,noreferrer"),
      },
    ];
  }, [lang, t, theme, setTheme, toggleLang]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    const show = () => {
      lastFocus.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing = !!target?.closest?.("input, textarea, select, [contenteditable]");
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        show();
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(PALETTE_EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(PALETTE_EVENT, show);
    };
  }, []);

  useEffect(() => {
    if (open) input.current?.focus();
  }, [open]);

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const run = (c: Command | undefined) => {
    if (!c) return;
    setOpen(false);
    c.run();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[active]);
    } else if (e.key === "Tab") {
      // Focus stays inside the dialog.
      e.preventDefault();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-deep/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={lang === "en" ? "Command palette" : "Palet perintah"}
        className="win w-full max-w-xl shadow-2xl"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-line px-4 py-3">
          <span className="font-mono text-sm text-accent" aria-hidden="true">
            &gt;
          </span>
          <input
            ref={input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder={lang === "en" ? "Type a command or search…" : "Ketik perintah atau cari…"}
            className="palette-input w-full bg-transparent font-mono text-sm text-fg outline-none placeholder:text-dim"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="kbd">Esc</kbd>
        </div>

        <ul ref={list} id="palette-list" role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center font-mono text-xs text-dim">
              {lang === "en" ? "No matching command." : "Tidak ada perintah yang cocok."}
            </li>
          ) : (
            results.map((c, i) => (
              <li
                key={c.id}
                id={`cmd-${c.id}`}
                role="option"
                aria-selected={i === active}
                className={`flex cursor-pointer items-baseline gap-3 rounded-md px-3 py-2 ${
                  i === active ? "bg-fg text-bg" : "text-fg"
                }`}
                onMouseMove={() => setActive(i)}
                onClick={() => run(c)}
              >
                <span className="w-24 shrink-0 font-mono text-[0.62rem] tracking-widest uppercase opacity-60">
                  {c.group}
                </span>
                <span className="text-sm">{c.label}</span>
                {c.hint ? (
                  <span className="ml-auto hidden truncate font-mono text-[0.65rem] opacity-60 sm:block">
                    {c.hint}
                  </span>
                ) : null}
              </li>
            ))
          )}
        </ul>

        <div className="flex items-center gap-4 border-t border-line px-4 py-2 font-mono text-[0.62rem] text-dim">
          <span>
            <kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> {lang === "en" ? "move" : "pindah"}
          </span>
          <span>
            <kbd className="kbd">Enter</kbd> {lang === "en" ? "run" : "jalankan"}
          </span>
        </div>
      </div>
    </div>
  );
}
