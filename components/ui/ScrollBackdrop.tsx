"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { BackdropMedia } from "@/lib/backdrops";

/**
 * Scroll-scrubbed backdrop: the video's playhead follows the scroll
 * position, like a film reel. No library — the file is fetched as a blob
 * so every seek is instant, and the playhead eases toward its target.
 *
 *  - mode "hero": progress runs while the element scrolls out the top.
 *  - mode "pass": progress runs while the element crosses the viewport.
 *  - Phones, reduced motion and data-saver get the poster only.
 *  - Runs only while on screen. Without media, `fallback` is rendered.
 *
 * Progress is also published as the CSS variable --p (0 → 1) on the
 * parent element, so captions and placeholders can move with it.
 */

type Mode = "hero" | "pass";

const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

export default function ScrollBackdrop({
  media,
  mode,
  className = "",
  fallback = null,
}: {
  media: BackdropMedia;
  mode: Mode;
  className?: string;
  fallback?: ReactNode;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [scrub, setScrub] = useState(false);
  const [ready, setReady] = useState(false);

  // Decide once, on the client, whether this device gets the video.
  useEffect(() => {
    if (!media.video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    setScrub(desktop && !reduced && !saveData);
  }, [media.video]);

  // Blob-fetch the file: the whole clip is in memory, so seeking never waits on the network.
  useEffect(() => {
    if (!scrub || !media.video) return;
    const el = video.current;
    const ctrl = new AbortController();
    let url: string | null = null;

    fetch(media.video, { signal: ctrl.signal })
      .then((res) => (res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))))
      .then((blob) => {
        url = URL.createObjectURL(blob);
        if (el) el.src = url;
      })
      .catch(() => {
        /* aborted or missing — the poster / fallback stays */
      });

    return () => {
      ctrl.abort();
      if (url) URL.revokeObjectURL(url);
    };
  }, [scrub, media.video]);

  // Scroll → progress → playhead. One rAF loop, alive only while visible.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const host = el.parentElement ?? el;
    let raf = 0;
    let running = false;
    let eased = -1;

    const tick = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "hero"
          ? clamp(-rect.top / Math.max(rect.height, 1))
          : clamp((vh - rect.top) / (vh + rect.height));

      eased = eased < 0 ? p : eased + (p - eased) * 0.16;
      host.style.setProperty("--p", eased.toFixed(4));

      const v = video.current;
      if (v && v.readyState >= 2 && Number.isFinite(v.duration) && !v.seeking) {
        // Stop just short of the end: some decoders blank on the very last frame.
        const target = eased * Math.max(v.duration - 0.05, 0);
        if (Math.abs(v.currentTime - target) > 0.015) v.currentTime = target;
      }

      if (running) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting) {
        running = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [mode]);

  const hasMedia = Boolean(media.video || media.poster);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`} aria-hidden="true">
      {hasMedia ? (
        <div className="backdrop-media absolute inset-0">
          {media.poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.poster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              decoding="async"
            />
          ) : null}
          {scrub ? (
            <video
              ref={video}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                ready ? "opacity-100" : "opacity-0"
              }`}
              muted
              playsInline
              preload="auto"
              tabIndex={-1}
              onLoadedData={() => setReady(true)}
            />
          ) : null}
        </div>
      ) : (
        fallback
      )}
    </div>
  );
}
