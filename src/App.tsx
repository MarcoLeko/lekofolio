import TopNavBar from "./components/TopNavBar";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ArchiveSection from "./components/ArchiveSection.tsx";
import EducationSection from "./components/EducationSection";
import Footer from "./components/Footer";
import AboutMeSection from "./components/AboutMeSection.tsx";
import BottomNavBar from "./components/BottomNavBar.tsx";

export default function App() {
  return (
    <div className="relative bg-surface font-body text-on-surface antialiased">
      <div
        id="scroll-top-sentinel"
        className="h-px w-full"
        aria-hidden="true"
      />
      <TopNavBar />
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <ArchiveSection />
      <AboutMeSection />
      <EducationSection />
      <Footer />
      <BottomNavBar />
    </div>
  );
}
