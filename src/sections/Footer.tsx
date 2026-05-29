export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-paper px-6 pb-10 pt-20 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <a
              href="#top"
              className="font-display text-6xl font-extrabold tracking-tight text-ink sm:text-8xl"
            >
              BUILDYN<span className="text-crimson">.</span>
            </a>
            <p className="mt-4 max-w-sm font-sans text-sm text-ink-soft">
              A creative digital studio building modern internet presence —
              design, story and motion, made to be remembered.
            </p>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft/60">
                Menu
              </span>
              {["Work", "Studio", "Services", "Process"].map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase() === "studio" ? "philosophy" : l.toLowerCase()}`}
                  className="font-sans text-sm text-ink transition-colors hover:text-crimson"
                >
                  {l}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft/60">
                Social
              </span>
              {["Instagram", "Behance", "X / Twitter", "LinkedIn"].map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-sans text-sm text-ink transition-colors hover:text-crimson"
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-ink/10 pt-6 text-ink-soft/60 sm:flex-row sm:items-center">
          <span className="font-sans text-xs">
            © {new Date().getFullYear()} BUILDYN Studio. All rights reserved.
          </span>
          <span className="font-sans text-xs">
            Designed &amp; built with intention.
          </span>
        </div>
      </div>
    </footer>
  );
}
