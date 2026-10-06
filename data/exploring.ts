import type { L10n } from "@/lib/i18n";

/**
 * What Defri is currently studying or trying out. Not finished work.
 * Draft list: the owner should edit it to match what they are actually
 * exploring.
 */

export type Topic = {
  name: L10n;
  note: L10n;
};

export const topics: Topic[] = [
  {
    name: { en: "AI agents", id: "Agen AI" },
    note: {
      en: "letting an agent do the routine steps while a person approves the ones that matter",
      id: "membiarkan agen mengerjakan langkah rutin, sementara manusia menyetujui langkah yang penting",
    },
  },
  {
    name: { en: "Asking business data in chat", id: "Bertanya ke data bisnis lewat chat" },
    note: {
      en: "sales and operations questions answered from the company's own data, and knowing when to trust the answer",
      id: "pertanyaan penjualan dan operasional dijawab dari data perusahaan sendiri, dan tahu kapan jawabannya bisa dipercaya",
    },
  },
  {
    name: { en: "Computer vision", id: "Computer vision" },
    note: {
      en: "counting and inspection with a camera, where eyes get tired",
      id: "menghitung dan memeriksa dengan kamera, di tempat mata cepat lelah",
    },
  },
  {
    name: { en: "Voice, image and text together", id: "Suara, gambar, dan teks sekaligus" },
    note: {
      en: "one system that understands all three",
      id: "satu sistem yang memahami ketiganya",
    },
  },
  {
    name: { en: "IoT", id: "IoT" },
    note: {
      en: "sensors in places nobody watches, reporting to a phone",
      id: "sensor di tempat yang tak diawasi, melapor ke ponsel",
    },
  },
];
