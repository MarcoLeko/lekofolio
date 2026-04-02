import MaterialIcon from "./MaterialIcon";
import cv from "../../cv.json";

type Project = {
  title: string;
  description: string;
  accent: string;
  iconAccent: string;
};

const projects: Project[] = cv.projects.map((project, index) => ({
  title: project.name,
  description: project.description,
  accent: index % 2 === 0 ? "border-tertiary-fixed" : "border-secondary",
  iconAccent:
    index % 2 === 0
      ? "group-hover:text-tertiary-fixed"
      : "group-hover:text-secondary",
}));

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-surface-container-low py-32">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 font-headline text-[1.75rem] font-bold tracking-tight text-primary">
          Selected Projects
        </h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`group border-l-2 bg-surface-container-lowest p-10 shadow-card transition-all duration-300 hover:-translate-y-1 ${project.accent}`}
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h3 className="mb-2 font-headline text-2xl font-bold text-primary">
                    {project.title}
                  </h3>
                </div>
                <MaterialIcon
                  icon="open_in_new"
                  className={`text-outline-variant transition-colors ${project.iconAccent}`}
                />
              </div>
              <p className="font-body text-on-surface-variant">
                {project.description}
              </p>
              <div className="mt-8 h-1 w-16 bg-outline-variant/50" />
            </article>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="mb-8 font-headline text-xl font-bold text-primary">
            Talks
          </h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {cv.talks.map((talk) => (
              <div
                key={talk.title}
                className="border-l-2 border-secondary-container bg-surface-container-lowest p-6"
              >
                <p className="font-headline text-lg font-bold text-primary">
                  {talk.title}
                </p>
                <p className="mt-1 font-body text-sm text-on-surface-variant">
                  {talk.event}
                </p>
                {talk.video ? (
                  <a
                    href={talk.video}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-label text-xs uppercase tracking-wide text-secondary hover:underline"
                  >
                    Watch Talk
                    <MaterialIcon icon="open_in_new" className="text-base" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
