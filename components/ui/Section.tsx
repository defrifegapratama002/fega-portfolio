"use client";

import type { ReactNode } from "react";
import { useLang, type L10n } from "@/lib/i18n";

type SectionProps = {
  id: string;
  num: string;
  label: L10n;
  title: L10n;
  lede?: L10n;
  children?: ReactNode;
  className?: string;
};

/**
 * Consistent section shell: numbered kicker, large display title,
 * optional lede — strong hierarchy and generous whitespace (§33).
 */
export default function Section({ id, num, label, title, lede, children, className = "" }: SectionProps) {
  const { t } = useLang();

  return (
    <section id={id} className={`mx-auto max-w-6xl px-6 py-28 md:py-36 ${className}`}>
      {/* Even sections carry the second accent — two colour "sides", poster-style */}
      <p className={`kicker ${Number(num) % 2 === 0 ? "kicker-2" : ""}`} data-reveal>
        {num} · {t(label)}
      </p>
      <h2 className="h-display mt-4 max-w-3xl text-3xl md:text-5xl" data-reveal>
        {t(title)}
      </h2>
      {lede ? (
        <p className="prose-mut mt-6 text-base md:text-lg" data-reveal>
          {t(lede)}
        </p>
      ) : null}
      {children}
    </section>
  );
}
