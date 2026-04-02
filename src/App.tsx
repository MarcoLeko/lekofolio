import TopNavBar from "./components/TopNavBar";
import HeroSection from "./components/HeroSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import EducationSection from "./components/EducationSection";
import Footer from "./components/Footer";

export default function App() {
  return (
      <div className="bg-surface font-body text-on-surface antialiased">
        <TopNavBar />
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <Footer />
      </div>
  );
}
