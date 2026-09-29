import type { L10n } from "@/lib/i18n";

/**
 * Live Lab (specification §18) — the experiments a visitor can run on
 * this page. Labels are honest about what each one really is:
 *  - live:       real computation on real data, in the browser
 *  - experiment: an interactive model of the idea, partly staged
 */

export type LabStatus = "live" | "experiment";

export type Experiment = {
  href: string;
  name: L10n;
  what: L10n;
  status: LabStatus;
};

export const LAB_STATUS: Record<LabStatus, L10n> = {
  live: { en: "Live", id: "Live" },
  experiment: { en: "Experiment", id: "Eksperimen" },
};

export const experiments: Experiment[] = [
  {
    href: "#tech-ai",
    name: { en: "Give me a problem", id: "Beri saya masalah" },
    what: {
      en: "Describe a problem; it is routed to the technology that fits. Rule-based — not an LLM, and it says so.",
      id: "Tuliskan masalah; ia diarahkan ke teknologi yang cocok. Berbasis aturan — bukan LLM, dan ia mengakuinya.",
    },
    status: "live",
  },
  {
    href: "#tech-vision",
    name: { en: "Image to speech", id: "Gambar ke suara" },
    what: {
      en: "Text locked in an image is read, translated, and spoken. The scan is staged; the speech is real.",
      id: "Teks yang terkunci di gambar dibaca, diterjemahkan, dan diucapkan. Pemindaiannya simulasi; suaranya asli.",
    },
    status: "experiment",
  },
  {
    href: "#tech-data",
    name: { en: "Data explorer", id: "Penjelajah data" },
    what: {
      en: "A chart built from the real systems on this page. Filter it and hover it.",
      id: "Grafik dari sistem nyata di halaman ini. Saring dan arahkan kursor.",
    },
    status: "live",
  },
  {
    href: "#tech-web",
    name: { en: "This site, measured", id: "Situs ini, diukur" },
    what: {
      en: "Runtime telemetry measured in your own browser, right now.",
      id: "Telemetri yang diukur di browser Anda sendiri, saat ini juga.",
    },
    status: "live",
  },
  {
    href: "#tech-mobile",
    name: { en: "App in your hand", id: "Aplikasi di tangan" },
    what: {
      en: "A device replaying the conversation loop of the AI speaking tutor.",
      id: "Perangkat yang memutar ulang alur percakapan tutor bicara AI.",
    },
    status: "experiment",
  },
  {
    href: "#tech-automation",
    name: { en: "Automation switch", id: "Saklar otomasi" },
    what: {
      en: "Flip a manual workflow into an automated one and watch it change shape.",
      id: "Ubah alur kerja manual menjadi otomatis dan lihat bentuknya berubah.",
    },
    status: "experiment",
  },
];
