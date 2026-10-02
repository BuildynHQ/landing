import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedHeading } from "../components/MaskedHeading";
import { Reveal } from "../components/Reveal";

const processPhases = [
  {
    no: "01",
    phase: "Discovery & System Architecture",
    duration: "Phase 01",
    desc: "Before designing or writing code, we dissect product objectives, target users, data requirements, and technical stack architecture.",
    activities: [
      "Product roadmap & feature scoping",
      "Data modeling, schema design & API planning",
      "Competitive analysis & aesthetic positioning",
      "Infrastructure & tech stack selection",
    ],
  },
  {
    no: "02",
    phase: "Strategy, User Flows & Wireframes",
    duration: "Phase 02",
    desc: "We define the information architecture, user journeys, navigation paradigms, and screen hierarchies through low-fidelity UX wireframes.",
    activities: [
      "User flows & state transition diagrams",
      "Full product wireframing & IA hierarchy",
      "Key conversion & operational funnel mapping",
      "Technical feasibility & API schema reviews",
    ],
  },
  {
    no: "03",
    phase: "UI/UX & Design Systems",
    duration: "Phase 03",
    desc: "Typography, tactile interactions, responsive states, and component tokens come together into a production-ready design system.",
    activities: [
      "Pixel-precise responsive layouts in Figma",
      "Comprehensive design token libraries",
      "Interactive prototypes & micro-interactions",
      "Design review & client calibration rounds",
    ],
  },
  {
    no: "04",
    phase: "Full-Stack Engineering & APIs",
    duration: "Phase 04",
    desc: "We engineer production-grade software: reactive front-ends, robust backend services, APIs, databases, and third-party integrations.",
    activities: [
      "Clean TypeScript, React/Next.js architectures",
      "Backend API development & database integration",
      "State management, auth & role-based access",
      "Performance optimization & accessibility audits",
    ],
  },
  {
    no: "05",
    phase: "Deployment, Testing & Launch",
    duration: "Phase 05",
    desc: "We stress-test across devices, conduct security hardening, configure automated CI/CD pipelines, and deploy to live production cloud infrastructure.",
    activities: [
      "Cross-platform QA, edge-case & security audits",
      "Technical SEO, OpenGraph & schema validation",
      "CI/CD automation & zero-downtime deployment",
      "Production launch, monitoring & full handoff",
    ],
  },
];

const faqs = [
  {
    q: "Do you handle both design and full development?",
    a: "Yes, completely end-to-end. We design the UI/UX, brand identity, and design systems, and we engineer the actual technology behind them — front-end interfaces, backend APIs, databases, admin dashboards, and cloud deployment. You don't have to hire a design agency and a separate engineering team.",
  },
  {
    q: "What types of digital products and systems do you build?",
    a: "We build full-stack web applications, SaaS platforms, custom software systems, admin dashboards, internal business tools, high-converting marketing flagships, and backend APIs. Whether starting from scratch or scaling an existing product, we take it from concept to live deployment.",
  },
  {
    q: "How long does a typical product engagement take?",
    a: "Sprint-based projects typically run between 3 to 8 weeks depending on scope, architecture complexity, and custom feature sets. We work in rapid, transparent cycles with live weekly working demos.",
  },
  {
    q: "Do we own all source code and design files at handoff?",
    a: "100%. You receive complete ownership of all Figma source files, design tokens, databases, architecture docs, and clean, documented Git repository source code with zero vendor lock-in.",
  },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative min-h-screen pt-32 pb-24 sm:pt-40">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[10%] top-[15%] -z-10 h-[65vmin] w-[65vmin] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(192,56,43,0.13), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        {/* Page Header */}
        <div className="mb-20 max-w-4xl">
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-crimson" />
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                The Methodology
              </span>
            </div>
          </Reveal>

          <MaskedHeading
            as="h1"
            className="font-display text-[12vw] font-medium leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-8xl"
            lines={[
              <>A measured way</>,
              <>
                to{" "}
                <span className="font-serif font-normal italic text-crimson">
                  engineer.
                </span>
              </>,
            ]}
          />

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-ink-soft sm:text-xl">
              We eliminate agency fluff, layers of middle managers, and endless deck reviews. Here is our direct, transparent 5-step roadmap from product concept through full development and production deployment.
            </p>
          </Reveal>
        </div>

        {/* Timeline Process */}
        <div ref={ref} className="relative mt-20 mb-32 pl-8 sm:pl-16">
          <div className="absolute left-0 top-0 h-full w-px bg-ink/10 sm:left-2" />
          <motion.div
            style={{ scaleY: lineScale, originY: 0 }}
            className="absolute left-0 top-0 h-full w-px bg-crimson sm:left-2"
          />

          <div className="flex flex-col gap-20 sm:gap-28">
            {processPhases.map((phase, i) => (
              <Reveal key={phase.no} delay={i * 0.06} y={36}>
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[140px_1fr_1fr] lg:gap-12">
                  <div>
                    <span className="font-display text-5xl sm:text-6xl font-extrabold text-crimson">
                      {phase.no}
                    </span>
                    <span className="block mt-2 font-mono text-xs text-ink-soft/70">
                      {phase.duration}
                    </span>
                  </div>

                  <div className="border-t border-ink/10 pt-5">
                    <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-ink">
                      {phase.phase}
                    </h2>
                    <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft">
                      {phase.desc}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-ink-soft/60">
                      Phase Focus
                    </span>
                    <ul className="mt-4 flex flex-col gap-3">
                      {phase.activities.map((act) => (
                        <li key={act} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-ink-soft">
                          <span className="text-crimson">•</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="my-28 border-t border-ink/10 pt-20">
          <div className="mb-14 max-w-xl">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-crimson">
              Questions
            </span>
            <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-5xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.08}>
                <div className="rounded-2xl border border-ink/10 bg-paper/40 p-8">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {f.q}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft">
                    {f.a}
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
                Next steps
              </span>
              <h3 className="mt-4 font-display text-4xl font-medium text-ink sm:text-6xl">
                Ready to take the first step?
              </h3>
              <p className="mt-4 max-w-md font-sans text-sm sm:text-base text-ink-soft">
                Schedule a 30-minute discovery call to see if our methodology is the right fit for your brand.
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
