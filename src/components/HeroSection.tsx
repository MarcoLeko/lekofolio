import cv from "../../cv.json";

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

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-12 px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="mb-8 max-w-2xl font-headline text-[3.5rem] font-[800] leading-[1.1] tracking-[-0.02em] text-primary">
            "{cv.hero.headline}"
          </h1>
          <div className="mb-8 h-1 w-24 bg-secondary-container" />
        </div>
        <div className="lg:col-span-3">
          <p className="border-l border-outline-variant/30 py-2 pl-6 font-body text-lg leading-relaxed text-on-surface-variant">
            {cv.hero.subline}
          </p>
        </div>
      </div>
    </header>
  );
}
