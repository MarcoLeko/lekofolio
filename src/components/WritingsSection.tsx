import MaterialIcon from "./MaterialIcon";
import { useQuery } from "@tanstack/react-query";
import cv from "../../cv.json";
import { Card } from "./Card";
import { useState } from "react";

type Writing = {
  title: string;
  image: string;
  description: string;
  categories: string[];
  accent: string;
  iconAccent: string;
  url: string;
};

type Talk = {
  title: string;
  event: string;
  video?: string;
  image?: string;
};

type MediumArticle = {
  title: string;
  link: string;
  description: string;
  categories?: string[];
};

type Rss2JsonResponse = {
  items: MediumArticle[];
};

const mediumFeedUrl = "https://medium.com/feed/@leko.marco";
const mediumApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(mediumFeedUrl)}`;

function extractDescriptionFromHtml(html: string, title: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(`${title}.`, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getExcerpt(text: string, wordLimit = 20): string {
  const words = text.split(" ").filter(Boolean);
  if (words.length <= wordLimit) {
    return text;
  }

  return `${words.slice(0, wordLimit).join(" ")}...`;
}

function stripImageFromHtml(html: string): string {
  const imageSrcMatch = html.match(/<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/i);
  const image = imageSrcMatch?.[1] ?? "";

  return image.includes("https://cdn-images-1.medium.com") ? image : "";
}

function MobileProgressIndicator(props: {
  carouselItems: (Talk | Writing)[];
  activeIndex: number;
}) {
  return (
    <div className="mt-4 flex justify-center gap-2 md:hidden">
      {props.carouselItems.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === props.activeIndex
              ? "w-8 bg-primary"
              : "w-4 bg-outline-variant/30"
          }`}
        />
      ))}
    </div>
  );
}

export default function WritingsSection() {
  const { data, isPending } = useQuery<Rss2JsonResponse>({
    queryKey: ["medium-articles", mediumFeedUrl],
    queryFn: async () => {
      const response = await fetch(mediumApiUrl);
      if (!response.ok) {
        throw new Error("Unable to fetch medium feed");
      }
      return response.json() as Promise<Rss2JsonResponse>;
    },
    staleTime: 1000 * 60 * 10,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  if (isPending) {
    return (
      <section id="writings" className="bg-surface-container-low py-24">
        <div className="mx-auto max-w-7xl px-8">
          <h2 className="mb-16 font-headline text-[2rem] font-bold tracking-tight text-primary text-center md:text-left">
            Writings & Talks
          </h2>
          <div className="flex justify-center items-center min-h-[380px]">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  const writings: Writing[] = (data?.items ?? [])
    .slice(0, 3)
    .map((article, index) => ({
      title: article.title,
      image: stripImageFromHtml(article.description),
      description: getExcerpt(
        extractDescriptionFromHtml(article.description, article.title),
      ),
      categories: (article.categories ?? []).slice(0, 2),
      accent: index % 2 === 0 ? "border-tertiary-fixed" : "border-secondary",
      iconAccent:
        index % 2 === 0
          ? "group-hover:text-tertiary-fixed"
          : "group-hover:text-secondary",
      url: article.link,
    }));

  const carouselItems = [
    cv.talks[0],
    writings[0],
    writings[1],
    cv.talks[1],
    writings[2],
  ].filter(Boolean);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollLeft = container.scrollLeft;
    const cardWidth = (container.firstChild as HTMLElement)?.clientWidth || 0;
    if (cardWidth > 0) {
      const gap = 24;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(newIndex);
    }
  };

  return (
    <section id="writings" className="bg-surface-container-low md:py-24 py-16">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 font-headline text-[2rem] font-bold tracking-tight text-primary text-center md:text-left">
          Writings & Talks
        </h2>

        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-8 px-8 scroll-pl-8 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:auto-rows-[minmax(220px,auto)] md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overscroll-x-contain"
          onScroll={handleScroll}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <Card className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink md:col-start-1 md:row-start-1 md:row-span-2 flex flex-col justify-between min-h-[380px] md:min-h-0">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-container/50 px-3 py-1 font-label text-xs font-bold uppercase tracking-widest text-on-secondary-container">
                Talk
              </div>
              <h3 className="mb-4 font-headline text-2xl font-bold text-primary leading-tight">
                {cv.talks[0].title}
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {cv.talks[0].event}
              </p>
            </div>
            {cv.talks[0].image && (
              <img
                src={cv.talks[0].image}
                className="h-100 mt-4 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                alt=""
              />
            )}
          </Card>
          <Card
            href={writings[0].url}
            target="_blank"
            rel="noreferrer"
            className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink md:col-start-2 md:col-span-2 md:row-start-1 flex flex-col justify-end min-h-[380px] md:min-h-[320px] overflow-hidden relative group"
          >
            {writings[0].image && (
              <div className="absolute inset-0 z-0">
                <img
                  src={writings[0].image}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
            )}

            <div className="relative z-10 flex-1 flex flex-col justify-end h-full">
              <div>
                <div
                  className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 font-label text-xs font-bold uppercase tracking-widest ${writings[0].image ? "bg-white/20 text-white backdrop-blur-md" : "bg-tertiary-container/30 text-on-tertiary-container"}`}
                >
                  Article
                </div>
                <h3
                  className={`mb-3 font-headline text-2xl font-bold transition-colors leading-tight ${writings[0].image ? "text-white group-hover:text-white/80" : "text-primary group-hover:text-secondary"}`}
                >
                  {writings[0].title}
                </h3>
                <p
                  className={`font-body text-sm line-clamp-2 leading-relaxed ${writings[0].image ? "text-white/80" : "text-on-surface-variant"}`}
                >
                  {writings[0].description}
                </p>
                {writings[0].categories.length > 0 && (
                  <div className="my-4 flex justify-between">
                    {writings[0].categories.length > 0 && (
                      <div className="my-4 flex flex-wrap gap-2">
                        {writings[0].categories.map((cat) => (
                          <span
                            key={cat}
                            className={`rounded-full px-2.5 py-1 font-label text-[0.65rem] uppercase tracking-wide ${writings[0].image ? "bg-white/20 text-white/90 backdrop-blur-md" : "bg-surface-container text-on-surface-variant"}`}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="my-auto flex">
                      <MaterialIcon
                        icon="arrow_forward"
                        className={`transition-colors ${writings[0].image ? "text-white/70 group-hover:text-white" : "text-outline-variant group-hover:text-secondary"}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
          <Card
            href={writings[1].url}
            target="_blank"
            rel="noreferrer"
            className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink md:col-start-2 md:col-span-1 md:row-start-2 flex flex-col justify-end min-h-[380px] md:min-h-[320px] overflow-hidden relative group"
          >
            {writings[1].image && (
              <div className="absolute inset-0 z-0">
                <img
                  src={writings[1].image}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
            )}

            <div className="relative z-10 flex-1 flex flex-col justify-end h-full">
              <div
                className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 font-label text-xs font-bold uppercase tracking-widest self-start ${writings[1].image ? "bg-white/20 text-white backdrop-blur-md" : "bg-tertiary-container/30 text-on-tertiary-container"}`}
              >
                Article
              </div>
              <h3
                className={`mb-3 font-headline text-xl font-bold transition-colors line-clamp-4 leading-tight ${writings[1].image ? "text-white group-hover:text-white/80" : "text-primary group-hover:text-secondary"}`}
              >
                {writings[1].title}
              </h3>
              <p
                className={`font-body text-sm line-clamp-2 leading-relaxed ${writings[0].image ? "text-white/80" : "text-on-surface-variant"}`}
              >
                {writings[1].description}
              </p>
              {writings[1].categories.length > 0 && (
                <div className="my-4 flex justify-between">
                  {writings[1].categories.length > 0 && (
                    <div className="my-4 flex flex-wrap gap-2">
                      {writings[1].categories.map((cat) => (
                        <span
                          key={cat}
                          className={`rounded-full px-2.5 py-1 font-label text-[0.65rem] uppercase tracking-wide ${writings[1].image ? "bg-white/20 text-white/90 backdrop-blur-md" : "bg-surface-container text-on-surface-variant"}`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="my-auto flex">
                    <MaterialIcon
                      icon="arrow_forward"
                      className={`transition-colors ${writings[1].image ? "text-white/70 group-hover:text-white" : "text-outline-variant group-hover:text-secondary"}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
          <Card className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink md:col-start-3 md:row-start-2 md:row-span-2 flex flex-col justify-between min-h-[380px] md:min-h-0">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-container/50 px-3 py-1 font-label text-xs font-bold uppercase tracking-widest text-on-secondary-container">
                Talk
              </div>
              <h3 className="mb-4 font-headline text-2xl font-bold text-primary leading-tight">
                {cv.talks[1].title}
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {cv.talks[1].event}
              </p>
            </div>
            {cv.talks[1].video && (
              <a
                href={cv.talks[1].video}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-wide text-secondary hover:text-primary transition-colors"
              >
                Watch Talk
                <MaterialIcon icon="play_circle" className="text-xl" />
              </a>
            )}
            {cv.talks[1].image && (
              <img
                src={cv.talks[1].image}
                className="h-100 mt-4 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                alt=""
              />
            )}
          </Card>
          <Card
            href={writings[2].url}
            target="_blank"
            rel="noreferrer"
            className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink md:col-start-1 md:col-span-2 md:row-start-3 flex flex-col justify-between min-h-[380px] md:min-h-[320px] overflow-hidden relative group"
          >
            {writings[2].image && (
              <div className="absolute inset-0 z-0">
                <img
                  src={writings[2].image}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>
            )}

            <div className="relative z-10 flex-1 flex flex-col justify-end h-full">
              <div>
                <div
                  className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 font-label text-xs font-bold uppercase tracking-widest ${writings[2].image ? "bg-white/20 text-white backdrop-blur-md" : "bg-tertiary-container/30 text-on-tertiary-container"}`}
                >
                  Article
                </div>
                <h3
                  className={`mb-3 font-headline text-2xl font-bold transition-colors leading-tight ${writings[2].image ? "text-white group-hover:text-white/80" : "text-primary group-hover:text-secondary"}`}
                >
                  {writings[2].title}
                </h3>
                <p
                  className={`font-body text-sm line-clamp-2 leading-relaxed ${writings[2].image ? "text-white/80" : "text-on-surface-variant"}`}
                >
                  {writings[2].description}
                </p>
                {writings[2].categories.length > 0 && (
                  <div className="my-4 flex justify-between">
                    {writings[2].categories.length > 0 && (
                      <div className="my-4 flex flex-wrap gap-2">
                        {writings[2].categories.map((cat) => (
                          <span
                            key={cat}
                            className={`rounded-full px-2.5 py-1 font-label text-[0.65rem] uppercase tracking-wide ${writings[2].image ? "bg-white/20 text-white/90 backdrop-blur-md" : "bg-surface-container text-on-surface-variant"}`}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="my-auto flex">
                      <MaterialIcon
                        icon="arrow_forward"
                        className={`transition-colors ${writings[2].image ? "text-white/70 group-hover:text-white" : "text-outline-variant group-hover:text-secondary"}`}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
        <MobileProgressIndicator
          carouselItems={carouselItems}
          activeIndex={activeIndex}
        />
      </div>
    </section>
  );
}
