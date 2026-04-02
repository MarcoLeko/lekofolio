import MaterialIcon from "./MaterialIcon";

type Project = {
  title: string;
  tags: string[];
  description: string;
  image: string;
  alt: string;
  accent: string;
  iconAccent: string;
};

const projects: Project[] = [
  {
    title: "Prism Edge Engine",
    tags: ["RUST", "WASM"],
    description:
      "A high-performance WASM runtime optimized for edge computing environments. Prism reduces cold-start times to under 1ms while maintaining a sub-5MB memory footprint.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrfYLOxHSnHGsbaZxySH36HwluYbWbhfHF4W9MfNiBsQYWv496Us4CiNPqbMCOnD9za94yGkcykxw-PTyaRu8clDtP939ebrpsg0tXop5q2WZs1LPWJFVP3z6uX_YgLNETj2hJ_hzFAkWv9HIcIO4k05KHP38PyEL9aCqet-IVoswOFQFkcMN1P6rJIQolgwVC-HFoHBP-pC1GFzGtGXncOFH9Fj9R7fWraPRiDKuH5OPijxcyhdAkuP4oJQkb3lfD5okNkRaQZ8qO",
    alt: "Abstract visualization of high-speed digital data lines",
    accent: "border-tertiary-fixed",
    iconAccent: "group-hover:text-tertiary-fixed",
  },
  {
    title: "Atlas Flow",
    tags: ["GO", "KAFKA"],
    description:
      "Distributed event orchestration framework designed for multi-region consistency. Atlas Flow simplifies complex sagas across microservices with built-in observability.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAFCI8xL3aCFMdgdc8JYTCeOLqUZ32WrPdPuqaThnRsg0nG5NlZYrRxUCUlWH_FgPZlAcI8XNQ8UQLDFSxC647x5F3jeUz33djMsWN2yAshOCWJp6jqmD7O5RC9tftRZhEoRLv3pcMtPpAeTuYTtMGiH_ZsIFWIXk74mRI2bQiS1HvPFccycYqzZnOl1_e5d-H5GuSNnJ9lA9VCQbdKiWn5psGlQKa79pVFCxw3k1Jni5ogi9zJNu58v9bzUpS6nzlNbxGCZkMWK06o",
    alt: "Geometric blueprint-style data visualization",
    accent: "border-secondary",
    iconAccent: "group-hover:text-secondary",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-surface-container-low py-32">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 font-headline text-[1.75rem] font-bold tracking-tight text-primary">Open Source & Systems</h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`group border-l-2 bg-surface-container-lowest p-10 shadow-card transition-all duration-300 hover:-translate-y-1 ${project.accent}`}
            >
              <div className="mb-12 flex items-start justify-between">
                <div>
                  <h3 className="mb-2 font-headline text-2xl font-bold text-primary">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-surface-container px-2 py-0.5 font-label text-[10px] font-bold text-on-surface-variant"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <MaterialIcon icon="open_in_new" className={`text-outline-variant transition-colors ${project.iconAccent}`} />
              </div>
              <p className="mb-8 font-body text-on-surface-variant">{project.description}</p>
              <div className="h-48 w-full overflow-hidden rounded-lg bg-surface">
                <img className="h-full w-full object-cover opacity-80 mix-blend-multiply" src={project.image} alt={project.alt} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
