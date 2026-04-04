import classNames from "classnames";
import type { ExperienceEntry } from "../types";

type CardProps = {
  entry: ExperienceEntry;
  yPos?: number;
  isSpineless: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  className?: string;
};

export function Card(props: CardProps) {
  return (
    <div
      className={classNames(
        "relative flex flex-col transition-all duration-500 md:absolute md:w-[42%] md:-translate-y-1/2",
        props.className,
        props.entry.isRight ? "md:right-[55%] md:items-end" : "md:left-[55%]",
      )}
      style={props.yPos !== undefined ? { top: `${props.yPos}px` } : undefined}
      onMouseEnter={props.onHoverStart}
      onMouseLeave={props.onHoverEnd}
    >
      <div
        className={classNames(
          "group w-full max-w-md",
          !props.isSpineless &&
            "rounded-2xl border border-outline-variant/10 bg-surface/20 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/20 hover:shadow-xl",
        )}
      >
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
