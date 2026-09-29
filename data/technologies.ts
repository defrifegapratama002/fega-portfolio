import type { L10n } from "@/lib/i18n";

/**
 * The technology ecosystem (blueprint §9): one problem in the middle,
 * seven areas of technology around it. Data-driven per blueprint §45.
 */

export type Technology = {
  key: string;
  name: string;
  short: string;
  description: L10n;
  purpose: L10n;
  areas: string[];
  /** Project titles that prove this area (real evidence, blueprint §47). */
  projects: string[];
  /** Anchor of the section that demonstrates this area. */
  sectionId: string;
};

export const technologies: Technology[] = [
  {
    key: "ai",
    name: "Artificial Intelligence",
    short: "AI",
    description: {
      en: "Building systems that can understand, generate, predict, recommend, or assist.",
      id: "Membangun sistem yang dapat memahami, menghasilkan, memprediksi, merekomendasikan, atau membantu.",
    },
    purpose: {
      en: "When a problem needs intelligent interaction, prediction, classification, generation, reasoning, or automation.",
      id: "Saat masalah membutuhkan interaksi cerdas, prediksi, klasifikasi, generasi, penalaran, atau otomasi.",
    },
    areas: ["Machine Learning", "NLP", "LLM", "Speech Recognition", "AI Assistants", "AI Automation"],
    projects: ["AI English Speaking Tutor", "FegaTutor", "Manga OCR"],
    sectionId: "tech-ai",
  },
  {
    key: "vision",
    name: "Computer Vision",
    short: "CV",
    description: {
      en: "Teaching computers to understand visual information.",
      id: "Mengajari komputer memahami informasi visual.",
    },
    purpose: {
      en: "When the information a problem needs is locked inside images or documents.",
      id: "Saat informasi yang dibutuhkan masalah terkunci di dalam gambar atau dokumen.",
    },
    areas: ["OCR", "Object Detection", "Image Classification", "Document Processing", "Visual Inspection"],
    projects: ["Manga OCR / Translation / TTS", "Leaf-Disease CNN (thesis)"],
    sectionId: "tech-vision",
  },
  {
    key: "data-analytics",
    name: "Data Analytics",
    short: "DA",
    description: {
      en: "Turning raw data into insights that help people make better decisions.",
      id: "Mengubah data mentah menjadi insight yang membantu orang mengambil keputusan lebih baik.",
    },
    purpose: {
      en: "When decisions are being made on gut feeling because the data is scattered or unreadable.",
      id: "Saat keputusan diambil berdasarkan firasat karena datanya berserakan atau tak terbaca.",
    },
    areas: ["Data Cleaning", "Exploratory Analysis", "Visualization", "Dashboards", "Reporting"],
    projects: ["Tourism Data Intelligence", "ITSFR Platform"],
    sectionId: "tech-data",
  },
  {
    key: "data-science",
    name: "Data Science",
    short: "DS",
    description: {
      en: "Combining data, statistics, programming and machine learning to discover patterns and build predictive solutions.",
      id: "Menggabungkan data, statistika, pemrograman, dan machine learning untuk menemukan pola dan membangun solusi prediktif.",
    },
    purpose: {
      en: "When the question moves from “what happened?” to “why — and what happens next?”",
      id: "Saat pertanyaan bergeser dari “apa yang terjadi?” menjadi “mengapa — dan apa berikutnya?”",
    },
    areas: ["Statistics", "Feature Engineering", "Model Training", "Evaluation", "Prediction"],
    projects: ["Sentiment Analysis", "Leaf-Disease CNN (thesis)"],
    sectionId: "tech-data",
  },
  {
    key: "web",
    name: "Web Development",
    short: "WEB",
    description: {
      en: "Building fast, accessible, sophisticated products that live in the browser.",
      id: "Membangun produk yang cepat, aksesibel, dan matang yang hidup di browser.",
    },
    purpose: {
      en: "When a solution must reach anyone, anywhere, on any device — instantly.",
      id: "Saat solusi harus menjangkau siapa pun, di mana pun, di perangkat apa pun — seketika.",
    },
    areas: ["Frontend", "Backend & APIs", "Databases", "3D / WebGL", "Motion", "Performance"],
    projects: ["This website", "ZONZON × zonzon.shop", "ITSFR Platform", "GalonHarmoni"],
    sectionId: "tech-web",
  },
  {
    key: "mobile",
    name: "Mobile Development",
    short: "MOB",
    description: {
      en: "A digital solution in your hands — native Android and cross-platform apps.",
      id: "Solusi digital dalam genggaman — aplikasi Android native dan lintas platform.",
    },
    purpose: {
      en: "When the solution must work where the user is — offline, in a pocket, on the move.",
      id: "Saat solusi harus bekerja di mana pengguna berada — offline, di saku, dalam perjalanan.",
    },
    areas: ["Android (Kotlin / Compose)", "Flutter", "Offline-first", "Device APIs", "Release & distribution"],
    projects: ["AI English Speaking Tutor", "SupplierDaging", "SpeakJapanese"],
    sectionId: "tech-mobile",
  },
  {
    key: "automation",
    name: "Automation & Systems",
    short: "AUTO",
    description: {
      en: "Turning repetitive manual work into reliable systems.",
      id: "Mengubah pekerjaan manual berulang menjadi sistem yang andal.",
    },
    purpose: {
      en: "When people are the integration layer between spreadsheets — and errors are the cost.",
      id: "Saat manusia menjadi lapisan integrasi antar-spreadsheet — dan kesalahan adalah biayanya.",
    },
    areas: ["Process Design", "Workflow Automation", "ERP / Back Office", "Integrations", "Audit Trails"],
    projects: ["ITSFR Platform", "SupplierDaging"],
    sectionId: "tech-automation",
  },
  {
    key: "iot",
    name: "Internet of Things",
    short: "IOT",
    description: {
      en: "Connecting sensors and devices to software, so the physical world can report on itself.",
      id: "Menghubungkan sensor dan perangkat ke software, agar dunia fisik bisa melaporkan dirinya sendiri.",
    },
    purpose: {
      en: "When someone still has to walk over and check — a tank, a room, a machine, a door.",
      id: "Saat seseorang masih harus datang dan mengecek sendiri — tandon, ruangan, mesin, pintu.",
    },
    areas: ["Sensors", "Device connectivity", "Monitoring", "Automatic control", "Notifications"],
    // A field of the brand — no finished project is listed until one exists.
    projects: [],
    sectionId: "chapter-iot",
  },
];
