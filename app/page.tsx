import Nav from "@/components/navigation/Nav";
import Hero from "@/components/hero/Hero";
import ScrollFX from "@/components/ui/ScrollFX";
import CommandPalette from "@/components/ui/CommandPalette";
import StatusBar from "@/components/ui/StatusBar";
import Chapter from "@/components/ui/Chapter";
import WhatIBuild from "@/components/sections/WhatIBuild";
import Projects from "@/components/sections/Projects";
import LiveLab from "@/components/sections/LiveLab";
import AISection from "@/components/sections/AISection";
import VisionSection from "@/components/sections/VisionSection";
import DataSection from "@/components/sections/DataSection";
import WebSection from "@/components/sections/WebSection";
import MobileSection from "@/components/sections/MobileSection";
import AutomationSection from "@/components/sections/AutomationSection";
import Experience from "@/components/sections/Experience";
import Ecosystem from "@/components/sections/Ecosystem";
import HowIThink from "@/components/sections/HowIThink";
import About from "@/components/sections/About";
import VisionMission from "@/components/sections/VisionMission";
import Exploring from "@/components/sections/Exploring";
import Knowledge from "@/components/sections/Knowledge";
import Consult from "@/components/sections/Consult";
import Contact from "@/components/sections/Contact";
import { findBackdrop, findPortrait } from "@/lib/backdrops";

/**
 * One page, in the order of the specification (§8) — each section
 * answers one question (§44):
 *
 *   HERO                 who is Defri?
 *   WHAT I BUILD         what can he build?
 *   SELECTED WORK        has he actually built things?
 *   LIVE LAB             can I interact with his work?   (5 chapters, 6 experiments)
 *   EXPERIENCE           has he worked with real problems?   (shown once data exists)
 *   TECHNOLOGY           what does he use?
 *   ABOUT                who is he?   (how he thinks · identity · vision)
 *   THINKING             what is he exploring?   (+ knowledge)
 *   CONTACT              how do I reach him?   (consult → contact)
 */
export default function Home() {
  return (
    <>
      <ScrollFX />
      <Nav />
      <main id="top">
        <Hero media={findBackdrop("hero")} />
        <WhatIBuild />
        <Projects />

        <LiveLab />
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
        <Ecosystem />

        <HowIThink />
        <About portrait={findPortrait()} />
        <VisionMission />

        <Exploring />
        <Knowledge />

        <Consult />
        <Contact />
      </main>
      <CommandPalette />
      <StatusBar />
    </>
  );
}
