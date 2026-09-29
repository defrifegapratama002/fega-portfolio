import type { L10n } from "@/lib/i18n";

/**
 * Personal brand — who Defri is, in one place. Everything the site says
 * about identity (hero, about, metadata) should agree with this file.
 *
 * Positioning (owner, 2026-09-29): a PROBLEM SOLVER who works as a
 * SOFTWARE ENGINEER — both, in that order.
 *
 * Fields of work are shown as part of the brand; they do not each need a
 * finished project first (owner's decision). What is never invented:
 * projects, clients, certificates, numbers.
 */

export const brand = {
  name: "Defri Fega Pratama",
  monogram: "DF",
  role: "Problem Solver · Software Engineer",
  roots: "Minangkabau",
  place: { en: "Indonesia · UTC+7 · working with anywhere", id: "Indonesia · UTC+7 · bekerja dengan mana saja" },
  promise: {
    en: "I solve real problems with solutions that are precise, creative, and modern.",
    id: "Saya menyelesaikan masalah nyata dengan solusi yang tepat, kreatif, dan modern.",
  },
} as const;

export type Principle = {
  word: L10n;
  meaning: L10n;
};

export const principles: Principle[] = [
  {
    word: { en: "Precise", id: "Tepat" },
    meaning: {
      en: "The solution answers the real problem — not its symptoms.",
      id: "Solusinya menjawab masalah yang sebenarnya — bukan gejalanya.",
    },
  },
  {
    word: { en: "Creative", id: "Kreatif" },
    meaning: {
      en: "A new path when the usual way is not enough.",
      id: "Jalan baru ketika cara yang biasa tidak cukup.",
    },
  },
  {
    word: { en: "Modern", id: "Modern" },
    meaning: {
      en: "Current technology, chosen because it is useful — not because it is trending.",
      id: "Teknologi terkini, dipilih karena berguna — bukan karena sedang tren.",
    },
  },
];
