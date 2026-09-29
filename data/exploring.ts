import type { L10n } from "@/lib/i18n";

/**
 * "Things I'm Exploring" (specification §23) — current directions of
 * study, not finished work. Draft list: the owner should edit it to
 * match what they are actually exploring.
 */

export type Topic = {
  name: L10n;
  question: L10n;
};

export const topics: Topic[] = [
  {
    name: { en: "AI agents", id: "Agen AI" },
    question: {
      en: "How much can an agent do on its own, while a person still approves what matters?",
      id: "Seberapa jauh agen bisa bekerja sendiri, sementara manusia tetap menyetujui hal yang penting?",
    },
  },
  {
    name: { en: "AI for sales and operations", id: "AI untuk penjualan dan operasional" },
    question: {
      en: "Can a business simply ask its own data a question, and trust the answer?",
      id: "Bisakah sebuah bisnis cukup bertanya kepada datanya sendiri, dan mempercayai jawabannya?",
    },
  },
  {
    name: { en: "Computer vision", id: "Computer vision" },
    question: {
      en: "Where does a camera count or inspect better than a tired pair of eyes?",
      id: "Di mana kamera menghitung atau memeriksa lebih baik daripada sepasang mata yang lelah?",
    },
  },
  {
    name: { en: "Multimodal AI", id: "AI multimodal" },
    question: {
      en: "What becomes possible when one system understands voice, image, and text together?",
      id: "Apa yang menjadi mungkin saat satu sistem memahami suara, gambar, dan teks sekaligus?",
    },
  },
  {
    name: { en: "IoT and connected devices", id: "IoT dan perangkat terhubung" },
    question: {
      en: "How do sensors turn a place nobody watches into data somebody can act on?",
      id: "Bagaimana sensor mengubah tempat yang tak diawasi menjadi data yang bisa ditindaklanjuti?",
    },
  },
  {
    name: { en: "Human–AI interaction", id: "Interaksi manusia–AI" },
    question: {
      en: "What should an interface look like when the software can also talk back?",
      id: "Seperti apa antarmuka seharusnya, ketika software-nya juga bisa membalas bicara?",
    },
  },
];
