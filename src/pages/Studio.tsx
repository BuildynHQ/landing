import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedHeading } from "../components/MaskedHeading";
import { Reveal } from "../components/Reveal";

const words =
  "We don't just design interfaces. We engineer complete digital systems — robust architecture, tactile UX, and enduring products built to perform.".split(
    " "
  );

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className="text-ink">
        {word}
      </motion.span>
    </span>
  );
}

export default function Studio() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const principles = [
    {
      pillar: "Architecture",
      subtitle: "underpins every interface.",
      desc: "Design without engineering integrity is a facade. We build solid data models, scalable backend systems, and clean front-ends together.",
    },
    {
      pillar: "Clarity",
      subtitle: "over unnecessary complexity.",
      desc: "Whether constructing high-density admin consoles or public landing pages, every interaction is engineered for speed, human ergonomics, and effortless comprehension.",
    },
    {
      pillar: "Craft",
      subtitle: "in every layer of code.",
      desc: "From database indexes to pixel-perfect micro-animations, we reject sloppy shortcuts. Every line of TypeScript, CSS, and API logic is written with precision.",
    },
    {
      pillar: "Longevity",
      subtitle: "is our engineering standard.",
      desc: "We architect digital products that endure — scalable codebases, modular component systems, and resilient infrastructure ready for long-term growth.",
    },
  ];

  const beliefs = [
    {
      title: "Zero Templates, Ever",
      desc: "We reject generic starter themes and fragile visual builders. Every system is purpose-built from ground zero with modern engineering standards.",
    },
    {
      title: "Design Meets Deep Tech",
      desc: "We eliminate the friction between design teams and developers. We build the actual technology behind our designs — APIs, databases, state, and UI.",
    },
    {
      title: "Full-Lifecycle Delivery",
      desc: "From initial product scoping and wireframing through cloud infrastructure and continuous deployment, we own the full delivery lifecycle.",
    },
    {
      title: "Founder-to-Engineer Direct",
      desc: "Work directly with the core product designers and software engineers building your software. No account managers, no game of telephone.",
    },
  ];

  return (
    <div className="relative min-h-screen pt-32 pb-24 sm:pt-40">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[70vmin] w-[70vmin] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(192,56,43,0.12), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        {/* Header */}
        <div className="mb-20 max-w-4xl">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-crimson" />
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                About the Studio
              </span>
            </div>
          </Reveal>

          <MaskedHeading
            as="h1"
            className="font-display text-[12vw] font-medium leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-8xl"
            lines={[
              <>Engineering systems,</>,
              <>
                shaping{" "}
                <span className="font-serif font-normal italic text-crimson">
                  experiences.
                </span>
              </>,
            ]}
          />

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-ink-soft sm:text-xl">
              Buildyn is an independent digital product and software engineering studio. We design and build complete digital products and systems — from concept, UI/UX architecture, and brand identity through full-stack web applications, custom APIs, dashboards, and production deployment.
            </p>
          </Reveal>
        </div>

        {/* Word Scroll Section */}
        <div className="my-24 rounded-3xl border border-ink/10 bg-paper/60 px-6 py-24 sm:px-14 sm:py-36 backdrop-blur-md">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <div className="mb-10 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-crimson" />
                <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                  The Core Manifesto
                </span>
              </div>
            </Reveal>

            <p
              ref={ref}
              className="text-center font-display text-[7.5vw] font-bold leading-[1.1] tracking-[-0.02em] text-balance sm:text-5xl lg:text-[4rem]"
            >
              {words.map((w, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word
                    key={i}
                    word={w}
                    range={[start, end]}
                    progress={scrollYProgress}
                  />
                );
              })}
            </p>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-32">
          <Reveal>
            <div className="mb-12">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-crimson">
                Philosophy
              </span>
              <h2 className="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">
                Four foundational pillars
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.pillar} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 sm:p-10 transition-colors hover:border-crimson/30 hover:bg-ink/[0.04]">
                  <span className="font-mono text-xs text-crimson">0{i + 1} //</span>
                  <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold text-ink">
                    {p.pillar}{" "}
                    <span className="font-serif font-normal italic text-crimson">
                      {p.subtitle}
                    </span>
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft sm:text-base">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Studio Beliefs */}
        <div className="mb-32 border-t border-ink/10 pt-20">
          <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-crimson">
                Method
              </span>
              <h2 className="mt-3 font-display text-4xl font-medium text-ink sm:text-5xl">
                How we operate
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm text-ink-soft">
              We operate as a high-density, focused partner rather than a high-volume agency. Every line of code and every keyframe is scrutinized.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08}>
                <div className="border-t border-ink/10 pt-6">
                  <span className="font-mono text-xs text-ink-soft/60">0{i + 1}</span>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {b.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
                    {b.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-ink/10 bg-paper/60 p-8 sm:p-16 backdrop-blur-md">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-crimson">
                Collaboration
              </span>
              <h3 className="mt-4 font-display text-4xl font-medium text-ink sm:text-6xl">
                Ready to engineer a system that endures?
              </h3>
              <p className="mt-4 max-w-md font-sans text-sm sm:text-base text-ink-soft">
                Let's talk about your product roadmap and how we can architect, design, and engineer it from concept to deployment.
              </p>
            </div>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson"
            >
              Get in touch
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
