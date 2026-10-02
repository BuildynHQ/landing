import { useState } from "react";
import { Link } from "react-router-dom";
import { MaskedHeading } from "../components/MaskedHeading";
import { Reveal } from "../components/Reveal";
import { projects, type Project } from "../data/projects";

function WorkCard({ project, i }: { project: Project; i: number }) {
  return (
    <Reveal y={40} delay={i * 0.1}>
      <article className="group relative">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/60 p-8 sm:p-12 backdrop-blur-md transition-all duration-500 hover:border-red-500/40 hover:bg-black/80 hover:shadow-2xl hover:shadow-red-500/5">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="font-mono text-base font-semibold text-crimson">
                  {String(project.index).padStart(2, "0")}
                </span>
                <span className="h-px w-6 bg-white/20" />
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-zinc-400">
                  {project.category}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-0.5 font-sans text-xs text-zinc-400">
                  {project.year}
                </span>
              </div>

              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-red-400">
                {project.title}
              </h2>

              <p className="mt-5 font-sans text-base sm:text-lg leading-relaxed text-zinc-400">
                {project.tone}
              </p>

              {project.role && (
                <p className="mt-6 font-sans text-xs uppercase tracking-[0.2em] text-crimson">
                  <span className="text-zinc-500">Role: </span>
                  {project.role}
                </p>
              )}

              {project.tags && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 font-sans text-xs text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center lg:items-start">
              <a
                href={project.liveDemo}
                target={project.liveDemo.startsWith("http") ? "_blank" : undefined}
                rel={project.liveDemo.startsWith("http") ? "noreferrer" : undefined}
                className="group/btn inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-sans text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-crimson hover:bg-crimson hover:text-white hover:shadow-lg hover:shadow-crimson/20"
              >
                <span>Live Experience</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Work() {
  const [activeFilter, setActiveFilter] = useState("all");

  const categories = [
    { id: "all", label: "All Works" },
    { id: "apps", label: "Web Apps & Platforms" },
    { id: "flagships", label: "Flagships & Websites" },
    { id: "branding", label: "Brand Systems" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "apps") return p.category.toLowerCase().includes("app") || p.category.toLowerCase().includes("platform");
    if (activeFilter === "flagships") return p.category.toLowerCase().includes("website") || p.category.toLowerCase().includes("flagship");
    if (activeFilter === "branding") return p.category.toLowerCase().includes("brand");
    return true;
  });

  return (
    <div className="relative min-h-screen pt-32 pb-24 sm:pt-40">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[15%] -z-10 h-[70vmin] w-[70vmin] rounded-full blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(192,56,43,0.14), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-crimson" />
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                Selected Portfolio
              </span>
            </div>
          </Reveal>

          <MaskedHeading
            as="h1"
            className="font-display text-[12vw] font-medium leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-8xl"
            lines={[
              <>Digital products,</>,
              <>
                built to{" "}
                <span className="font-serif font-normal italic text-crimson">
                  endure.
                </span>
              </>,
            ]}
          />

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
              A curated catalog of full-stack web applications, custom digital products, SaaS platforms, and brand flagships engineered with technical precision, high-density ergonomics, and bespoke design.
            </p>
          </Reveal>
        </div>

        {/* Filter Pills */}
        <Reveal delay={0.25}>
          <div className="mb-14 flex flex-wrap gap-2 sm:gap-3 border-y border-ink/10 py-4">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                className={`rounded-full px-5 py-2 font-sans text-xs uppercase tracking-[0.25em] transition-all duration-300 ${
                  activeFilter === c.id
                    ? "bg-crimson text-ivory shadow-lg shadow-crimson/20"
                    : "border border-ink/10 bg-ink/[0.02] text-ink-soft hover:border-ink/30 hover:text-ink"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Project Grid */}
        <div className="flex flex-col gap-16 sm:gap-24">
          {filteredProjects.map((p, i) => (
            <WorkCard key={p.index} project={p} i={i} />
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-32 rounded-3xl border border-ink/10 bg-paper/60 p-8 sm:p-16 backdrop-blur-md">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-crimson">
                New projects
              </span>
              <h3 className="mt-4 font-display text-4xl font-medium text-ink sm:text-6xl">
                Ready to build your next digital product?
              </h3>
              <p className="mt-4 max-w-md font-sans text-sm sm:text-base text-ink-soft">
                We accept a limited number of product commissions per quarter to ensure hyper-focused, end-to-end engineering.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson"
            >
              Start a project
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
