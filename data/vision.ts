import type { L10n } from "@/lib/i18n";

/**
 * Vision & mission — the "why" behind the work. Data-driven so the
 * owner can rewrite it without touching the section component.
 * Keep it honest and short; no slogans that the projects can't back up.
 */

export type Mission = {
  num: string;
  title: L10n;
  desc: L10n;
};

export const vision: L10n = {
  en: "Technology that makes people's work lighter — and leaves the world around it lighter too.",
  id: "Teknologi yang membuat pekerjaan orang lebih ringan — dan meninggalkan dunia di sekitarnya lebih ringan juga.",
};

export const visionNote: L10n = {
  en: "I care about two things that are usually kept apart: technology and the natural world. The best systems I have built are the ones that quietly remove work, waste, and worry — for the people using them and for the environment that runs them.",
  id: "Saya peduli pada dua hal yang biasanya dipisahkan: teknologi dan alam. Sistem terbaik yang pernah saya bangun adalah yang diam-diam menghapus pekerjaan, pemborosan, dan kekhawatiran — bagi orang yang memakainya, dan bagi lingkungan yang menjalankannya.",
};

export const missions: Mission[] = [
  {
    num: "01",
    title: { en: "Understand before building", id: "Pahami sebelum membangun" },
    desc: {
      en: "Start from the real problem and the people who have it — never from a technology looking for a use.",
      id: "Mulai dari masalah nyata dan orang yang mengalaminya — bukan dari teknologi yang mencari kegunaan.",
    },
  },
  {
    num: "02",
    title: { en: "Build solutions that get used daily", id: "Bangun solusi yang dipakai setiap hari" },
    desc: {
      en: "Precise, creative, and modern — measured by whether the system still runs and still helps a year later.",
      id: "Tepat, kreatif, dan modern — diukur dari apakah sistemnya masih berjalan dan masih membantu setahun kemudian.",
    },
  },
  {
    num: "03",
    title: { en: "Build lean", id: "Bangun dengan hemat" },
    desc: {
      en: "Less code, fewer dependencies, lighter pages, cheaper inference. Efficient systems are kinder to budgets and to the planet.",
      id: "Lebih sedikit kode, lebih sedikit dependensi, halaman lebih ringan, inferensi lebih murah. Sistem yang efisien lebih ramah bagi anggaran dan bagi bumi.",
    },
  },
  {
    num: "04",
    title: { en: "Keep learning, keep sharing", id: "Terus belajar, terus berbagi" },
    desc: {
      en: "Every project ends with a lesson written down — and, where it helps, shared so the next person starts further ahead.",
      id: "Setiap project diakhiri dengan pelajaran yang ditulis — dan, bila berguna, dibagikan agar orang berikutnya memulai lebih jauh di depan.",
    },
  },
];
