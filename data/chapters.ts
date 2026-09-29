import type { L10n } from "@/lib/i18n";
import type { BackdropId } from "@/lib/backdrops";

/**
 * Chapter dividers — one cinematic beat per field of expertise, showing
 * how it appears in everyday life. A chapter holds several CASES; each
 * case is a coded scene (components/ui/ChapterScene.tsx) the visitor can
 * switch between. The cases are examples of application — illustrations,
 * not project claims; real work lives in data/projects.ts.
 *
 * Footage in `public/backdrops/<id>.mp4` (+ poster) replaces the scenes.
 */

export type ChapterId = Exclude<BackdropId, "hero">;

export type SceneKey =
  | "ai/tutor"
  | "ai/receipt"
  | "data/sales"
  | "data/reviews"
  | "web/shop"
  | "web/tracking"
  | "automation/orders"
  | "automation/cashier"
  | "iot/home"
  | "iot/tank";

export type ChapterCase = {
  scene: SceneKey;
  label: L10n;
};

export type Chapter = {
  id: ChapterId;
  num: string;
  title: L10n;
  line: L10n;
  /** What this field covers (ecosystem areas). */
  fields: string[];
  cases: ChapterCase[];
};

export const chapters: Record<ChapterId, Chapter> = {
  ai: {
    id: "ai",
    num: "01",
    title: { en: "AI & VISION", id: "AI & VISION" },
    line: {
      en: "Systems that listen, read, and respond.",
      id: "Sistem yang mendengar, membaca, dan merespons.",
    },
    fields: ["LLM", "Speech", "OCR", "Computer Vision"],
    cases: [
      { scene: "ai/tutor", label: { en: "Voice tutor & street camera", id: "Tutor bicara & kamera jalan" } },
      { scene: "ai/receipt", label: { en: "Reading receipts", id: "Membaca struk" } },
    ],
  },
  data: {
    id: "data",
    num: "02",
    title: { en: "DATA", id: "DATA" },
    line: {
      en: "Raw data in. Decisions out.",
      id: "Data mentah masuk. Keputusan keluar.",
    },
    fields: ["Cleaning", "Analysis", "Visualization", "Modeling"],
    cases: [
      { scene: "data/sales", label: { en: "Daily sales", id: "Penjualan harian" } },
      { scene: "data/reviews", label: { en: "Customer reviews", id: "Ulasan pelanggan" } },
    ],
  },
  web: {
    id: "web",
    num: "03",
    title: { en: "WEB & MOBILE", id: "WEB & MOBILE" },
    line: {
      en: "Products in the browser — and in your pocket.",
      id: "Produk di browser — dan di saku Anda.",
    },
    fields: ["Frontend", "Backend", "3D / Motion", "Android", "Flutter"],
    cases: [
      { scene: "web/shop", label: { en: "Online shop", id: "Toko online" } },
      { scene: "web/tracking", label: { en: "Delivery tracking", id: "Lacak pengantaran" } },
    ],
  },
  automation: {
    id: "automation",
    num: "04",
    title: { en: "AUTOMATION", id: "OTOMASI" },
    line: {
      en: "Manual work, turned into reliable systems.",
      id: "Pekerjaan manual, diubah menjadi sistem yang andal.",
    },
    fields: ["Workflow", "ERP / Back office", "Audit trails"],
    cases: [
      { scene: "automation/orders", label: { en: "Order flow", id: "Alur pesanan" } },
      { scene: "automation/cashier", label: { en: "Shop cashier", id: "Kasir toko" } },
    ],
  },
  iot: {
    id: "iot",
    num: "05",
    title: { en: "IoT", id: "IoT" },
    line: {
      en: "Devices that report, so people don't have to check.",
      id: "Perangkat yang melapor, agar orang tak perlu mengecek.",
    },
    fields: ["Sensors", "Devices", "Monitoring"],
    cases: [
      { scene: "iot/home", label: { en: "Smart home", id: "Rumah pintar" } },
      { scene: "iot/tank", label: { en: "Water tank", id: "Tandon air" } },
    ],
  },
};
