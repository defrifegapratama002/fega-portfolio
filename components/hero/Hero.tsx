"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/lib/i18n";
import DigitalCore from "@/components/3d/DigitalCore";
import Magnetic from "@/components/ui/Magnetic";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Hero (blueprint §6–7): core statement + 3D digital core focal point. */
export default function Hero() {
  const { lang } = useLang();
  const root = useRef<HTMLElement>(null);

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
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-svh items-center overflow-hidden">
      {/* 3D digital core — one WebGL canvas for the whole site (§39) */}
      <DigitalCore className="absolute inset-y-0 right-0 h-full w-full opacity-60 md:w-3/5 md:opacity-100" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-bg via-bg/70 to-transparent"
        aria-hidden="true"
      />

      <div className="hero-content relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16">
        <p className="kicker" data-reveal>
          Defri Fega Pratama — Software Engineer
        </p>

        <h1 className="h-display mt-6 text-[2.6rem] leading-[1.02] sm:text-6xl md:text-7xl" data-reveal>
          {lang === "en" ? (
            <>
              I BUILD TECHNOLOGY
              <br />
              TO SOLVE <span className="text-accent">REAL PROBLEMS.</span>
            </>
          ) : (
            <>
              SAYA MEMBANGUN TEKNOLOGI
              <br />
              UNTUK MENYELESAIKAN <span className="text-accent">MASALAH NYATA.</span>
            </>
          )}
        </h1>

        <p className="prose-mut mt-8 text-lg" data-reveal>
          {lang === "en"
            ? "A software engineer turning complex problems into precise, creative, and modern solutions."
            : "Software engineer yang mengubah masalah kompleks menjadi solusi yang tepat, kreatif, dan modern."}
        </p>

        <p className="mt-6 font-mono text-xs tracking-[0.3em] text-dim uppercase" data-reveal>
          AI · Data · Software · Automation
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
          <Magnetic>
            <a href="#ecosystem" className="btn btn-solid">
              {lang === "en" ? "EXPLORE MY WORK" : "JELAJAHI KARYA SAYA"}
            </a>
          </Magnetic>
          <Magnetic>
            <a href="#contact" className="btn btn-line">
              {lang === "en" ? "LET'S SOLVE A PROBLEM" : "AYO SELESAIKAN MASALAH"}
            </a>
          </Magnetic>
        </div>

        <p className="mt-20 font-mono text-[0.68rem] tracking-[0.25em] text-dim uppercase" data-reveal>
          {lang === "en"
            ? "Scroll — the core becomes the story ↓"
            : "Gulir — core ini menjadi ceritanya ↓"}
        </p>
      </div>
    </section>
  );
}
