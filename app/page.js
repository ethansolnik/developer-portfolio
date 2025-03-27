import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import ClientOnly from "./components/helper/client-only";

// Removed the getData function since we're not using Blog component anymore

export default function Home() {
  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <ClientOnly>
        <Experience />
      </ClientOnly>
      <Skills />
      <ClientOnly>
        <Projects />
      </ClientOnly>
      <ClientOnly>
        <Education />
      </ClientOnly>
      <ContactSection />
    </div>
  )
}