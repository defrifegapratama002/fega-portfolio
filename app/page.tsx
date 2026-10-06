import Nav from "@/components/navigation/Nav";
import Hero from "@/components/hero/Hero";
import Chapter from "@/components/ui/Chapter";
import Projects from "@/components/sections/Projects";
import WhatIBuild from "@/components/sections/WhatIBuild";
import Lab from "@/components/sections/Lab";
import AISection from "@/components/sections/AISection";
import VisionSection from "@/components/sections/VisionSection";
import DataSection from "@/components/sections/DataSection";
import WebSection from "@/components/sections/WebSection";
import MobileSection from "@/components/sections/MobileSection";
import AutomationSection from "@/components/sections/AutomationSection";
import Experience from "@/components/sections/Experience";
import Stack from "@/components/sections/Stack";
import About from "@/components/sections/About";
import Consult from "@/components/sections/Consult";
import Contact from "@/components/sections/Contact";
import { findBackdrop, findPortrait } from "@/lib/backdrops";

/**
 * One page, read top to bottom:
 *
 *   HERO        who, in one sentence
 *   WORK        the projects, with their real status
 *   FIELDS      what I work on, and how
 *   LAB         five chapters with scroll scenes and small demos
 *   EXPERIENCE  shown once data/experience.ts has entries
 *   TOOLS       what I use
 *   ABOUT       who is writing this
 *   CONSULT     before you write
 *   CONTACT
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero media={findBackdrop("hero")} />
        <Projects />
        <WhatIBuild />

        <Lab />
        <Chapter id="ai" media={findBackdrop("ai")} />
        <AISection />
        <VisionSection />
        <Chapter id="data" media={findBackdrop("data")} />
        <DataSection />
        <Chapter id="web" media={findBackdrop("web")} />
        <WebSection />
        <MobileSection />
        <Chapter id="automation" media={findBackdrop("automation")} />
        <AutomationSection />
        <Chapter id="iot" media={findBackdrop("iot")} />

        <Experience />
        <Stack />
        <About portrait={findPortrait()} />
        <Consult />
        <Contact />
      </main>
    </>
  );
}
