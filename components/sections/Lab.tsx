"use client";

import Section from "@/components/ui/Section";

/** Short introduction to the five chapters that follow. */
export default function Lab() {
  return (
    <Section
      id="lab"
      label={{ en: "Lab", id: "Lab" }}
      title={{
        en: "Five chapters, with scenes that move as you scroll and a few things you can try.",
        id: "Lima bab, dengan adegan yang bergerak mengikuti scroll dan beberapa hal yang bisa dicoba.",
      }}
      lede={{
        en: "The scenes are illustrations of where each field shows up in everyday life, not records of projects. The demos below each chapter say what they really compute and what is only staged.",
        id: "Adegannya ilustrasi tentang di mana tiap bidang muncul dalam keseharian, bukan catatan proyek. Demo di bawah tiap bab menyebut apa yang benar-benar dihitung dan apa yang hanya simulasi.",
      }}
      className="!pb-10 md:!pb-14"
    />
  );
}
