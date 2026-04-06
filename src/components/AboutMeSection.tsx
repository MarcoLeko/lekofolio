import { Carousel } from "./Carousel";

const aboutMeItems = [
  {
    icon: "running_with_errors",
    title: "Commitment Levels",
    description:
      "Approaching things by Half-assing them. Total focus or nothing at all.",
  },
  {
    icon: "emoji_events",
    title: "Victory Etiquette",
    description:
      "Being unnecessarily cocky when winning. Unless they deserve it. 😄",
  },
  {
    icon: "gavel",
    title: "Fair Play",
    description:
      "Opportunists and behaving unfairly. It's part of the game but kills people's right intentions.",
  },
  {
    icon: "favorite",
    title: "Social Awareness",
    description: "Not being empathic. Systems are built for humans, by humans.",
  },
  {
    icon: "handshake",
    title: "Reliability Factor",
    description:
      "Not being able to count on someone. High percentage uptime applies to people, too.",
  },
  {
    icon: "restaurant",
    title: "Cuisine Standards",
    description:
      "Italian cuisine is non-negotiable. If the pasta isn't al dente, my code quality drops by 15%.",
  },
  {
    icon: "music_note",
    title: "Unpopular Opinions",
    description:
      "Belieber Ops. Programming sessions are powered strictly by 'Purpose' and 'Justice'. No exceptions allowed.",
    className: "lg:col-span-2",
  },
];

export default function AboutMeSection() {
  return (
    <section
      id="aboutme"
      className="relative overflow-hidden py-16 md:py-24 bg-surface-container-low border-y border-outline-variant/10"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-bold mb-4 block">
            Personal Specs
          </span>
          <h2 className="font-headline text-[2.5rem] font-extrabold text-primary tracking-tight">
            User Manual: Debugging Me
          </h2>
          <h2 className="font-headline text-[1.75rem] font-bold text-secondary tracking-tight mt-2">
            7 Reasons on how to{" "}
            <span className="underline text-secondary decoration-4 underline-offset-4">
              upset
            </span>{" "}
            me
          </h2>
        </div>
        <Carousel
          itemCount={aboutMeItems.length}
          className="gap-4 pb-8 -mx-8 px-8 scroll-pl-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:pb-0"
        >
          {aboutMeItems.map((item, index) => (
            <div
              key={index}
              className={`bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-secondary/40 transition-colors w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink ${item.className || ""}`}
            >
              <span className="material-symbols-outlined text-secondary mb-4 opacity-70">
                {item.icon}
              </span>
              <h4 className="font-headline font-bold text-primary text-sm mb-2">
                {item.title}
              </h4>
              <p className="text-on-surface-variant text-sm font-body">
                {item.description}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
