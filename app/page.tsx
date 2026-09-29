import Nav from "@/components/navigation/Nav";
import Hero from "@/components/hero/Hero";
import ScrollFX from "@/components/ui/ScrollFX";
import CommandPalette from "@/components/ui/CommandPalette";
import StatusBar from "@/components/ui/StatusBar";
import Chapter from "@/components/ui/Chapter";
import TechnologyTool from "@/components/sections/TechnologyTool";
import Ecosystem from "@/components/sections/Ecosystem";
import AISection from "@/components/sections/AISection";
import VisionSection from "@/components/sections/VisionSection";
import DataSection from "@/components/sections/DataSection";
import WebSection from "@/components/sections/WebSection";
import MobileSection from "@/components/sections/MobileSection";
import AutomationSection from "@/components/sections/AutomationSection";
import HowIThink from "@/components/sections/HowIThink";
import ProblemToSolution from "@/components/sections/ProblemToSolution";
import Projects from "@/components/sections/Projects";
import Knowledge from "@/components/sections/Knowledge";
import About from "@/components/sections/About";
import VisionMission from "@/components/sections/VisionMission";
import Consult from "@/components/sections/Consult";
import Contact from "@/components/sections/Contact";
import { findBackdrop, findPortrait } from "@/lib/backdrops";

/**
 * One continuous journey (blueprint §5, §55):
 * INTRODUCTION → PROBLEM → TECHNOLOGY AS A TOOL → ECOSYSTEM →
 * INTERACTIVE DEMONSTRATION → HOW I THINK → PROBLEM → SOLUTION →
 * PROJECTS → KNOWLEDGE → ABOUT → VISION & MISSION → CONSULT → CONTACT
 *
 * The demonstration is cut into four chapters, each opened by a
 * scroll-scrubbed backdrop (public/backdrops/<id>.mp4, found at build time).
 */
export default function Home() {
  return (
    <>
      <ScrollFX />
      <Nav />
      <main id="top">
        <Hero media={findBackdrop("hero")} />
        <TechnologyTool />
        <Ecosystem />
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
        <HowIThink />
        <ProblemToSolution />
        <Projects />
        <Knowledge />
        <About portrait={findPortrait()} />
        <VisionMission />
        <Consult />
        <Contact />
      </main>
      <CommandPalette />
      <StatusBar />
    </>
  );
}
