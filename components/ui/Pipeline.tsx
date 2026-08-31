"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme, cssVar } from "@/lib/theme";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * The recurring flow diagram of the blueprint (PROBLEM → UNDERSTAND → …).
 * Steps light up sequentially, scrubbed to scroll. Without JS or with
 * reduced motion the steps are simply fully lit (CSS handles it).
 */
export default function Pipeline({
  steps,
  className = "",
  label,
}: {
  steps: string[];
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>(".pipe-step", ref.current);
        const arrows = gsap.utils.toArray<HTMLElement>(".pipe-arrow", ref.current);
        gsap.set(arrows, { opacity: 0.25 });

        // Active-theme palette; the hook re-runs on theme change (revert
        // clears stale inline colors, then re-reads the new tokens).
        const fg = cssVar("--color-fg");
        const accent = cssVar("--color-accent");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
            end: "top 40%",
            scrub: 0.6,
          },
        });
        items.forEach((el, i) => {
          tl.to(el, { color: fg, borderColor: accent, duration: 0.3 }, i * 0.3);
          if (arrows[i]) tl.to(arrows[i], { opacity: 1, duration: 0.2 }, i * 0.3 + 0.2);
        });
      });
    },
    { scope: ref, dependencies: [theme], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={`pipe ${className}`} role="img" aria-label={label ?? steps.join(" → ")}>
      {steps.map((step, i) => (
        <span key={step + i} className="contents">
          <span className="pipe-step">{step}</span>
          {i < steps.length - 1 ? (
            <span className="pipe-arrow" aria-hidden="true">
              →
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
