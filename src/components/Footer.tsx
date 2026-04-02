import cv from "../../cv.json";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-indigo-100/20 bg-slate-50 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <p className="font-body text-sm tracking-wide text-slate-500">
          © {year} {cv.personal.name}. {cv.personal.title}.
        </p>
        <div className="flex gap-8">
          {cv.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="font-body text-sm tracking-wide text-slate-500 transition-all hover:text-teal-500 hover:underline"
            >
              {social.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
