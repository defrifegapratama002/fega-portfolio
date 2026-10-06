"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { useTheme, THEMES, THEME_META, type Theme } from "@/lib/theme";

function Swatch({ theme }: { theme: Theme }) {
  const [a, b] = THEME_META[theme].swatch;
  return (
    <span className="theme-swatch" aria-hidden="true">
      <i style={{ background: a }} />
      <i style={{ background: b }} />
    </span>
  );
}

/**
 * Theme picker: every theme is a visible choice (owner's brief), not a
 * blind cycle. `inline` lays the options out in a row for the mobile menu.
 */
export default function ThemePicker({ inline = false }: { inline?: boolean }) {
  const { lang } = useLang();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const options = THEMES.map((t) => {
    const active = t === theme;
    return (
      <button
        key={t}
        type="button"
        role="menuitemradio"
        aria-checked={active}
        onClick={() => {
          setTheme(t);
          setOpen(false);
        }}
        className={`flex items-center gap-3 px-3 py-2 text-left transition-colors ${
          inline ? "border border-line" : "w-full"
        } ${active ? "bg-panel2 text-fg" : "text-mut hover:bg-panel2 hover:text-fg"}`}
      >
        <Swatch theme={t} />
        <span className="flex flex-col">
          <span className="text-sm">{THEME_META[t].label}</span>
          {inline ? null : (
            <span className="text-xs text-dim">{THEME_META[t].mood[lang]}</span>
          )}
        </span>
        <span className={`ml-auto text-xs text-accent ${active ? "" : "invisible"}`} aria-hidden="true">
          ✓
        </span>
      </button>
    );
  });

  if (inline) {
    return (
      <div role="menu" aria-label={lang === "en" ? "Theme" : "Tema"} className="grid grid-cols-2 gap-2">
        {options}
      </div>
    );
  }

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={lang === "en" ? "Choose theme" : "Pilih tema"}
        className="flex items-center gap-2 text-sm text-mut transition-colors hover:text-fg"
      >
        <Swatch theme={theme} />
        {lang === "en" ? "Theme" : "Tema"}
        <span aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>

      {open ? (
        <div
          role="menu"
          aria-label={lang === "en" ? "Theme" : "Tema"}
          className="absolute top-full right-0 z-50 mt-3 w-56 border border-line bg-panel p-1 shadow-lg"
        >
          {options}
        </div>
      ) : null}
    </div>
  );
}
