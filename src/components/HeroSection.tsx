import cv from "../../cv.json";
import ProfileImg from "../assets/profile.jpg";
import cvPdfUrl from "../assets/Marco_Leko_CV.pdf";
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
  GitHub: { pos: "top-3/5 -right-10", delay: "0.2s" },
  LeetCode: { pos: "-bottom-4 left-1/5", delay: "0.4s" },
  Medium: { pos: "top-1 -right-[-15px]", delay: "0.1s" },
};
const socials: SocialViewModel[] = (cv.socials as SocialItem[]).map((s) => ({
  Icon: socialIconMap[s.platform],
  href: s.url,
  pos: socialUiMap[s.platform].pos,
  delay: socialUiMap[s.platform].delay,
}));

export default function HeroSection() {
  return (
    <header className="relative flex flex-col min-h-[680px] items-center overflow-hidden md:py-24 py-16">
      <div className="blob-bg absolute left-1/4 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-40" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#1e1b4b 1px, transparent 1px), linear-gradient(90deg, #1e1b4b 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-7">
          <p className="max-w-xl py-2 font-body text-lg leading-relaxed">
            {cv.personal.title}
          </p>
          <h1 className="mb-8 max-w-2xl font-headline text-[3.5rem] font-[800] leading-[1.1] tracking-[-0.02em] text-primary">
            {cv.hero.headline}
          </h1>
          <div className="mb-8 h-1 w-24 bg-secondary-container" />
          <p className="max-w-xl border-l border-outline-variant/30 py-2 pl-6 font-body text-lg leading-relaxed text-on-surface-variant">
            {cv.hero.subline.replace(
              "{yearsOfExperiencePlaceholder}",
              String(new Date().getFullYear() - 2019),
            )}
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

            <div className="absolute inset-0 scale-105 rounded-full bg-gradient-to-tr from-primary to-secondary opacity-30 blur-3xl" />
            <svg width="0" height="0" className="absolute">
              <defs>
                <clipPath id="hex-clip" clipPathUnits="objectBoundingBox">
                  <path d="M 0.465,0.02 Q 0.5,0 0.535,0.02 L 0.896,0.23 Q 0.93,0.25 0.93,0.27 L 0.93,0.73 Q 0.93,0.75 0.896,0.77 L 0.535,0.98 Q 0.5,1 0.465,0.98 L 0.104,0.77 Q 0.07,0.75 0.07,0.73 L 0.07,0.27 Q 0.07,0.25 0.104,0.23 Z" />
                </clipPath>
              </defs>
            </svg>
            <div
              className="relative h-full w-full"
              style={{ clipPath: "url(#hex-clip)" }}
            >
              <img
                src={ProfileImg}
                alt="Profile picture"
                className="h-full w-full object-cover hexagon"
              />
              <div className="hex-small one mix-blend-overlay" />
              <div className="hex-small two mix-blend-overlay" />
            </div>
          </div>
        </div>
      </div>
      <section
        className="pt-16 bg-surface relative overflow-hidden"
        id="philosophy"
      >
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] blob-bg opacity-20 -z-10 translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute inset-0 -z-20 opacity-[0.02] grid-pattern"></div>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center gap-4 my-8">
            <h2 className="font-headline text-[1.75rem] font-bold text-primary tracking-tight">
              Working Philosophy
            </h2>
            <div className="h-px flex-grow bg-outline-variant/30"></div>
          </div>
          <div className="flex flex-col gap-8 items-start">
            <div className="space-y-2">
              <p className="text-on-surface-variant leading-relaxed">
                {cv.hero.philosophySubline}
              </p>
            </div>
            <div>
              <a
                href={cvPdfUrl}
                download="Marco_Leko_CV.pdf"
                className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 rounded hover:bg-primary hover:text-on-primary transition-all duration-300 font-headline font-bold text-sm"
              >
                <span className="material-symbols-outlined text-base">
                  download
                </span>
                Download Full CV
              </a>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
