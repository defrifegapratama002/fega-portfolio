"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Subtle magnetic hover for CTAs (blueprint §38 — "magnetic/subtle
 * interaction, jangan berlebihan"). Fine pointers + full motion only.
 */
export default function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const el = ref.current;
      if (!el || !contextSafe) return;

      const media = window.matchMedia(
        "(prefers-reduced-motion: no-preference) and (pointer: fine)",
      );
      if (!media.matches) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
      });
      const onLeave = contextSafe(() => {
        xTo(0);
        yTo(0);
      });

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className="inline-block">
      {children}
    </span>
  );
}
