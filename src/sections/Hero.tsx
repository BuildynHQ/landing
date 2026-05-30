import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedHeading } from "../components/MaskedHeading";

export function Hero() {
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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 sm:px-10"
    >
      {/* atmospheric background */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-transparent to-ivory/90" />
      </motion.div>
      {/* soft crimson glow */}
      <motion.div
        aria-hidden
        className="
    pointer-events-none
    absolute
    -right-[15%]
    top-[20%]
    -z-10
    h-[80vmin]
    w-[80vmin]
    rounded-full
    blur-[100px]
  "
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
      {/* line texture */}
      {/* line texture */}
      <div className="line-texture pointer-events-none absolute inset-0 -z-10 opacity-20" />{" "}
      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="mx-auto w-full max-w-[1600px]"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-crimson" />
          <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
            Creative Digital Studio — Est. 2024
          </span>
        </motion.div>

        <div className="relative z-20">
          <MaskedHeading
            as="h1"
            className="
      hero-blend
      font-display
      text-[13vw]
      font-extrabold
      leading-[0.92]
      tracking-[-0.03em]
      sm:text-[11vw]
      lg:text-[8.5vw]
    "
            lines={[
              <>Website design</>,
              <>
                branding and UI/UX{" "}
                <span className="font-serif font-normal italic">
                  intentional.
                </span>
              </>,
            ]}
            stagger={0.14}
            delay={0.2}
          />
        </div>
        <div className="mt-10 flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md font-sans text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            We build website design, landing pages, branding and UI/UX for
            startups and ambitious brands — strategy, story and motion shaped
            into atmospheres people remember.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 1 }}
            className="flex items-center gap-4"
          >
            <a
              href="#work"
              className="group flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson"
            >
              View selected work
              <span className="transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-ink/20 px-7 py-3.5 font-sans text-sm text-ink transition-all duration-500 hover:border-ink/60"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </motion.div>
      {/* scroll cue */}
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
