import type { MouseEvent } from "react";
import cv from "../../cv.json";

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#writings", label: "Writings" },
];

export default function TopNavBar() {
  const handleScrollTopClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const cleanUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", cleanUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 h-20 w-full bg-white/70 backdrop-blur-xl shadow-nav">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <a
          href="/"
          aria-label="Go to homepage"
          className="mt-[24px] self-start flex flex-col items-center"
          onClick={handleScrollTopClick}
        >
          <span className="text-xl font-headline font-extrabold tracking-tighter text-indigo-950">
            {cv.personal.name}
          </span>
        </a>
        <div className="items-center gap-4 md:gap-8 flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-headline font-bold text-slate-600 transition-transform duration-200 hover:scale-105 hover:text-indigo-900"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
