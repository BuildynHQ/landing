import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../components/Reveal";

const words =
  "We don't do generic. We design atmosphere over noise — digital presence built to be felt, trusted, and remembered.".split(
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
  const opacity = useTransform(progress, range, [0.12, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className="text-ink">
        {word}
      </motion.span>
    </span>
  );
}

export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden bg-paper px-6 py-32 sm:px-10 sm:py-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,56,43,0.10), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="mb-12 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-crimson" />
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
              Philosophy
            </span>
          </div>
        </Reveal>

        <p
          ref={ref}
          className="text-center font-display text-[8.5vw] font-bold leading-[1.08] tracking-[-0.02em] text-balance sm:text-5xl lg:text-[4.2rem]"
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

        <div className="mt-24 grid grid-cols-2 gap-10 border-t border-ink/10 pt-12 md:grid-cols-4">
          {[
            ["Presence", "matters more than features."],
            ["Atmosphere", "before information."],
            ["Emotion", "before explanation."],
            ["Restraint", "is a creative discipline."],
          ].map(([k, v], i) => (
            <Reveal key={k} delay={i * 0.08}>
              <p className="font-display text-xl font-semibold text-crimson sm:text-2xl">
                {k}
              </p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-soft">
                {v}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
