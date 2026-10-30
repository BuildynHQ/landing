import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-paper px-6 pb-10 pt-20 sm:px-10">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              to="/"
              className="font-display text-6xl font-bold tracking-tight text-ink transition-colors hover:text-crimson sm:text-8xl"
            >
              BUILDYN<span className="text-crimson">.</span>
            </Link>
            <p className="mt-4 max-w-sm font-sans text-sm text-ink-soft">
              A digital product and software engineering studio building complete web applications, SaaS platforms, and custom software systems from concept to deployment.
            </p>
          </div>

          <div className="flex flex-wrap gap-12 sm:gap-16">
            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft/60">
                Pages
              </span>
              <Link
                to="/work"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Work
              </Link>
              <Link
                to="/studio"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Studio
              </Link>
              <Link
                to="/services"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Services
              </Link>
              <Link
                to="/process"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Process
              </Link>
              <Link
                to="/contact"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Contact
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft/60">
                Capabilities
              </span>
              <Link
                to="/services"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Web Apps &amp; SaaS
              </Link>
              <Link
                to="/services"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Admin Dashboards
              </Link>
              <Link
                to="/services"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Marketing Flagships
              </Link>
              <Link
                to="/services"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                UI/UX Design Systems
              </Link>
              <Link
                to="/services"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Custom APIs &amp; Systems
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft/60">
                Connect
              </span>
              <a
                href="mailto:hello@buildyn.in"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                hello@buildyn.in
              </a>
              <Link
                to="/contact"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Start a project →
              </Link>
              <a
                href="https://www.pushkarmhatre.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                <span>Founder Portfolio</span>
                <span className="text-crimson transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/pushkar-buildyn/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 font-sans text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <span>LinkedIn</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <a
                href="https://github.com/sgpushkar"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 font-sans text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <span>GitHub</span>
                <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
              <Link
                to="/privacy-policy"
                className="pt-1 font-sans text-xs text-ink-soft/70 transition-colors hover:text-ink"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-ink/10 pt-6 text-ink-soft/60 sm:flex-row sm:items-center">
          <span className="font-sans text-xs">
            © {new Date().getFullYear()} BUILDYN Studio. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="font-sans text-xs">
              Founded &amp; engineered by{" "}
              <a
                href="https://www.pushkarmhatre.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline underline-offset-4 decoration-ink/20 transition-colors hover:text-crimson hover:decoration-crimson"
              >
                Pushkar Mhatre
              </a>
            </span>
            <Link
              to="/privacy-policy"
              className="font-sans text-xs transition-colors hover:text-ink"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
