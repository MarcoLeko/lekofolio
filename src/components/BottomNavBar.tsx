import { navItems } from "../consts/navItems.ts";

export default function BottomNavBar() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none md:hidden">
      <div className="flex flex-nowrap gap-2 rounded-full bg-surface/90 p-2 backdrop-blur-md shadow-2xl border border-outline-variant/20 pointer-events-auto">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full bg-primary/10 px-3 py-2 font-label text-xs whitespace-nowrap font-bold text-primary transition-colors hover:bg-primary hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
