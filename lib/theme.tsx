"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

/**
 * Site themes (owner's brief) — every one is a choice in the picker:
 *  - "merah":  merah-putih-hitam — white ground, black ink, red accent. (default)
 *  - "gelap":  malam — near-black ground, off-white ink, one strong red accent.
 *  - "ungu":   editorial poster — paper ground, black ink, purple + cyan accents.
 *  - "hijau":  alam — washi-paper ground, ink, matcha-green accent, vermilion
 *              co-accent, with a quiet Japanese wave pattern in the background.
 * The active theme lives on <html data-theme="..."> so every CSS token,
 * SVG, chart and the 3D core follow it.
 *
 * Adding a theme: a token block in app/globals.css, an entry here, and the
 * name in the pre-hydration script in app/layout.tsx.
 */

export const THEMES = ["merah", "gelap", "ungu", "hijau"] as const;

export type Theme = (typeof THEMES)[number];

/** What the picker shows: a name, a one-line mood, and the two colours that define it. */
export const THEME_META: Record<Theme, { label: string; mood: { en: string; id: string }; swatch: [string, string] }> = {
  merah: { label: "Merah", mood: { en: "White · red · black", id: "Putih · merah · hitam" }, swatch: ["#f8f6f4", "#d21f2f"] },
  gelap: { label: "Gelap", mood: { en: "Night · red", id: "Malam · merah" }, swatch: ["#0f1012", "#ff4b55"] },
  ungu: { label: "Ungu", mood: { en: "Purple · cyan", id: "Ungu · cyan" }, swatch: ["#7c3aed", "#2385cc"] },
  hijau: { label: "Hijau", mood: { en: "Matcha · vermilion", id: "Matcha · vermilion" }, swatch: ["#4a6b47", "#b8412f"] },
};

const STORAGE_KEY = "fega-theme";
export const DEFAULT_THEME: Theme = "merah";

export function isTheme(value: unknown): value is Theme {
  return typeof value === "string" && (THEMES as readonly string[]).includes(value);
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  /** Cycle through THEMES in order. */
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode */
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  // The pre-hydration script in layout.tsx already stamped data-theme;
  // here we only sync React state to it.
  useEffect(() => {
    const stored = safeGet(STORAGE_KEY);
    if (isTheme(stored)) setThemeState(stored);
  }, []);

  // data-theme is written SYNCHRONOUSLY (before the state update commits)
  // so that consumer effects reading CSS variables — the 3D core, GSAP
  // pipelines — always see the new palette, never the old one.
  const apply = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
    safeSet(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const setTheme = useCallback((next: Theme) => apply(next), [apply]);

  const toggle = useCallback(() => {
    const raw = document.documentElement.dataset.theme;
    const current: Theme = isTheme(raw) ? raw : DEFAULT_THEME;
    const next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
    apply(next);
  }, [apply]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}

/** Read a CSS custom property's current value from :root (client only). */
export function cssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
