import type { L10n } from "@/lib/i18n";

/**
 * Knowledge section data (blueprint §29): certificate → what was learned →
 * related skill → related project. Certificates are supporting evidence,
 * never the center of the portfolio.
 *
 * kind:
 *  - "certificate": a formal credential (add credentialUrl for “Verify Credential”)
 *  - "study":       knowledge built by shipping real systems / formal study
 *
 * NOTE FOR EDITING: add real certificates here as they are earned — never
 * invent credentials (blueprint §47: no fake proof).
 */

export type Knowledge = {
  title: string;
  provider: string;
  date?: string;
  category: string;
  kind: "certificate" | "study";
  learned: L10n;
  relatedSkill: string;
  relatedProject?: string;
  credentialUrl?: string;
};

export const knowledge: Knowledge[] = [
  {
    title: "Undergraduate Thesis — Leaf-Disease CNN",
    provider: "Informatics — undergraduate research",
    date: "2024",
    category: "Machine Learning",
    kind: "study",
    learned: {
      en: "Training, evaluating and deploying a convolutional neural network for crop-disease classification — from dataset to a live web app.",
      id: "Melatih, mengevaluasi, dan men-deploy convolutional neural network untuk klasifikasi penyakit tanaman — dari dataset hingga web app live.",
    },
    relatedSkill: "Computer Vision · TensorFlow",
    relatedProject: "Leaf-Disease CNN (thesis)",
  },
  {
    title: "LLM Integration & Agent Design",
    provider: "Learned by shipping",
    date: "2025–2026",
    category: "Artificial Intelligence",
    kind: "study",
    learned: {
      en: "Provider failover, streaming, prompt protocols for structured correction, and voice loops — proven in products that are actually sold.",
      id: "Failover provider, streaming, protokol prompt untuk koreksi terstruktur, dan loop suara — terbukti pada produk yang benar-benar dijual.",
    },
    relatedSkill: "LLM · Speech · NLP",
    relatedProject: "AI English Speaking Tutor",
  },
  {
    title: "Business Systems & Process Design",
    provider: "Learned by shipping",
    date: "2026",
    category: "Automation & Systems",
    kind: "study",
    learned: {
      en: "Modeling real operations — pipeline, production, warehouse, money — into schemas, audit trails and workflows a factory trusts daily.",
      id: "Memodelkan operasi nyata — pipeline, produksi, gudang, uang — menjadi skema, jejak audit, dan alur kerja yang dipercaya pabrik setiap hari.",
    },
    relatedSkill: "ERP · Databases · Process Improvement",
    relatedProject: "ITSFR Platform",
  },
  {
    title: "Modern Web Engineering",
    provider: "Learned by shipping",
    date: "2025–2026",
    category: "Web Development",
    kind: "study",
    learned: {
      en: "React/Next.js architecture, WebGL/3D, scroll-driven motion, performance budgets and accessibility — demonstrated by this site and the ZONZON brand world.",
      id: "Arsitektur React/Next.js, WebGL/3D, motion berbasis scroll, anggaran performa, dan aksesibilitas — didemonstrasikan oleh situs ini dan dunia brand ZONZON.",
    },
    relatedSkill: "Next.js · Three.js · GSAP",
    relatedProject: "Interactive Technology Portfolio",
  },
];
