import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "/work" },
  { label: "Studio", href: "/studio" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-all duration-500 sm:px-10 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <Link
          to="/"
          className="font-display text-xl font-extrabold tracking-tight text-ink transition-colors hover:text-crimson"
        >
          BUILDYN<span className="text-crimson">.</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => {
            const isActive = location.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                className={`group relative font-sans text-sm tracking-wide transition-colors ${
                  isActive ? "text-ink font-medium" : "text-ink-soft hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-crimson transition-all duration-500 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          to="/contact"
          className="hidden items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.03] px-5 py-2 font-sans text-sm text-ink backdrop-blur-sm transition-all duration-500 hover:border-crimson/40 hover:text-crimson md:flex"
        >
          Start a project
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </Link>

        {/* mobile toggle */}
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`block h-px w-6 bg-ink transition-all duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-ink transition-all duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden bg-ivory/95 backdrop-blur-md md:hidden"
      >
        <div className="flex flex-col gap-1 px-6 pb-8 pt-2">
          {links.map((l) => {
            const isActive = location.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className={`border-b border-ink/10 py-4 font-display text-3xl font-semibold transition-colors ${
                  isActive ? "text-crimson" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-block w-fit rounded-full bg-crimson px-6 py-3 font-sans text-sm text-ivory shadow-lg shadow-crimson/20"
          >
            Start a project →
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}
