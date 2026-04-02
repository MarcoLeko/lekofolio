import MaterialIcon from "./MaterialIcon";

type SkillItem = {
  label: string;
  tag?: string;
};

type SkillCategory = {
  icon: string;
  title: string;
  items: SkillItem[];
};

const categories: SkillCategory[] = [
  {
    icon: "terminal",
    title: "Languages",
    items: [
      { label: "Go (Golang)", tag: "EXPERT" },
      { label: "Rust", tag: "SYSTEMS" },
      { label: "TypeScript" },
    ],
  },
  {
    icon: "layers",
    title: "Frameworks",
    items: [{ label: "React / Next.js" }, { label: "gRPC / Protobuf" }, { label: "Apache Kafka" }],
  },
  {
    icon: "dns",
    title: "Infrastructure",
    items: [{ label: "Kubernetes / Docker" }, { label: "Terraform (IaC)" }, { label: "AWS / GCP / Azure" }],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="bg-surface py-32">
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.title} className="space-y-8">
              <div className="flex items-center gap-3">
                <MaterialIcon icon={category.icon} className="text-secondary" />
                <h4 className="font-headline text-sm font-bold uppercase tracking-widest text-primary">{category.title}</h4>
              </div>
              <ul className="space-y-4">
                {category.items.map((item) => (
                  <li key={item.label} className="group flex cursor-default items-center justify-between">
                    <span className="font-body text-on-surface-variant transition-colors group-hover:text-primary">
                      {item.label}
                    </span>
                    <span className="mx-4 h-px flex-grow bg-outline-variant/20" />
                    {item.tag ? (
                      <span className="rounded-full bg-tertiary-container px-2 py-0.5 font-label text-[10px] text-on-tertiary-container">
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
