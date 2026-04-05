import TopNavBar from "./components/TopNavBar";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import WritingsSection from "./components/WritingsSection.tsx";
import EducationSection from "./components/EducationSection";
import Footer from "./components/Footer";
import { BottomNavigationBar } from "./components/BottomNavigationBar.tsx";
import AboutMeSection from "./components/AboutMeSection.tsx";

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
      <WritingsSection />
      <AboutMeSection />
      <EducationSection />
      <Footer />
      <BottomNavigationBar />
    </div>
  );
}
