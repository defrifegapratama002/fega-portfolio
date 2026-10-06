import type { L10n } from "@/lib/i18n";

/**
 * What Defri builds, grouped by field. `projects` are slugs from
 * data/projects.ts; a field may have none yet (personal brand).
 */

export type Build = {
  key: string;
  name: L10n;
  summary: L10n;
  items: L10n[];
  projects: string[];
  /** Where the field is demonstrated on this page. */
  demo: string;
};

const same = (s: string): L10n => ({ en: s, id: s });

export const builds: Build[] = [
  {
    key: "ai",
    name: same("AI"),
    summary: {
      en: "Software that understands language, makes a decision, and helps a person act.",
      id: "Software yang memahami bahasa, mengambil keputusan, dan membantu orang bertindak.",
    },
    items: [
      { en: "LLM applications", id: "Aplikasi LLM" },
      { en: "AI agents with human approval", id: "Agen AI dengan persetujuan manusia" },
      { en: "RAG, answers from your own data", id: "RAG, jawaban dari data Anda sendiri" },
      { en: "AI automation", id: "Otomasi berbasis AI" },
      { en: "Voice and conversational interfaces", id: "Antarmuka suara dan percakapan" },
    ],
    projects: ["speakenglish"],
    demo: "tech-ai",
  },
  {
    key: "software",
    name: same("Software"),
    summary: {
      en: "Full products, from database to interface, on the web and on the phone.",
      id: "Produk utuh, dari database sampai antarmuka, di web dan di ponsel.",
    },
    items: [
      { en: "Full-stack web applications", id: "Aplikasi web full-stack" },
      { en: "APIs and backend systems", id: "API dan sistem backend" },
      { en: "Dashboards", id: "Dashboard" },
      { en: "Mobile applications", id: "Aplikasi mobile" },
      { en: "Business systems (CRM, ERP, POS)", id: "Sistem bisnis (CRM, ERP, POS)" },
    ],
    projects: ["itsfr", "supplierdaging", "zonzon"],
    demo: "tech-web",
  },
  {
    key: "vision",
    name: same("Computer Vision"),
    summary: {
      en: "Getting information out of images, so nobody has to read or count by eye.",
      id: "Mengambil informasi dari gambar, agar tak ada yang perlu membaca atau menghitung dengan mata.",
    },
    items: [
      { en: "OCR and document reading", id: "OCR dan pembacaan dokumen" },
      { en: "Image classification", id: "Klasifikasi gambar" },
      { en: "Object detection and counting", id: "Deteksi dan penghitungan objek" },
      { en: "Visual inspection", id: "Inspeksi visual" },
    ],
    projects: ["manga-ocr"],
    demo: "tech-vision",
  },
  {
    key: "data",
    name: same("Data"),
    summary: {
      en: "Raw records turned into something a person can decide with.",
      id: "Catatan mentah diubah menjadi sesuatu yang bisa dipakai untuk memutuskan.",
    },
    items: [
      { en: "Data collection and cleaning", id: "Pengumpulan dan pembersihan data" },
      { en: "Analytics and reporting", id: "Analitik dan pelaporan" },
      { en: "Dashboards and business intelligence", id: "Dashboard dan business intelligence" },
      { en: "Machine-learning models", id: "Model machine learning" },
    ],
    projects: ["tourism-data", "sentiment"],
    demo: "tech-data",
  },
  {
    key: "automation",
    name: { en: "Automation", id: "Otomasi" },
    summary: {
      en: "Repetitive manual work turned into a system that runs the same way every time.",
      id: "Pekerjaan manual berulang diubah menjadi sistem yang berjalan sama setiap kali.",
    },
    items: [
      { en: "Workflow automation", id: "Otomasi alur kerja" },
      { en: "Back-office systems", id: "Sistem back office" },
      { en: "Integrations between systems", id: "Integrasi antar sistem" },
      { en: "Approvals, notifications, audit trails", id: "Persetujuan, notifikasi, jejak audit" },
    ],
    projects: ["itsfr", "supplierdaging"],
    demo: "tech-automation",
  },
  {
    key: "iot",
    name: same("IoT"),
    summary: {
      en: "Sensors and devices connected to software, so the physical world reports on itself.",
      id: "Sensor dan perangkat yang terhubung ke software, agar dunia fisik melaporkan dirinya sendiri.",
    },
    items: [
      { en: "Sensor monitoring", id: "Pemantauan sensor" },
      { en: "Device connectivity", id: "Konektivitas perangkat" },
      { en: "Automatic control", id: "Kontrol otomatis" },
      { en: "Alerts to your phone", id: "Peringatan ke ponsel Anda" },
    ],
    projects: [],
    demo: "chapter-iot",
  },
];

/** How every project is worked, in order. Six steps, one line each. */
export const steps: { name: L10n; note: L10n }[] = [
  {
    name: { en: "Understand", id: "Pahami" },
    note: {
      en: "What is actually going wrong, and for whom. Watch the work before changing it.",
      id: "Apa yang sebenarnya salah, dan bagi siapa. Lihat dulu cara kerjanya sebelum mengubah apa pun.",
    },
  },
  {
    name: { en: "Analyse", id: "Analisis" },
    note: {
      en: "Causes and constraints: budget, internet, devices, the law, the people who will use it.",
      id: "Penyebab dan batasan: anggaran, internet, perangkat, aturan, orang yang akan memakainya.",
    },
  },
  {
    name: { en: "Design", id: "Rancang" },
    note: {
      en: "The simplest system that solves it. Usually smaller than the first idea.",
      id: "Sistem paling sederhana yang menyelesaikannya. Biasanya lebih kecil dari ide pertama.",
    },
  },
  {
    name: { en: "Build", id: "Bangun" },
    note: {
      en: "In small releases, to real users, early.",
      id: "Dalam rilis kecil, ke pengguna nyata, sejak awal.",
    },
  },
  {
    name: { en: "Test", id: "Uji" },
    note: {
      en: "Look for the failure cases on purpose: offline, wrong input, empty quota.",
      id: "Cari kasus gagalnya dengan sengaja: offline, input salah, kuota habis.",
    },
  },
  {
    name: { en: "Improve", id: "Perbaiki" },
    note: {
      en: "Keep it running. A system counts when it still helps a year later.",
      id: "Jaga agar tetap jalan. Sistem baru berarti kalau setahun kemudian masih membantu.",
    },
  },
];
