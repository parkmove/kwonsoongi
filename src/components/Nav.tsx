import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

type NavItem = { to: string; label: string };

const ITEMS: NavItem[] = [
  { to: "/fair", label: "사진 게시판" },
  { to: "/report", label: "제보하기" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-shadow ${
        scrolled
          ? "border-b border-ink-700 bg-ink-900/95 shadow-[0_1px_0_rgba(0,0,0,0.4),0_8px_24px_-12px_rgba(0,0,0,0.6)] backdrop-blur"
          : "border-b border-transparent bg-ink-900/80 backdrop-blur"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-screen-xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={close}
          aria-label="홈"
          className="text-xl font-black tracking-[-0.03em] text-ink-50 sm:text-2xl"
        >
          권순기
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-base font-bold transition-colors ${
                  isActive
                    ? "bg-magenta text-ink-900"
                    : "text-ink-200 hover:bg-ink-800 hover:text-ink-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 rounded-md p-2 text-ink-50 hover:bg-ink-800 md:hidden"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-700 bg-ink-900 shadow-sm md:hidden">
          <nav className="mx-auto flex max-w-screen-xl flex-col px-3 py-2 sm:px-6">
            {ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={close}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-4 text-lg font-bold ${
                    isActive
                      ? "bg-magenta text-ink-900"
                      : "text-ink-100 hover:bg-ink-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
