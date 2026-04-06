import MaterialIcon from "./MaterialIcon";
import { useQuery } from "@tanstack/react-query";
import cv from "../../cv.json";
import { Card } from "./Card";

import { Carousel } from "./Carousel";

type Talk = {
  title: string;
  event: string;
  video?: string;
  image?: string;
};

type Writing = {
  title: string;
  image: string;
  description: string;
  categories: string[];
  accent: string;
  iconAccent: string;
  url: string;
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

export default function ArchiveSection() {
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

  if (isPending) {
    return (
      <section id="archive" className="bg-surface-container-low py-24">
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

  const carouselItems: Array<{
    type: string;
    data: Writing | Talk;
    gridClass: string;
  }> = [
    {
      type: "talk",
      data: cv.talks[0],
      gridClass: "md:col-start-1 md:row-start-1 md:row-span-2",
    },
    {
      type: "writing",
      data: writings[0],
      gridClass: "md:col-start-2 md:col-span-2 md:row-start-1",
    },
    {
      type: "writing",
      data: writings[1],
      gridClass: "md:col-start-2 md:col-span-1 md:row-start-2",
    },
    {
      type: "talk",
      data: cv.talks[1],
      gridClass: "md:col-start-3 md:row-start-2 md:row-span-2",
    },
    {
      type: "writing",
      data: writings[2],
      gridClass: "md:col-start-1 md:col-span-2 md:row-start-3",
    },
  ].filter((item) => item.data);

  return (
    <section id="archive" className="bg-surface-container-low md:py-24 py-16">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 font-headline text-[2rem] font-bold tracking-tight text-primary text-center md:text-left">
          Writings & Talks
        </h2>

        <Carousel
          itemCount={carouselItems.length}
          className="gap-6 pb-8 -mx-8 px-8 scroll-pl-8 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:auto-rows-[minmax(220px,auto)] md:overflow-visible md:pb-0"
        >
          {carouselItems.map((item, index: number) => {
            if (item.type === "talk") {
              const talk = item.data as (typeof cv.talks)[0];
              return (
                <Card
                  key={`talk-${index}`}
                  className={`w-[85vw] shrink-0 snap-start md:w-auto md:shrink flex flex-col justify-between min-h-[360px] max-h-[70vh] md:min-h-0 ${item.gridClass}`}
                >
                  <div>
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary-container/50 px-3 py-1 font-label text-xs font-bold uppercase tracking-widest text-on-secondary-container">
                      Talk
                    </div>
                    <h3 className="mb-4 font-headline text-2xl font-bold text-primary leading-tight">
                      {talk.title}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      {talk.event}
                    </p>
                  </div>
                  {talk.video && (
                    <a
                      href={talk.video}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-wide text-secondary hover:text-primary transition-colors"
                    >
                      Watch Talk
                      <MaterialIcon icon="play_circle" className="text-xl" />
                    </a>
                  )}
                  {talk.image && (
                    <img
                      src={talk.image}
                      className="max-h-[320px] h-100 mt-4 rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                      alt=""
                    />
                  )}
                </Card>
              );
            }

            const writing = item.data as Writing;
            return (
              <Card
                key={`writing-${index}`}
                href={writing.url}
                target="_blank"
                rel="noreferrer"
                className={`w-[85vw] shrink-0 snap-start md:w-auto md:shrink flex flex-col justify-end min-h-[360px] md:min-h-[320px] max-h-[70vh] overflow-hidden relative group ${item.gridClass}`}
              >
                {writing.image && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={writing.image}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                )}

                <div className="relative z-10 flex-1 flex flex-col justify-end h-full">
                  <div>
                    <div
                      className={`mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 font-label text-xs font-bold uppercase tracking-widest ${writing.image ? "bg-white/20 text-white backdrop-blur-md" : "bg-tertiary-container/30 text-on-tertiary-container"}`}
                    >
                      Article
                    </div>
                    <h3
                      className={`mb-3 font-headline text-2xl font-bold transition-colors leading-tight ${writing.image ? "text-white group-hover:text-white/80" : "text-primary group-hover:text-secondary"}`}
                    >
                      {writing.title}
                    </h3>
                    <p
                      className={`font-body text-sm line-clamp-2 leading-relaxed ${writing.image ? "text-white/80" : "text-on-surface-variant"}`}
                    >
                      {writing.description}
                    </p>
                    {writing.categories.length > 0 && (
                      <div className="my-4 flex justify-between">
                        <div className="my-4 flex flex-wrap gap-2">
                          {writing.categories.map((cat) => (
                            <span
                              key={cat}
                              className={`rounded-full px-2.5 py-1 font-label text-[0.65rem] uppercase tracking-wide ${writing.image ? "bg-white/20 text-white/90 backdrop-blur-md" : "bg-surface-container text-on-surface-variant"}`}
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <div className="my-auto flex">
                          <MaterialIcon
                            icon="arrow_forward"
                            className={`transition-colors ${writing.image ? "text-white/70 group-hover:text-white" : "text-outline-variant group-hover:text-secondary"}`}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </Carousel>
      </div>
    </section>
  );
}
