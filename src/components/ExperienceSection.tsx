import cv from "../../cv.json";
import { useCallback, useState } from "react";

type ExperienceEntry = {
  period: string;
  company: string;
  role: string;
  highlights: string[];
  isRight: boolean;
};

type CardProps = {
  entry: ExperienceEntry;
  yPos: number;
  heightPerEntry: number;
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

const entries: ExperienceEntry[] = cv.experience.map((item, index, array) => ({
  ...item,
  highlights: item.highlights as string[],
  isRight:
    array.length > 1 && index === array.length - 1 ? true : index % 2 === 1,
}));

function Card(props: CardProps) {
  return (
    <div
      className={`relative flex flex-col transition-all duration-500 md:absolute md:w-[42%] 
                      ${props.entry.isRight ? "md:right-[55%] md:items-end" : "md:left-[55%]"}`}
      style={{
        top: `${props.yPos}px`,
        transform: "translateY(-50%)",
      }}
      onMouseEnter={props.onHoverStart}
      onMouseLeave={props.onHoverEnd}
    >
      <div className="group w-full max-w-md rounded-2xl border border-outline-variant/10 bg-surface/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-2xl">
        <span className="mb-2 block font-label text-xs font-bold uppercase tracking-widest text-outline">
          {props.entry.period}
        </span>
        <h3 className="font-headline text-2xl font-bold text-primary">
          {props.entry.company}
        </h3>
        <p className="mb-4 font-semibold text-secondary">{props.entry.role}</p>
        <ul className="space-y-3 font-body text-sm text-on-surface-variant">
          {props.entry.highlights.map((point: string, i: number) => (
            <li key={i} className="flex gap-3">
              <span className="text-primary/50">•</span>
              <span className="text-left">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Dot(props: { index: number; yPos: number; isActive: boolean }) {
  return (
    <div
      className={`absolute left-1/2 z-30 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-3 ring-surface md:block transition-all duration-300 ${
        props.isActive
          ? "bg-primary/75 ring-primary/15 shadow-lg"
          : "bg-outline-variant/75 shadow-none"
      }`}
      style={{
        top: `${props.yPos}px`,
      }}
    />
  );
}

export default function ExperienceSection() {
  const heightPerEntry = 400;
  const totalHeight = entries.length * heightPerEntry;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const generatePath = useCallback(() => {
    const segmentCount = Math.max(entries.length - 1, 1);
    const segmentHeight = totalHeight / segmentCount;
    let d = "M 500 0";

    for (let i = 0; i < segmentCount; i += 1) {
      const yBase = i * segmentHeight;
      const nextY = (i + 1) * segmentHeight;
      const sweepX = entries[i]?.isRight ? 900 : 100;

      d += ` C ${sweepX} ${yBase + 150}, ${sweepX} ${nextY - 150}, 500 ${nextY}`;
    }

    return d;
  }, [totalHeight]);

  const pathD = generatePath();

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-surface-container-low py-32"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="relative z-10 mx-auto max-w-7xl px-8">
        <h2 className="mb-24 font-headline text-[2rem] font-bold tracking-tight text-primary text-center md:text-left">
          Technical Trajectory
        </h2>

        <div className="relative w-full" style={{ height: `${totalHeight}px` }}>
          <svg
            className="absolute inset-0 hidden h-full w-full pointer-events-none md:block"
            viewBox={`0 0 1000 ${totalHeight}`}
            preserveAspectRatio="none"
          >
            <path
              d={pathD}
              className="fill-none stroke-primary/10 [stroke-width:6] [stroke-linecap:round]"
            />
            <path
              d={pathD}
              className={`fill-none stroke-primary/40 [stroke-width:1] [stroke-dasharray:5_10] ${
                hoveredIndex !== null ? "experience-path-dash-animate" : ""
              }`}
            />
          </svg>

          <div className="relative h-full">
            {entries.map((entry, index) => (
              <div key={index}>
                <Card
                  entry={entry}
                  yPos={index * 500}
                  heightPerEntry={heightPerEntry}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
                <Dot
                  index={index}
                  yPos={(index / (entries.length - 1)) * totalHeight}
                  isActive={index === 0 || hoveredIndex === index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
