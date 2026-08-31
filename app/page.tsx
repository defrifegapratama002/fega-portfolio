import Nav from "@/components/navigation/Nav";
import Hero from "@/components/hero/Hero";
import ScrollFX from "@/components/ui/ScrollFX";
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
import Contact from "@/components/sections/Contact";

/**
 * One continuous journey (blueprint §5, §55):
 * INTRODUCTION → PROBLEM → TECHNOLOGY AS A TOOL → ECOSYSTEM →
 * INTERACTIVE DEMONSTRATION → HOW I THINK → PROBLEM → SOLUTION →
 * PROJECTS → KNOWLEDGE → ABOUT → CONTACT
 */
export default function Home() {
  return (
    <>
      <ScrollFX />
      <Nav />
      <main id="top">
        <Hero />
        <TechnologyTool />
        <Ecosystem />
        <AISection />
        <VisionSection />
        <DataSection />
        <WebSection />
        <MobileSection />
        <AutomationSection />
        <HowIThink />
        <ProblemToSolution />
        <Projects />
        <Knowledge />
        <About />
        <Contact />
      </main>
    </>
  );
}
