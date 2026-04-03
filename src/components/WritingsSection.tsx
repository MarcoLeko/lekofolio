import MaterialIcon from "./MaterialIcon";
import { useQuery } from "@tanstack/react-query";
import cv from "../../cv.json";

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
    <section id="projects" className="bg-surface-container-low py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-8">
        <h2 className="mb-16 font-headline text-[1.75rem] font-bold tracking-tight text-primary">
          Writings
        </h2>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {writings.map((writing) => (
            <a
              key={writing.title}
              href={writing.url}
              target="_blank"
              rel="noreferrer"
              className={`group border-l-2 bg-surface-container-lowest p-8 shadow-card transition-all duration-300 hover:-translate-y-1 ${writing.accent}`}
            >
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <h3 className="mb-2 font-headline text-2xl font-bold text-primary">
                    {writing.title}
                  </h3>
                  {writing.categories.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {writing.categories.map((category) => (
                        <span
                          key={`${writing.title}-${category}`}
                          className="rounded-full bg-surface-container px-2.5 py-1 font-label text-[0.65rem] uppercase tracking-wide text-on-surface-variant"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                  {writing.image && (
                    <img
                      src={writing.image}
                      className="rounded-2xl mb-4"
                      height="24"
                    />
                  )}
                  {writing.description && (
                    <p className="font-body text-sm text-on-surface-variant">
                      {writing.description}
                    </p>
                  )}
                </div>
                <MaterialIcon
                  icon="open_in_new"
                  className={`text-outline-variant transition-colors ${writing.iconAccent}`}
                />
              </div>
              <div className="mt-8 h-1 w-16 bg-outline-variant/50" />
            </a>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="mb-8 font-headline text-xl font-bold text-primary">
            Talks
          </h3>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {cv.talks.map((talk) => (
              <div
                key={talk.title}
                className="border-l-2 border-secondary-container bg-surface-container-lowest p-6"
              >
                <p className="font-headline text-lg font-bold text-primary">
                  {talk.title}
                </p>
                <p className="mt-1 font-body text-sm text-on-surface-variant">
                  {talk.event}
                </p>
                {talk.video ? (
                  <a
                    href={talk.video}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 font-label text-xs uppercase tracking-wide text-secondary hover:underline"
                  >
                    Watch Talk
                    <MaterialIcon icon="open_in_new" className="text-base" />
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
