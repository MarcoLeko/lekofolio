import TopNavBar from "./components/TopNavBar";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import WritingsSection from "./components/WritingsSection.tsx";
import EducationSection from "./components/EducationSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased">
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
      <EducationSection />
      <Footer />
    </div>
  );
}
