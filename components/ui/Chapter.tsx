"use client";

import { useState } from "react";
import ScrollBackdrop from "@/components/ui/ScrollBackdrop";
import ChapterScene from "@/components/ui/ChapterScene";
import { chapters, type ChapterId } from "@/data/chapters";
import { useLang } from "@/lib/i18n";
import type { BackdropMedia } from "@/lib/backdrops";

/**
 * Chapter divider: a full-bleed, scroll-driven backdrop with the name of
 * the field on top. It plays one of the chapter's coded cases — the
 * visitor picks which; footage replaces them once
 * public/backdrops/<id>.* exists.
 */
export default function Chapter({ id, media }: { id: ChapterId; media: BackdropMedia }) {
  const { lang, t } = useLang();
  const chapter = chapters[id];
  const [active, setActive] = useState(0);
  const hasMedia = Boolean(media.video || media.poster);
  const current = chapter.cases[active] ?? chapter.cases[0];

  return (
    <div id={`chapter-${id}`} className="chapter relative flex scroll-mt-16 min-h-[840px] items-end md:min-h-[680px] overflow-hidden bg-deep text-on-deep md:h-[86svh]">
      <ScrollBackdrop
        media={media}
        mode="pass"
        className="absolute inset-0"
        fallback={
          <>
            <div className="chapter-grid absolute inset-0" />
            <ChapterScene
              scene={current.scene}
              className="absolute top-20 left-4 aspect-[16/9] h-[34%] md:top-[12%] md:right-[3%] md:left-auto md:aspect-auto md:h-[76%] md:w-[56%]"
            />
          </>
        }
      />
      {/* Scrim: the caption must stay readable over any footage */}
      {hasMedia ? <div className="absolute inset-0 bg-deep/55" aria-hidden="true" /> : null}

      <div className="chapter-caption relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 md:pb-20">
        <div className="md:max-w-[40%]">
          <p className="text-xs tracking-[0.14em] uppercase opacity-70">
            {lang === "en" ? "Chapter" : "Bab"} {chapter.num}
          </p>
          <h2 className="h-display mt-3 text-5xl sm:text-6xl lg:text-7xl">{t(chapter.title)}</h2>
          <p className="mt-5 text-lg opacity-85 md:text-xl">{t(chapter.line)}</p>
          <p className="mt-4 text-sm opacity-60">{chapter.fields.join(" · ")}</p>

          {!hasMedia && chapter.cases.length > 1 ? (
            <div className="mt-7">
              <p className="text-xs opacity-60">
                {lang === "en" ? "An example from everyday life:" : "Contoh dari keseharian:"}
              </p>
              <div
                className="mt-3 flex flex-wrap gap-2"
                role="group"
                aria-label={lang === "en" ? "Choose an example" : "Pilih contoh"}
              >
                {chapter.cases.map((c, i) => (
                  <button
                    key={c.scene}
                    type="button"
                    className="case-tab"
                    aria-pressed={i === active}
                    onClick={() => setActive(i)}
                  >
                    {t(c.label)}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
