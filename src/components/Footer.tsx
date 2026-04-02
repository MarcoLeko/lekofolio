const links = ["LinkedIn", "GitHub", "Source Code"];

export default function Footer() {
  return (
    <footer className="w-full border-t border-indigo-100/20 bg-slate-50 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 md:flex-row">
        <p className="font-body text-sm tracking-wide text-slate-500">© 2024 Senior Software Architect. Built with Precision.</p>
        <div className="flex gap-8">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-sm tracking-wide text-slate-500 transition-all hover:text-teal-500 hover:underline"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
