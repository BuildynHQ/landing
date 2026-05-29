import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../components/Reveal";

const steps = [
  {
    no: "01",
    title: "Discovery",
    desc: "We listen, research and immerse ourselves in your world, audience and ambition.",
  },
  {
    no: "02",
    title: "Strategy",
    desc: "We define the story, structure and creative direction before a single pixel moves.",
  },
  {
    no: "03",
    title: "Design",
    desc: "Typography, composition and atmosphere come together into an art-directed system.",
  },
  {
    no: "04",
    title: "Development",
    desc: "Clean, performant builds with cinematic motion that stays smooth everywhere.",
  },
  {
    no: "05",
    title: "Launch",
    desc: "We ship, refine and obsess over the details until the presence feels inevitable.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-ink px-6 py-28 text-ivory sm:px-10 sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[60vmin] w-[60vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,56,43,0.28), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-crimson" />
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-ivory/50">
              Process
            </span>
          </div>
          <h2 className="mt-5 max-w-3xl font-display text-[10vw] font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            A measured way to{" "}
            <span className="font-serif font-normal italic text-crimson">
              build.
            </span>
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-20 pl-8 sm:pl-16">
          {/* track */}
          <div className="absolute left-0 top-0 h-full w-px bg-ivory/15 sm:left-2" />
          {/* progress */}
          <motion.div
            style={{ scaleY: lineScale, originY: 0 }}
            className="absolute left-0 top-0 h-full w-px bg-crimson sm:left-2"
          />

          <div className="flex flex-col gap-16 sm:gap-20">
            {steps.map((s, i) => (
              <Reveal key={s.no} delay={i * 0.05} y={36}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-[120px_1fr] sm:gap-12">
                  <span className="font-display text-5xl font-extrabold text-crimson/80 sm:text-6xl">
                    {s.no}
                  </span>
                  <div className="max-w-xl border-t border-ivory/10 pt-5">
                    <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 font-sans text-base leading-relaxed text-ivory/60">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
