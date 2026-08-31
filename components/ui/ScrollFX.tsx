"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Global scroll reveals. Elements marked [data-reveal] start hidden
 * (CSS, only when JS is present) and fade up once as they enter.
 * Reduced motion: everything is simply visible (blueprint §41).
 */
export default function ScrollFX() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set("[data-reveal]", { opacity: 1, y: 0 });
    });
  });

  return null;
}
