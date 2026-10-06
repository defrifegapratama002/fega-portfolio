import type { L10n } from "@/lib/i18n";

/**
 * Personal brand, in one place. Everything the site says about identity
 * (hero, about, metadata) should agree with this file.
 *
 * Positioning (owner, 2026-09-29): a PROBLEM SOLVER who works as a
 * SOFTWARE ENGINEER, both, in that order.
 *
 * What is never invented here or anywhere else on the site: projects,
 * clients, certificates, numbers.
 */

export const brand = {
  name: "Defri Fega Pratama",
  monogram: "DF",
  role: "Problem Solver · Software Engineer",
  roots: "Minangkabau",
  place: { en: "Indonesia · UTC+7", id: "Indonesia · UTC+7" },
  headline: {
    en: "Software for real problems, built to be used every day.",
    id: "Perangkat lunak untuk masalah nyata, dibuat untuk dipakai setiap hari.",
  },
  intro: {
    en: "I build the systems behind an export company's daily operations, an English speaking tutor that people pay for, and a meat distributor's back office that works without internet. AI, data, web, mobile, automation and IoT, chosen by what the problem needs.",
    id: "Saya membangun sistem yang menjalankan operasional harian sebuah perusahaan ekspor, tutor bicara bahasa Inggris yang dibayar penggunanya, dan back office distributor daging yang jalan tanpa internet. AI, data, web, mobile, otomasi, dan IoT, dipilih sesuai kebutuhan masalahnya.",
  },
  education: {
    en: "Informatics. Undergraduate thesis (2024): a convolutional neural network that classifies leaf disease, deployed as a web app.",
    id: "Informatika. Skripsi (2024): convolutional neural network untuk klasifikasi penyakit daun, di-deploy sebagai web app.",
  },
} as const;

/**
 * Contact channels: only active, professional ones.
 * A channel left as `null` is simply not shown; fill it in to show it.
 *  - whatsapp: full international number, digits only, e.g. "6281234567890"
 *  - linkedin: full profile URL
 */
export const contacts: {
  email: string;
  github: string;
  whatsapp: string | null;
  linkedin: string | null;
} = {
  email: "defrifegapratama002@gmail.com",
  github: "https://github.com/defrifegapratama002",
  whatsapp: null,
  linkedin: null,
};

export type Principle = {
  word: L10n;
  meaning: L10n;
};

/** The three words behind "tepat, kreatif, modern". Used in prose, not as a table. */
export const principles: Principle[] = [
  {
    word: { en: "precise", id: "tepat" },
    meaning: {
      en: "the solution answers the real problem, not its symptoms",
      id: "solusinya menjawab masalah yang sebenarnya, bukan gejalanya",
    },
  },
  {
    word: { en: "creative", id: "kreatif" },
    meaning: {
      en: "a different route when the usual way is not enough",
      id: "jalan lain ketika cara yang biasa tidak cukup",
    },
  },
  {
    word: { en: "modern", id: "modern" },
    meaning: {
      en: "current tools, chosen because they are useful, not because they are trending",
      id: "alat terkini, dipilih karena berguna, bukan karena sedang tren",
    },
  },
];
