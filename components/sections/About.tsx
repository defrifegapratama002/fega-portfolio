"use client";

import Section from "@/components/ui/Section";
import Gonjong from "@/components/ui/Gonjong";
import { brand, principles } from "@/data/brand";
import { technologies } from "@/data/technologies";
import { useLang } from "@/lib/i18n";

/**
 * Blueprint §30 — About, as the personal brand: an identity card (who),
 * three principles (how), and the fields of work (what).
 * The portrait is `public/brand/portrait.jpg`; without it the card shows
 * the monogram.
 */
export default function About({ portrait }: { portrait: string | null }) {
  const { lang, t } = useLang();

  return (
    <Section
      id="about"
      num="12"
      label={{ en: "About", id: "Tentang" }}
      title={{
        en: "Who is behind the technology?",
        id: "Siapa di balik teknologinya?",
      }}
    >
      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
        {/* Identity card */}
        <div className="relative overflow-hidden rounded-2xl border border-line bg-deep text-on-deep" data-reveal>
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
            {portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={portrait}
                alt={brand.name}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <>
                <Gonjong className="brand-hi absolute top-6 right-6 w-[44%] opacity-70" />
                <p
                  className="h-display absolute bottom-2 left-6 text-[9rem] leading-none tracking-tighter sm:text-[11rem]"
                  aria-hidden="true"
                >
                  {brand.monogram}
                </p>
              </>
            )}
          </div>

          <div className="relative border-t border-on-deep/20 p-6 md:p-7">
            <p className="font-mono text-[0.65rem] tracking-[0.22em] uppercase opacity-60">
              {"// "}
              {lang === "en" ? "identity" : "identitas"}
            </p>
            <h3 className="h-display mt-3 text-3xl md:text-4xl">{brand.name}</h3>
            <p className="brand-hi mt-2 font-mono text-sm tracking-wide">{brand.role}</p>

            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 font-mono text-xs">
              <dt className="opacity-55">{lang === "en" ? "roots" : "asal"}</dt>
              <dd className="flex items-center gap-2">
                <Gonjong className="brand-hi h-4 w-auto" />
                {brand.roots}
              </dd>
              <dt className="opacity-55">{lang === "en" ? "base" : "lokasi"}</dt>
              <dd>{t(brand.place)}</dd>
            </dl>
          </div>
        </div>

        {/* Promise, principles, fields */}
        <div>
          <p className="h-display text-2xl leading-snug md:text-3xl" data-reveal>
            {t(brand.promise)}
          </p>
          <p className="prose-mut mt-5 text-base" data-reveal>
            {lang === "en"
              ? "Systems I build run companies' daily operations, teach people to speak English, and sell products in three market languages."
              : "Sistem yang saya bangun menjalankan operasi harian perusahaan, mengajari orang berbicara bahasa Inggris, dan menjual produk dalam tiga bahasa pasar."}
          </p>

          <ol className="mt-9 border-t border-line">
            {principles.map((p, i) => (
              <li
                key={p.word.en}
                className="grid grid-cols-[2.2rem_1fr] items-baseline gap-x-3 border-b border-line py-5 sm:grid-cols-[2.2rem_9.5rem_1fr]"
                data-reveal
              >
                <span className={`font-mono text-xs ${i % 2 ? "text-accent2" : "text-accent"}`}>0{i + 1}</span>
                <span className="h-display text-2xl uppercase">{t(p.word)}</span>
                <span className="prose-mut col-start-2 mt-1 text-sm sm:col-start-3 sm:mt-0">{t(p.meaning)}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8" data-reveal>
            <p className="font-mono text-[0.65rem] tracking-widest text-dim uppercase">
              {lang === "en" ? "Fields of work" : "Bidang kerja"}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li key={tech.key}>
                  <a
                    href={`#${tech.sectionId}`}
                    className="chip block transition-colors hover:border-accent2 hover:text-fg"
                  >
                    {tech.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="h-display mt-10 text-3xl leading-tight md:text-4xl" aria-hidden="true" data-reveal>
            BUILD. SOLVE. <span className="mark-accent2">EVOLVE.</span>
          </p>
        </div>
      </div>
    </Section>
  );
}
