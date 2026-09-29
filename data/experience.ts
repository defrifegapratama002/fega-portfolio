import type { L10n } from "@/lib/i18n";

/**
 * Experience (specification §21). The section appears on the page only
 * when this list has entries — it is EMPTY until the owner supplies the
 * facts. Never fill it from guesses.
 *
 * Rules from the specification:
 *  - keep the official role separate from what was actually built
 *  - focus on problems, systems, decisions, outcomes, lessons
 *  - do not exaggerate titles or responsibilities
 *
 * Example entry:
 *
 *  {
 *    period: "2024 — now",
 *    role: { en: "Official job title", id: "Jabatan resmi" },
 *    place: { en: "Company, described the way you want it shown", id: "…" },
 *    problem: { en: "The problem you met there", id: "…" },
 *    built: [{ en: "A system you built", id: "…" }],
 *    outcome: { en: "What changed — only if verified", id: "…" },
 *  }
 */

export type Experience = {
  period: string;
  role: L10n;
  place: L10n;
  problem: L10n;
  built: L10n[];
  outcome?: L10n;
};

export const experience: Experience[] = [];
