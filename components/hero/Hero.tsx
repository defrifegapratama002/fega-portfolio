"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/i18n";
import dynamic from "next/dynamic";
import Magnetic from "@/components/ui/Magnetic";
import CodeCard from "@/components/hero/CodeCard";
import ScrollBackdrop from "@/components/ui/ScrollBackdrop";
import type { BackdropMedia } from "@/lib/backdrops";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Three.js is the heaviest thing on the page: load it after the text is up.
const DigitalCore = dynamic(() => import("@/components/3d/DigitalCore"), { ssr: false });

/** Hero (blueprint §6–7): core statement + 3D digital core + the editor window. */
export default function Hero({ media }: { media: BackdropMedia }) {
  const { lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const hasMedia = Boolean(media.video || media.poster);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Content recedes as the camera moves into the core (§7, §17).
        gsap.to(".hero-content", {
          yPercent: -12,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom 40%",
            scrub: 0.4,
          },
        });

        // The file "writes itself", line by line.
        gsap.from(".code-line", {
          opacity: 0,
          x: -8,
          duration: 0.35,
          ease: "power2.out",
          stagger: 0.09,
          delay: 0.7,
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-svh items-center overflow-hidden">
      {hasMedia ? (
        // Scroll-scrubbed footage replaces the core once public/backdrops/hero.* exists
        <ScrollBackdrop media={media} mode="hero" className="absolute inset-0" />
      ) : (
        // 3D digital core — one WebGL canvas for the whole site (§39)
        <DigitalCore className="absolute inset-y-0 right-0 h-full w-full opacity-60 md:w-3/5 md:opacity-100" />
      )}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-r from-bg to-transparent ${
          hasMedia ? "via-bg/85" : "via-bg/70"
        }`}
        aria-hidden="true"
      />
      {/* Japanese watermark — background only, shown by the "hijau" theme (CSS) */}
      <div className="jp-mark" aria-hidden="true">
        和
      </div>

      <div className="hero-content relative z-10 mx-auto grid w-full max-w-6xl items-end gap-12 px-6 pt-28 pb-16 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="min-w-0">
          <p className="kicker" data-reveal>
            Defri Fega Pratama — Problem Solver · Software Engineer
          </p>

          <h1 className="h-display mt-6 text-[2.5rem] leading-[1.06] sm:text-6xl lg:text-[4.1rem]" data-reveal>
            {lang === "en" ? (
              <>
                I BUILD TECHNOLOGY
                <br />
                TO SOLVE <span className="mark-accent">REAL PROBLEMS.</span>
              </>
            ) : (
              <>
                SAYA MEMBANGUN TEKNOLOGI
                <br />
                UNTUK MENYELESAIKAN <span className="mark-accent">MASALAH NYATA.</span>
              </>
            )}
          </h1>

          <p className="prose-mut mt-8 text-lg" data-reveal>
            {lang === "en"
              ? "A problem solver and software engineer — turning complex problems into precise, creative, and modern solutions."
              : "Problem solver dan software engineer — mengubah masalah kompleks menjadi solusi yang tepat, kreatif, dan modern."}
          </p>

          <p className="mt-6 font-mono text-xs tracking-[0.3em] text-dim uppercase" data-reveal>
            AI · Data · Software · Automation · IoT
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
            <Magnetic>
              <a href="#projects" className="btn btn-solid">
                {lang === "en" ? "SEE MY WORK" : "LIHAT KARYA SAYA"}
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn btn-line">
                {lang === "en" ? "LET'S SOLVE A PROBLEM" : "AYO SELESAIKAN MASALAH"}
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="min-w-0" data-reveal>
          <CodeCard />
          <p className="mt-4 hidden font-mono text-[0.68rem] tracking-wide text-dim lg:block">
            {lang === "en" ? "Press" : "Tekan"} <kbd className="kbd">Ctrl</kbd> <kbd className="kbd">K</kbd>{" "}
            {lang === "en" ? "to navigate like a developer" : "untuk navigasi ala developer"}
          </p>
        </div>
      </div>
    </section>
  );
}
