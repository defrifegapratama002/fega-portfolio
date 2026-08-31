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
 * Two site themes (owner's brief):
 *  - "merah":  merah-putih-hitam — near-black ground, white ink, red accent.
 *  - "ungu":   editorial poster — paper ground, black ink, purple + cyan accents.
 * The active theme lives on <html data-theme="..."> so every CSS token,
 * SVG, chart and the 3D core follow it.
 */

export type Theme = "merah" | "ungu";

const STORAGE_KEY = "fega-theme";
export const DEFAULT_THEME: Theme = "merah";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
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
    if (stored === "merah" || stored === "ungu") setThemeState(stored);
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
    const current = (document.documentElement.dataset.theme as Theme) || DEFAULT_THEME;
    apply(current === "merah" ? "ungu" : "merah");
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
