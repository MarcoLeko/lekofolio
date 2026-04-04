import MaterialIcon from "./MaterialIcon";
import { useQuery } from "@tanstack/react-query";
import cv from "../../cv.json";
import { Card } from "./Card";

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

export default function WritingsSection() {
  const { data } = useQuery<Rss2JsonResponse>({
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

  return (
    <section id="writings" className="bg-surface-container-low py-24">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 font-headline text-[2rem] font-bold tracking-tight text-primary text-center md:text-left">
          Writings & Talks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(220px,auto)]">
          {cv.talks[0] && (
            <Card className="md:col-start-1 md:row-start-1 md:row-span-2 flex flex-col justify-between">
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
              {cv.talks[0].video && (
                <a
                  href={cv.talks[0].video}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-wide text-secondary hover:text-primary transition-colors"
                >
                  Watch Talk
                  <MaterialIcon icon="play_circle" className="text-xl" />
                </a>
              )}
            </Card>
          )}

          {writings[0] && (
            <Card
              href={writings[0].url}
              target="_blank"
              rel="noreferrer"
              className="md:col-start-2 md:col-span-2 md:row-start-1 flex flex-col sm:flex-row gap-8"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-tertiary-container/30 px-3 py-1 font-label text-xs font-bold uppercase tracking-widest text-on-tertiary-container">
                    Article
                  </div>
                  <h3 className="mb-3 font-headline text-2xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
                    {writings[0].title}
                  </h3>
                  {writings[0].categories.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {writings[0].categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-surface-container px-2.5 py-1 font-label text-[0.65rem] uppercase tracking-wide text-on-surface-variant"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="font-body text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                    {writings[0].description}
                  </p>
                </div>
              </div>
              {writings[0].image && (
                <div className="w-full sm:w-48 h-48 shrink-0 overflow-hidden rounded-2xl">
                  <img
                    src={writings[0].image}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt=""
                  />
                </div>
              )}
            </Card>
          )}

          {writings[1] && (
            <Card
              href={writings[1].url}
              target="_blank"
              rel="noreferrer"
              className="md:col-start-2 md:col-span-1 md:row-start-2 flex flex-col"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-tertiary-container/30 px-3 py-1 font-label text-xs font-bold uppercase tracking-widest text-on-tertiary-container self-start">
                Article
              </div>
              <h3 className="mb-3 font-headline text-xl font-bold text-primary group-hover:text-secondary transition-colors line-clamp-4 leading-tight">
                {writings[1].title}
              </h3>
              {writings[1].categories.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {writings[1].categories.map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full bg-surface-container px-2.5 py-1 font-label text-[0.65rem] uppercase tracking-wide text-on-surface-variant"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-auto pt-6 flex justify-end">
                <MaterialIcon
                  icon="arrow_forward"
                  className="text-outline-variant group-hover:text-secondary transition-colors"
                />
              </div>
            </Card>
          )}

          {cv.talks[1] && (
            <Card className="md:col-start-3 md:row-start-2 md:row-span-2 flex flex-col justify-between">
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
                  className="mt-8 inline-flex items-center gap-2 font-label text-sm font-bold uppercase tracking-wide text-secondary hover:text-primary transition-colors"
                >
                  Watch Talk
                  <MaterialIcon icon="play_circle" className="text-xl" />
                </a>
              )}
            </Card>
          )}

          {writings[2] && (
            <Card
              href={writings[2].url}
              target="_blank"
              rel="noreferrer"
              className="md:col-start-1 md:col-span-2 md:row-start-3 flex flex-col sm:flex-row gap-8"
            >
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-tertiary-container/30 px-3 py-1 font-label text-xs font-bold uppercase tracking-widest text-on-tertiary-container">
                    Article
                  </div>
                  <h3 className="mb-3 font-headline text-2xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
                    {writings[2].title}
                  </h3>
                  {writings[2].categories.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {writings[2].categories.map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-surface-container px-2.5 py-1 font-label text-[0.65rem] uppercase tracking-wide text-on-surface-variant"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="font-body text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                    {writings[2].description}
                  </p>
                </div>
              </div>
              {writings[2].image && (
                <div className="w-full sm:w-48 h-48 shrink-0 overflow-hidden rounded-2xl">
                  <img
                    src={writings[2].image}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt=""
                  />
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
