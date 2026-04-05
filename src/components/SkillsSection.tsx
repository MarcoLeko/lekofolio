import MaterialIcon from "./MaterialIcon";
import cv from "../../cv.json";

type SkillItem = {
  label: string;
  tag?: string;
  tagClassName?: string;
};

type SkillCategory = {
  icon: string;
  title: string;
  items: SkillItem[];
};

const levelTierClassMap: Record<string, string> = {
  deep: "bg-tertiary-container text-on-tertiary-container",
  advanced: "bg-secondary-container text-on-secondary",
  intermediate: "bg-secondary-fixed text-on-secondary-fixed",
  beginner: "bg-surface-container-high text-on-surface-variant",
  basic: "bg-surface-container-high text-on-surface-variant",
};

function getLevelTagClass(level: string): string {
  return (
    levelTierClassMap[level.toLowerCase()] ??
    "bg-surface-container text-on-surface-variant"
  );
}

const categories: SkillCategory[] = [
  {
    icon: "star",
    title: "Interests",
    items: cv.skills.interests.map((item) => ({ label: item })),
  },
  {
    icon: "terminal",
    title: "Languages",
    items: cv.skills.languages.map((item) => ({
      label: item.type,
      tag: item.level.toUpperCase(),
      tagClassName: getLevelTagClass(item.level),
    })),
  },
  {
    icon: "layers",
    title: "Frameworks",
    items: cv.skills.frameworks.map((item) => ({ label: item })),
  },
  {
    icon: "dns",
    title: "Infrastructure",
    items: cv.skills.infrastructure.map((item) => ({ label: item })),
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-surface md:py-24 py-16">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {categories.map((category) => (
            <div key={category.title} className="space-y-8">
              <div className="flex items-center gap-3">
                <MaterialIcon icon={category.icon} className="text-secondary" />
                <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">
                  {category.title}
                </h4>
              </div>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li
                    key={item.label}
                    className="group flex cursor-default items-center justify-between"
                  >
                    <span className="font-body text-on-surface-variant transition-colors group-hover:text-primary">
                      {item.label}
                    </span>
                    <span className="mx-4 h-px flex-grow bg-outline-variant/20" />
                    {item.tag ? (
                      <span
                        className={`rounded-full px-2 py-0.5 font-label text-[10px] ${item.tagClassName ?? ""}`.trim()}
                      >
                        {item.tag}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
