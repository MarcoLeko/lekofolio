import { Carousel } from "./Carousel";

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
          <h2 className="font-headline text-[1.75rem] font-bold text-secondary tracking-tight">
            7 Reasons on how to upset me
          </h2>
        </div>
        <Carousel
          itemCount={7}
          className="gap-4 pb-8 -mx-8 px-8 scroll-pl-8 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:pb-0"
        >
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-secondary/40 transition-colors w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink">
            <span className="material-symbols-outlined text-secondary mb-4 opacity-70">
              restaurant
            </span>
            <h4 className="font-headline font-bold text-primary text-sm mb-2">
              Cuisine Standards
            </h4>
            <p className="text-on-surface-variant text-sm font-body">
              Talking sh*t about the Italian/Bavarian cuisine. Some things are
              crossing the line.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-secondary/40 transition-colors w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink">
            <span className="material-symbols-outlined text-secondary mb-4 opacity-70">
              running_with_errors
            </span>
            <h4 className="font-headline font-bold text-primary text-sm mb-2">
              Commitment Levels
            </h4>
            <p className="text-on-surface-variant text-sm font-body">
              Approaching things by Half-assing them. Total focus or nothing at
              all.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-secondary/40 transition-colors w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink">
            <span className="material-symbols-outlined text-secondary mb-4 opacity-70">
              emoji_events
            </span>
            <h4 className="font-headline font-bold text-primary text-sm mb-2">
              Victory Etiquette
            </h4>
            <p className="text-on-surface-variant text-sm font-body">
              Being unnecessarily cocky when winning. Unless they deserve it. 😄
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-secondary/40 transition-colors w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink">
            <span className="material-symbols-outlined text-secondary mb-4 opacity-70">
              gavel
            </span>
            <h4 className="font-headline font-bold text-primary text-sm mb-2">
              Fair Play
            </h4>
            <p className="text-on-surface-variant text-sm font-body">
              People taking advantage and behaving unfairly. It's part of the
              game but kills people's right intentions.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-secondary/40 transition-colors w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink">
            <span className="material-symbols-outlined text-secondary mb-4 opacity-70">
              favorite
            </span>
            <h4 className="font-headline font-bold text-primary text-sm mb-2">
              Social Awareness
            </h4>
            <p className="text-on-surface-variant text-sm font-body">
              Not being empathic. Systems are built for humans, by humans.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-secondary/40 transition-colors w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink">
            <span className="material-symbols-outlined text-secondary mb-4 opacity-70">
              handshake
            </span>
            <h4 className="font-headline font-bold text-primary text-sm mb-2">
              Reliability Factor
            </h4>
            <p className="text-on-surface-variant text-sm font-body">
              Not being able to count on someone. High percentage Uptime applies
              to people too.
            </p>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/20 hover:border-secondary/40 transition-colors lg:col-span-2 w-[85vw] shrink-0 snap-start sm:w-auto sm:shrink">
            <span className="material-symbols-outlined text-secondary mb-4 opacity-70">
              music_note
            </span>
            <h4 className="font-headline font-bold text-primary text-sm mb-2">
              Unpopular Opinions
            </h4>
            <p className="text-on-surface-variant text-sm font-body">
              Denying Justin Bieber's unbelievable talent. Check the stats, it's
              objective.
            </p>
          </div>
        </Carousel>
      </div>
    </section>
  );
}
