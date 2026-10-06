"use client";

import { useLang } from "@/lib/i18n";
import Gonjong from "@/components/ui/Gonjong";
import ScrollBackdrop from "@/components/ui/ScrollBackdrop";
import { brand, contacts } from "@/data/brand";
import type { BackdropMedia } from "@/lib/backdrops";

/**
 * Hero: a name, one sentence, one paragraph, two links. The only graphic
 * is the gonjong, the roofline of a Minangkabau rumah gadang. If footage
 * exists in public/backdrops/hero.* it plays behind the text, scrubbed
 * by scroll.
 */
export default function Hero({ media }: { media: BackdropMedia }) {
  const { lang, t } = useLang();
  const hasMedia = Boolean(media.video || media.poster);

  return (
    <section className="relative overflow-hidden">
      {hasMedia ? (
        <>
          <ScrollBackdrop media={media} mode="hero" className="absolute inset-0" />
          <div className="absolute inset-0 bg-bg/80" aria-hidden="true" />
        </>
      ) : null}
      {/* Japanese watermark, background only, shown by the "hijau" theme (CSS) */}
      <div className="jp-mark" aria-hidden="true">
        和
      </div>

      <div className="relative z-10 mx-auto grid max-w-5xl gap-10 px-5 pt-32 pb-20 sm:px-6 md:grid-cols-[1fr_auto] md:items-end md:pt-40 md:pb-28">
        <div className="min-w-0">
          <p className="text-sm text-mut">
            {brand.name} · {brand.role}
            <span className="hidden sm:inline"> · {brand.roots}, Indonesia</span>
          </p>

          <h1 className="h-display mt-6 text-[2.4rem] sm:text-5xl md:text-[3.6rem]">{t(brand.headline)}</h1>

          <p className="prose-mut mt-7 text-lg">{t(brand.intro)}</p>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#projects" className="btn btn-solid">
              {lang === "en" ? "See the work" : "Lihat karya"}
            </a>
            <a href={`mailto:${contacts.email}`} className="link text-sm">
              {lang === "en" ? "or write to me" : "atau tulis email"}
            </a>
          </div>
        </div>

        <figure className="hidden w-[300px] shrink-0 md:block lg:w-[340px]">
          <Gonjong className="w-full text-fg" />
          <figcaption className="mt-3 text-right text-xs text-dim">
            {lang === "en"
              ? "Gonjong, the roofline of a rumah gadang. I am Minangkabau."
              : "Gonjong, atap rumah gadang. Saya orang Minangkabau."}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
