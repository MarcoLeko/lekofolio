import type { ReactNode } from "react";
import classNames from "classnames";

type CardProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function Card({ children, className, href, ...props }: CardProps) {
  const baseClasses =
    "rounded-[2rem] border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm group hover:border-primary/30 transition-all";

  if (href) {
    return (
      <a
        href={href}
        className={classNames(baseClasses, "hover:-translate-y-1 block", className)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <div className={classNames(baseClasses, className)} {...props}>
      {children}
    </div>
  );
}
