import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#philosophy" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight text-ink"
        >
          BUILDYN<span className="text-crimson">.</span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative font-sans text-sm tracking-wide text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-crimson transition-all duration-500 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.03] px-5 py-2 font-sans text-sm text-ink backdrop-blur-sm transition-all duration-500 hover:border-crimson/40 hover:text-crimson md:flex"
        >
          Start a project
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </a>

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
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink/10 py-4 font-display text-3xl font-semibold text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 inline-block w-fit rounded-full bg-crimson px-6 py-3 font-sans text-sm text-ivory"
          >
            Start a project →
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
