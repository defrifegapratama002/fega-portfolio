"use client";

import type { ReactNode } from "react";
import { useLang, type L10n } from "@/lib/i18n";

type SectionProps = {
  id: string;
  label?: L10n;
  title: L10n;
  lede?: L10n;
  children?: ReactNode;
  className?: string;
};

/**
 * Section shell: a small label, a serif heading, an optional lede.
 * Sections are not numbered; the page is meant to be read, not navigated
 * like a file tree.
 */
export default function Section({ id, label, title, lede, children, className = "" }: SectionProps) {
  const { t } = useLang();

  return (
    <section id={id} className={`mx-auto max-w-5xl px-5 py-20 sm:px-6 md:py-28 ${className}`}>
      {label ? <p className="label">{t(label)}</p> : null}
      <h2 className="h-display mt-3 max-w-2xl text-3xl md:text-[2.6rem]">{t(title)}</h2>
      {lede ? <p className="prose-mut mt-5 text-base md:text-lg">{t(lede)}</p> : null}
      {children}
    </section>
  );
}
