import cv from "../../cv.json";
import { useState } from "react";

type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  highlights: string[];
};

const entries: ExperienceEntry[] = cv.experience.map((item) => ({
  ...item,
  highlights: item.highlights as string[],
}));

function DesktopTimeline({
  entries,
  hoveredIndex,
  setHoveredIndex,
}: {
  entries: ExperienceEntry[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  return (
    <div className="hidden md:block relative w-full">
      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary/10 -translate-x-1/2" />
      <div className="space-y-16">
        {entries.map((entry, index) => {
          const isRight = index % 2 === 1;
          const isActive = index === 0 || hoveredIndex === index;

          return (
            <div
              key={index}
              className="relative flex justify-between items-start group cursor-default"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute left-1/2 top-1 h-2 w-2 -translate-x-1/2 rounded-full ring-2 ring-surface transition-all duration-300 ${
                  isActive
                    ? "bg-primary/75 scale-150 ring-primary/20 shadow-lg"
                    : "bg-outline-variant/75"
                }`}
              />

              <div className="w-[calc(50%-3rem)] flex justify-end">
                {isRight ? (
                  <div className="mt-1 font-label text-xs font-bold uppercase tracking-widest text-outline transition-colors duration-300 group-hover:text-primary">
                    {entry.period}
                  </div>
                ) : (
                  <div className="flex flex-col transition-transform duration-300 group-hover:-translate-x-2">
                    <h3 className="font-headline text-xl font-bold text-primary">
                      {entry.company}
                    </h3>
                    <p className="mb-4 text-sm font-semibold text-secondary">
                      {entry.role}
                    </p>
                    <ul className="space-y-2 font-body text-sm text-on-surface-variant">
                      {entry.highlights.map((point, i) => (
                        <li key={i} className="flex gap-3 justify-end">
                          <span className="text-primary/50">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="w-[calc(50%-3rem)] flex justify-start">
                {!isRight ? (
                  <div className="mt-1 font-label text-xs font-bold uppercase tracking-widest text-outline transition-colors duration-300 group-hover:text-primary">
                    {entry.period}
                  </div>
                ) : (
                  <div className="flex flex-col items-start transition-transform duration-300 group-hover:translate-x-2">
                    <h3 className="font-headline text-xl font-bold text-primary">
                      {entry.company}
                    </h3>
                    <p className="mb-4 text-sm font-semibold text-secondary">
                      {entry.role}
                    </p>
                    <ul className="space-y-2 font-body text-sm text-on-surface-variant text-left">
                      {entry.highlights.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-primary/50">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileTimeline({
  entries,
  hoveredIndex,
  setHoveredIndex,
}: {
  entries: ExperienceEntry[];
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) {
  return (
    <div className="md:hidden relative">
      <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-primary/10" />
      <div className="space-y-12">
        {entries.map((entry, index) => {
          const isActive = index === 0 || hoveredIndex === index;

          return (
            <div
              key={index}
              className="relative flex flex-col group cursor-default"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className={`absolute left-[12px] top-1 h-2 w-2 -translate-x-1/2 rounded-full ring-2 ring-surface transition-all duration-300 ${
                  isActive
                    ? "bg-primary/75 scale-125 ring-primary/20 shadow-lg"
                    : "bg-outline-variant/75"
                }`}
              />

              <div className="pl-10 transition-transform duration-300 group-hover:translate-x-2">
                <div className="mb-2 font-label text-xs font-bold uppercase tracking-widest text-outline">
                  {entry.period}
                </div>
                <h3 className="font-headline text-xl font-bold text-primary">
                  {entry.company}
                </h3>
                <p className="mb-4 text-sm font-semibold text-secondary">
                  {entry.role}
                </p>
                <ul className="space-y-2 font-body text-sm text-on-surface-variant">
                  {entry.highlights.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-primary/50">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-surface-container-low py-24"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="relative z-10 mx-auto max-w-5xl px-8">
        <h2 className="mb-20 font-headline text-[2rem] font-bold tracking-tight text-primary text-center md:text-left">
          Technical Trajectory
        </h2>

        <div className="relative">
          <DesktopTimeline
            entries={entries}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
          <MobileTimeline
            entries={entries}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        </div>
      </div>
    </section>
  );
}
