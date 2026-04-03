import cv from "../../cv.json";
import ProfileImg from "../assets/profile.jpg";
import LinkedInLogo from "../assets/LinkedIn.svg?react";
import GitHubLogo from "../assets/GitHub.svg?react";
import LeetcodeLogo from "../assets/Leetcode.svg?react";
import MediumLogo from "../assets/Medium.svg?react";
import type { ComponentType, SVGProps } from "react";

type SocialPlatform = "LinkedIn" | "GitHub" | "Medium" | "LeetCode";

type SocialItem = {
  platform: SocialPlatform;
  url: string;
};

type SocialViewModel = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  href: string;
  pos: string;
  delay: string;
};

const socialIconMap: Record<
  SocialPlatform,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  LinkedIn: LinkedInLogo,
  GitHub: GitHubLogo,
  Medium: MediumLogo,
  LeetCode: LeetcodeLogo,
};
const socialUiMap: Record<SocialPlatform, { pos: string; delay: string }> = {
  LinkedIn: { pos: "-top-2 -left-4", delay: "0s" },
  GitHub: { pos: "top-1/2 -right-10", delay: "0.2s" },
  LeetCode: { pos: "-bottom-4 left-1/4", delay: "0.4s" },
  Medium: { pos: "top-1/4 -right-8", delay: "0.1s" },
};
const socials: SocialViewModel[] = (cv.socials as SocialItem[]).map((s) => ({
  Icon: socialIconMap[s.platform],
  href: s.url,
  pos: socialUiMap[s.platform].pos,
  delay: socialUiMap[s.platform].delay,
}));

export default function HeroSection() {
  return (
    <header className="relative flex min-h-[819px] items-center overflow-hidden py-24">
      <div className="blob-bg absolute left-1/4 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#1e1b4b 1px, transparent 1px), linear-gradient(90deg, #1e1b4b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-7">
          <h1 className="mb-8 max-w-2xl font-headline text-[3.5rem] font-[800] leading-[1.1] tracking-[-0.02em] text-primary">
            "{cv.hero.headline}"
          </h1>
          <div className="mb-8 h-1 w-24 bg-secondary-container" />
          <p className="max-w-xl border-l border-outline-variant/30 py-2 pl-6 font-body text-lg leading-relaxed text-on-surface-variant">
            {cv.hero.subline}
          </p>
        </div>

        <div className="flex items-center justify-center lg:col-span-5">
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`absolute ${social.pos} z-30 flex h-12 w-12 items-center justify-center rounded-xl border border-outline-variant/20 bg-surface/90 p-2.5 text-primary shadow-xl backdrop-blur-md transition-all hover:scale-110 hover:border-primary hover:text-secondary`}
                style={{
                  animation: `float 3s ease-in-out infinite`,
                  animationDelay: social.delay,
                }}
              >
                <social.Icon className="h-full w-full" />
              </a>
            ))}

            <div className="absolute inset-0 scale-105 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-30 blur-2xl" />

            <div className="relative h-full w-full bg-surface-container-high p-1 shadow-2xl [clip-path:polygon(50%_0%,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)]">
              <img
                src={ProfileImg}
                alt="Profile picture"
                className="h-full w-full object-cover [clip-path:polygon(50%_0%,93%_25%,93%_75%,50%_100%,7%_75%,7%_25%)]"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
