import LinkedInLogo from "../assets/LinkedIn.svg?react";
import GitHubLogo from "../assets/GitHub.svg?react";
import LeetcodeLogo from "../assets/Leetcode.svg?react";
import MediumLogo from "../assets/Medium.svg?react";

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
];

export default function TopNavBar() {
  return (
    <nav className="sticky top-0 z-50 h-20 w-full bg-white/70 backdrop-blur-xl shadow-nav">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">
        <div className="text-xl font-headline font-extrabold tracking-tighter text-indigo-950">
          Marco Leko
        </div>
        <div className="hidden items-center gap-8 md:flex">
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
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center">
            <MediumLogo />
          </span>
          <span className="inline-flex h-7 w-7 items-center justify-center">
            <LeetcodeLogo />
          </span>
          <span className="inline-flex h-7 w-7 items-center justify-center">
            <LinkedInLogo />
          </span>
          <span className="inline-flex h-7 w-7 items-center justify-center">
            <GitHubLogo />
          </span>
        </div>
      </div>
    </nav>
  );
}
