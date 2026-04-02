import cv from "../../cv.json";

type TimelineEntryType = {
  company: string;
  role: string;
  date: string;
  side: "left" | "right";
  bulletColor: string;
  points: string[];
};

const entries: TimelineEntryType[] = cv.experience.map((item, index) => ({
  company: item.company,
  role: item.role,
  date: item.period,
  side: index % 2 === 0 ? "left" : "right",
  bulletColor: index === 0 ? "bg-primary-container" : "bg-outline-variant",
  points: item.highlights,
}));

function TimelineEntry({ entry }: { entry: TimelineEntryType }) {
  if (entry.side === "left") {
    return (
      <div className="relative grid grid-cols-1 items-start gap-12 md:grid-cols-2">
        <div className="order-2 md:order-1 md:pr-16 md:text-right">
          <h3 className="font-headline text-xl font-bold text-primary">
            {entry.company}
          </h3>
          <p className="mb-4 font-semibold text-secondary">{entry.role}</p>
          <ul className="space-y-3 font-body text-on-surface-variant">
            {entry.points.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        </div>
        <div
          className={`absolute left-1/2 top-2 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-surface shadow-sm md:flex ${entry.bulletColor}`}
        />
        <div className="order-1 md:order-2 md:pl-16">
          <span className="font-label text-xs font-bold uppercase tracking-[0.1em] text-outline">
            {entry.date}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-1 items-start gap-12 md:grid-cols-2">
      <div className="order-1 md:pr-16 md:text-right">
        <span className="font-label text-xs font-bold uppercase tracking-[0.1em] text-outline">
          {entry.date}
        </span>
      </div>
      <div
        className={`absolute left-1/2 top-2 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-surface shadow-sm md:flex ${entry.bulletColor}`}
      />
      <div className="order-2 md:pl-16">
        <h3 className="font-headline text-xl font-bold text-primary">
          {entry.company}
        </h3>
        <p className="mb-4 font-semibold text-secondary">{entry.role}</p>
        <ul className="space-y-3 font-body text-on-surface-variant">
          {entry.points.map((point) => (
            <li key={point}>• {point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-surface-container-low py-32">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-20 font-headline text-[1.75rem] font-bold tracking-tight text-primary">
          Technical Trajectory
        </h2>
        <div className="relative space-y-24">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px -translate-x-1/2 bg-outline-variant/40 md:left-1/2 md:block" />
          {entries.map((entry) => (
            <TimelineEntry key={entry.company} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  );
}
