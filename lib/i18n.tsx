"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "id";

/** A localized string. Every piece of copy on the site carries both languages. */
export type L10n = { en: string; id: string };

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Resolve a localized string for the active language. */
  t: (l10n: L10n) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "fega-lang";

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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = safeGet(STORAGE_KEY);
    if (stored === "id" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    safeSet(STORAGE_KEY, next);
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next = prev === "en" ? "id" : "en";
      safeSet(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const t = useCallback((l10n: L10n) => l10n[lang], [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
