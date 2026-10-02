import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedHeading } from "../components/MaskedHeading";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";

/* ============================================================================
   HERO SECTION
   ============================================================================ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-6 pt-24 pb-8 sm:px-10 sm:pt-28 sm:pb-10"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-transparent to-ivory/90" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] top-[20%] -z-10 h-[80vmin] w-[80vmin] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(192,56,43,0.12), transparent 70%)",
        }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.08), rgba(0,0,0,.22))",
        }}
      />
      <div className="line-texture pointer-events-none absolute inset-0 -z-10 opacity-20" />
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between"
      >
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-crimson" />
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
              Digital Product &amp; Software Studio — Est. 2026
            </span>
          </motion.div>

          <div className="relative z-20 mt-6 sm:mt-8">
            <MaskedHeading
              as="h1"
              className="hero-blend font-display text-[13vw] font-medium leading-[0.92] tracking-[-0.03em] sm:text-[11vw] lg:text-[8.5vw]"
              lines={[
                <>Digital products</>,
                <>
                  and software{" "}
                  <span className="font-serif font-normal italic">
                    engineered.
                  </span>
                </>,
              ]}
              stagger={0.14}
              delay={0.2}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md font-sans text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            We architect, design, and engineer complete digital products — from
            high-converting marketing flagships and SaaS platforms to admin dashboards
            and custom software systems. Concept to production deployment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 1 }}
            className="flex items-center gap-4"
          >
            <Link
              to="/work"
              className="group flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson"
            >
              View selected work
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-ink/20 px-7 py-3.5 font-sans text-sm text-ink transition-all duration-500 hover:border-ink/60"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-soft/60">
          Scroll
        </span>
        <motion.span
          className="h-10 w-px bg-gradient-to-b from-crimson to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* ============================================================================
   CURATED WORK SPOTLIGHT (INTERACTIVE ROSTER)
   ============================================================================ */

function CuratedWork() {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-crimson" />
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                Curated Releases // 2025—2026
              </span>
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-[10vw] font-medium leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Selected systems,{" "}
              <span className="font-serif font-normal italic text-crimson">
                built to endure.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:text-crimson"
            >
              <span>Explore full portfolio</span>
              <span className="text-crimson transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Project Roster Items */}
        <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
          {projects.map((p, i) => (
            <Reveal key={p.index} delay={i * 0.08}>
              <div className="group relative flex flex-col justify-between gap-8 py-10 transition-colors duration-500 hover:bg-white/[0.02] sm:py-12 lg:flex-row lg:items-center lg:px-6">
                {/* Left: Index & Title */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
                  <span className="font-mono text-base font-semibold text-crimson">
                    {String(p.index).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-red-400">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-xl font-sans text-sm text-zinc-400 leading-relaxed">
                      {p.tone}
                    </p>
                  </div>
                </div>

                {/* Right: Meta & Direct Link */}
                <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-10 lg:justify-end">
                  <div className="flex flex-col lg:items-end">
                    <span className="font-sans text-xs uppercase tracking-[0.25em] text-zinc-500">
                      {p.category}
                    </span>
                    <span className="mt-1 font-mono text-xs text-zinc-400">
                      {p.year}
                    </span>
                  </div>

                  <a
                    href={p.liveDemo}
                    target={p.liveDemo.startsWith("http") ? "_blank" : undefined}
                    rel={p.liveDemo.startsWith("http") ? "noreferrer" : undefined}
                    className="group/btn inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:border-crimson hover:bg-crimson hover:text-white"
                  >
                    <span>View Project</span>
                    <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-12 flex justify-end">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-ink-soft transition-colors hover:text-crimson"
          >
            <span>View all archive case studies</span>
            <span className="text-crimson transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   STUDIO SNAPSHOT (ETHOS & METRICS)
   ============================================================================ */

function StudioSnapshot() {
  const metrics = [
    {
      no: "01",
      title: "Bespoke Architecture",
      desc: "Zero cookie-cutter templates or fragile stacks. We write clean, resilient full-stack code and custom design systems from ground zero.",
    },
    {
      no: "02",
      title: "Concept to Deployment",
      desc: "From initial product wireframing and UI/UX design to backend development, database architecture, and live cloud deployment.",
    },
    {
      no: "03",
      title: "Sub-Second Performance",
      desc: "Engineered for high throughput, fluid interaction states, and airtight security across SaaS platforms, dashboards, and flagships.",
    },
    {
      no: "04",
      title: "Direct Engineer Access",
      desc: "Collaborate directly with the senior product designers and software engineers building your system. Zero agency bureaucracy.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-paper/60 px-6 py-28 sm:px-10 sm:py-36 backdrop-blur-md border-y border-ink/10">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(192,56,43,0.12), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Left Column: Manifesto Headline */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-crimson" />
                <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                  The Studio Perspective
                </span>
              </div>

              <h2 className="mt-6 font-display text-4xl sm:text-6xl font-medium leading-[1.05] tracking-tight text-ink">
                We engineer complete digital systems for founders who refuse to{" "}
                <span className="font-serif font-normal italic text-crimson">
                  compromise.
                </span>
              </h2>

              <p className="mt-8 max-w-xl font-sans text-base sm:text-lg leading-relaxed text-ink-soft">
                Most agencies either hand off non-functional Figma mockups or ship rigid templates. We bridge the gap completely — uniting world-class UI/UX and design systems with robust full-stack software engineering, custom backend APIs, and scalable infrastructure.
              </p>

              <div className="mt-10">
                <Link
                  to="/studio"
                  className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson"
                >
                  Read our full studio manifesto
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 4 Stat/Ethos Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {metrics.map((m, i) => (
              <Reveal key={m.no} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:border-red-500/30 hover:bg-black/60">
                  <span className="font-mono text-xs text-crimson">{m.no} //</span>
                  <h3 className="mt-3 font-display text-xl font-bold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-zinc-400">
                    {m.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   CAPABILITIES MATRIX
   ============================================================================ */

function CapabilitiesMatrix() {
  const capabilities = [
    {
      num: "01",
      title: "Full-Stack Web Apps & SaaS",
      tag: "End-to-End Platforms",
      desc: "Scalable web applications, subscription SaaS platforms, and interactive digital products built with robust backend architectures, APIs, and real-time state synchronization.",
    },
    {
      num: "02",
      title: "Admin Panels & Dashboards",
      tag: "Operational Software",
      desc: "Custom management panels, internal business software, analytics consoles, and workflow automation systems tailored to streamline mission-critical operations.",
    },
    {
      num: "03",
      title: "Marketing Flagships & Sites",
      tag: "Brand & Growth Presence",
      desc: "High-impact marketing websites and conversion-focused landing experiences that combine cinematic aesthetic finish with rapid load speeds and flawless responsiveness.",
    },
    {
      num: "04",
      title: "UI/UX & Design Systems",
      tag: "Product Architecture",
      desc: "Ergonomic interface design, reusable design token libraries, and rigorous component systems that scale seamlessly from initial MVP to enterprise product lines.",
    },
  ];

  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-crimson" />
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                System Capabilities
              </span>
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-[10vw] font-medium leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Full-spectrum product{" "}
              <span className="font-serif font-normal italic text-crimson">
                engineering.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:text-crimson"
            >
              <span>Explore all 6 capability specifications</span>
              <span className="text-crimson transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* 4 Quadrants Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal key={c.num} delay={i * 0.08}>
              <div className="group relative h-full rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 sm:p-12 transition-all duration-500 hover:border-crimson/40 hover:bg-ink/[0.04]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-crimson">
                    {c.num} //
                  </span>
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-ink-soft/60">
                    {c.tag}
                  </span>
                </div>

                <h3 className="mt-8 font-display text-2xl sm:text-3xl font-bold text-ink transition-colors group-hover:text-crimson">
                  {c.title}
                </h3>

                <p className="mt-4 font-sans text-sm sm:text-base leading-relaxed text-ink-soft">
                  {c.desc}
                </p>

                <div className="mt-8 pt-6 border-t border-ink/10">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.2em] text-ink-soft group-hover:text-ink transition-colors"
                  >
                    <span>Read deliverables</span>
                    <span className="text-crimson">→</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   THE METHOD HIGHLIGHT
   ============================================================================ */

function MethodHighlight() {
  const steps = [
    {
      num: "01",
      name: "Architecture & Strategy",
      detail: "We define product requirements, data flows, and technical stacks before designing, ensuring sound engineering architecture from day one.",
    },
    {
      num: "02",
      name: "UI/UX & Interactive Systems",
      detail: "High-fidelity prototypes, ergonomic component libraries, and tactile interaction design tested for real-world usability and developer handoff.",
    },
    {
      num: "03",
      name: "Full-Stack Build & Deploy",
      detail: "Production-grade code, API integrations, security hardening, database modeling, and automated cloud deployment pipelines.",
    },
  ];

  return (
    <section className="relative border-t border-ink/10 bg-ink/[0.02] px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-crimson" />
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                Product Delivery
              </span>
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-[10vw] font-medium leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              From architecture to{" "}
              <span className="font-serif font-normal italic text-crimson">
                production launch.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/process"
              className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:text-crimson"
            >
              <span>Explore full 5-phase process</span>
              <span className="text-crimson transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.08}>
              <div className="h-full border-t border-ink/20 pt-6">
                <span className="font-mono text-sm text-crimson">{s.num} //</span>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink">
                  {s.name}
                </h3>
                <p className="mt-3 font-sans text-sm sm:text-base leading-relaxed text-ink-soft">
                  {s.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   START A PROJECT CTA BANNER
   ============================================================================ */

function StudioInvitation() {
  return (
    <section className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-paper/80 p-8 sm:p-16 lg:p-20 backdrop-blur-md">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-crimson/15 blur-3xl"
          />

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson/60 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson" />
              </span>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft">
                Currently Booking // Q1 &amp; Q2 2026
              </span>
            </div>

            <h2 className="mt-6 font-display text-4xl sm:text-6xl lg:text-7xl font-medium text-ink leading-[1.02]">
              Ready to build a digital product that{" "}
              <span className="font-serif font-normal italic text-crimson">
                dominates its category?
              </span>
            </h2>

            <p className="mt-6 max-w-xl font-sans text-base sm:text-lg text-ink-soft leading-relaxed">
              Whether you're launching a new SaaS platform, building custom internal software, or engineering an iconic digital flagship — let's build something exceptional together.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-4 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson"
              >
                Start a project
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <a
                href="mailto:hello@buildyn.in"
                className="rounded-full border border-ink/20 px-8 py-4 font-sans text-sm text-ink transition-all duration-500 hover:border-ink/60"
              >
                hello@buildyn.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   HOME PAGE EXPORT
   ============================================================================ */

export default function Home() {
  return (
    <>
      <Hero />
      <CuratedWork />
      <StudioSnapshot />
      <CapabilitiesMatrix />
      <MethodHighlight />
      <StudioInvitation />
    </>
  );
}

