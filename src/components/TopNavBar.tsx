import type { ComponentType, MouseEvent, SVGProps } from "react";
import LinkedInLogo from "../assets/LinkedIn.svg?react";
import GitHubLogo from "../assets/GitHub.svg?react";
import LeetcodeLogo from "../assets/Leetcode.svg?react";
import MediumLogo from "../assets/Medium.svg?react";
import ProfileImg from "../assets/profile.jpg";
import cv from "../../cv.json";
import { useMdScrollTriggeredScale } from "../hooks/useMdScrollTriggeredScale";

const navItems = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#writings", label: "Writings" },
];

export default function TopNavBar() {
  const profileScale = useMdScrollTriggeredScale({
    sentinelId: "scroll-top-sentinel",
  });

  const handleScrollTopClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const cleanUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", cleanUrl);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialIconMap: Record<
    string,
    ComponentType<SVGProps<SVGSVGElement>>
  > = {
    LinkedIn: LinkedInLogo,
    GitHub: GitHubLogo,
    Medium: MediumLogo,
    LeetCode: LeetcodeLogo,
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
          <span className="hidden md:block text-xl font-headline font-extrabold tracking-tighter text-indigo-950">
            {cv.personal.name}
          </span>
          <div
            className="h-24 w-24 overflow-hidden rounded-full border-2 border-white bg-surface-container shadow-card transition-transform duration-300 md:h-16 md:w-16"
            style={{ transform: `scale(${profileScale})` }}
          >
            <img
              src={ProfileImg}
              alt={`${cv.personal.name} portrait`}
              className="block h-full w-full object-cover"
            />
          </div>
        </a>
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
          {cv.socials.map((social) => {
            const Icon = socialIconMap[social.platform];

            if (!Icon) return null;

            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.platform}
                className="inline-flex h-7 w-7 items-center justify-center text-primary transition-transform duration-200 hover:scale-105"
              >
                <Icon className="h-full w-full" />
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
