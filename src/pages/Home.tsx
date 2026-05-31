import { useRef, useState, useMemo, type FormEvent, type ChangeEvent } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MaskedHeading } from "../components/MaskedHeading";
import { Marquee } from "../components/Marquee";
import { Reveal } from "../components/Reveal";

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
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 sm:px-10"
    >
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-transparent to-ivory/90" />
      </motion.div>
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
      <div className="line-texture pointer-events-none absolute inset-0 -z-10 opacity-20" />
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
   WORK SECTION
   ============================================================================ */

type Project = {
  index: string;
  title: string;
  category: string;
  year: string;
  image: string;
  tone: string;
};

const projects: Project[] = [
  {
    index: "01",
    title: "Sonder Cafe",
    category: "Brand · Website",
    year: "2025",
    image: "/images/Sonder-cafe.png",
    tone: "Architecture studio identity & immersive portfolio.",
  },
  {
    index: "02",
    title: "Sienvera",
    category: "Branding · Art Direction",
    year: "2025",
    image: "/images/Sienvera.png",
    tone: "A bold editorial identity for a fashion house.",
  },
  {
    index: "03",
    title: "Folio Café",
    category: "Website · UI/UX",
    year: "2024",
    image: "/images/folio-cafe.png",
    tone: "A warm, tactile digital home for a specialty café.",
  },
  {
    index: "04",
    title: "Form & Field",
    category: "Creative Direction",
    year: "2024",
    image: "/images/form-field.png",
    tone: "Geometric campaign system for a design collective.",
  },
];

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const offset = i % 2 === 0 ? "md:mt-0" : "md:mt-28";

  return (
    <Reveal y={48} className={offset}>
      <div ref={ref} className="group relative">
        <a href="#contact" className="block">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-paper sm:aspect-[4/3]">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              style={{ y: imgY }}
              className="absolute inset-0 h-[124%] w-full -translate-y-[8%] object-cover grayscale-[0.25] transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-30" />

            <span className="absolute left-5 top-5 font-display text-sm font-medium text-ivory mix-blend-difference">
              ({project.index})
            </span>

            <div className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-ivory text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              →
            </div>
          </div>

          <div className="mt-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors duration-500 group-hover:text-crimson sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 max-w-sm font-sans text-sm text-ink-soft">
                {project.tone}
              </p>
            </div>
            <div className="text-right">
              <p className="font-sans text-xs uppercase tracking-widest text-ink-soft">
                {project.category}
              </p>
              <p className="mt-1 font-sans text-xs text-ink-soft/60">
                {project.year}
              </p>
            </div>
          </div>
        </a>
      </div>
    </Reveal>
  );
}

function Work() {
  return (
    <section id="work" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-crimson" />
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                Selected Work
              </span>
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-[10vw] font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Website design and branding
              <br />
              <span className="font-serif font-normal italic text-crimson">
                built for startups.
              </span>{" "}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-ink-soft">
              A small, curated selection of website design, landing page design
              and branding work. Each project is treated as a campaign — art-
              directed end to end.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-20 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.index} project={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   PHILOSOPHY SECTION
   ============================================================================ */

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

function Philosophy() {
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

/* ============================================================================
   SERVICES SECTION
   ============================================================================ */

const services = [
  {
    no: "01",
    title: "Website Design",
    desc: "Custom websites that turn startups and modern brands into immersive digital atmospheres.",
  },
  {
    no: "02",
    title: "Landing Page Design",
    desc: "High-conversion landing pages engineered to make a first impression land and convert.",
  },
  {
    no: "03",
    title: "Branding",
    desc: "Identity systems with a point of view — typography, tone, marks and meaning.",
  },
  {
    no: "04",
    title: "UI/UX Design",
    desc: "Interfaces designed around feeling and flow, not just function and grids.",
  },
  {
    no: "05",
    title: "Creative Direction",
    desc: "End-to-end art direction that keeps every touchpoint intentional and aligned.",
  },
  {
    no: "06",
    title: "SEO Setup",
    desc: "Technical SEO foundations for performance, indexing and discoverability from day one.",
  },
];

function Services() {
  return (
    <section id="services" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-crimson" />
              <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                Services
              </span>
            </div>
            <h2 className="mt-5 max-w-2xl font-display text-[10vw] font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Website design, branding and UI/UX{" "}
              <span className="font-serif font-normal italic text-crimson">
                crafted to rank.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 border-t border-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.no} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden border-b border-ink/10 p-8 transition-colors duration-700 hover:bg-ink sm:p-10 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-ink/10 lg:border-r">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-crimson/0 blur-3xl transition-all duration-700 group-hover:bg-crimson/30" />

                <div className="relative flex items-start justify-between">
                  <span className="font-display text-sm font-medium text-ink-soft transition-colors duration-700 group-hover:text-ivory/50">
                    ({s.no})
                  </span>
                  <span className="translate-x-2 text-ink-soft opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:text-crimson group-hover:opacity-100">
                    →
                  </span>
                </div>

                <h3 className="relative mt-16 font-display text-3xl font-semibold tracking-tight text-ink transition-colors duration-700 group-hover:text-ivory sm:text-4xl">
                  {s.title}
                </h3>
                <p className="relative mt-4 max-w-xs font-sans text-sm leading-relaxed text-ink-soft transition-colors duration-700 group-hover:text-ivory/70">
                  {s.desc}
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
   PROCESS SECTION
   ============================================================================ */

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

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.6"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="process"
      className="relative overflow-hidden border-y border-ink/5 bg-ink/[0.03] px-6 py-28 text-ink backdrop-blur-md sm:px-10 sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-[60vmin] w-[60vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,56,43,0.18), transparent 65%)",
        }}
      />
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-crimson" />
            <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft/60">
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
          <div className="absolute left-0 top-0 h-full w-px bg-ink/10 sm:left-2" />
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
                  <div className="max-w-xl border-t border-ink/10 pt-5">
                    <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                      {s.title}
                    </h3>
                    <p className="mt-3 font-sans text-base leading-relaxed text-ink-soft/70">
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

/* ============================================================================
   CONTACT SECTION
   ============================================================================ */

type FieldProps = {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  required?: boolean;
};

function Field({
  label,
  type = "text",
  name,
  value,
  onChange,
  textarea = false,
  required = false,
}: FieldProps) {
  const focused = value.length > 0;
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onChange(e.target.value);

  const sharedProps = {
    id: name,
    name,
    value,
    placeholder: label,
    required,
    onChange: handleChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
  };

  const inputClass =
    "peer relative z-10 w-full border-b border-ink/20 bg-transparent py-2.5 font-sans text-base text-ink outline-none transition-colors duration-500 placeholder-transparent focus:border-transparent lg:text-lg";

  return (
    <div className="relative">
      {textarea ? (
        <textarea rows={3} className={inputClass} {...sharedProps} />
      ) : (
        <input type={type} className={inputClass} {...sharedProps} />
      )}

      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-crimson transition-transform duration-500 ease-out"
        style={{ transform: isFocused ? "scaleX(1)" : "scaleX(0)" }}
      />

      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-sans text-ink-soft transition-all duration-500 ${
          focused || isFocused
            ? "-top-3 text-xs tracking-wide text-crimson"
            : "top-3 text-lg"
        }`}
      >
        {label}
        {required && (
          <span className="ml-1 text-crimson" aria-hidden>
            *
          </span>
        )}
      </label>
    </div>
  );
}

type FormState = "idle" | "sending" | "sent";

const socials = [
  { label: "Dribbble", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
];

const contactSteps = [
  {
    n: "01",
    title: "You reach out",
    body: "Share a few details — no brief required.",
  },
  {
    n: "02",
    title: "We reply within 48h",
    body: "A real human, usually the founder.",
  },
  {
    n: "03",
    title: "Kick-off call",
    body: "30 minutes to see if we're a fit.",
  },
];

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormState>("idle");

  const update = (key: keyof typeof form) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const canSubmit = useMemo(
    () =>
      status === "idle" &&
      form.name.trim().length > 0 &&
      form.email.trim().length > 2 &&
      form.message.trim().length > 0,
    [form, status],
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    try {
      setStatus("sending");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed");
      }

      setStatus("sent");

      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          message: "",
        });

        setStatus("idle");
      }, 3200);
    } catch (error) {
      console.error(error);
      alert("Failed to send enquiry.");
      setStatus("idle");
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-20 sm:px-10 lg:flex lg:min-h-screen lg:items-center lg:py-10"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[15%] top-1/4 -z-10 h-[55vmin] w-[55vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,56,43,0.16), transparent 65%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] bottom-[-10%] -z-10 h-[45vmin] w-[45vmin] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192,56,43,0.10), transparent 65%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs tracking-[0.3em] text-ink-soft">
                  04
                </span>
                <span className="h-px w-10 bg-crimson" />
                <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Contact
                </span>
              </div>
            </Reveal>

            <MaskedHeading
              as="h2"
              className="mt-4 font-display text-[13vw] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:mt-5 lg:text-6xl xl:text-7xl"
              lines={[
                <>Let's build</>,
                <>
                  something{" "}
                  <span className="font-serif font-normal italic text-crimson">
                    memorable.
                  </span>
                </>,
              ]}
            />

            <Reveal delay={0.2}>
              <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ink-soft sm:text-lg lg:mt-5">
                A small studio building thoughtful brands and digital products.
                We take on a handful of projects each quarter — if you've got an
                idea worth making, we'd love to hear it.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-5 rounded-sm border border-ink/10 bg-ivory/40 p-5 backdrop-blur-sm sm:p-6 lg:p-5">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson/60 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson" />
                  </span>
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft">
                    Available for Q1 2026
                  </span>
                </div>

                <a
                  href="mailto:hello@buildyn.in"
                  className="group mt-4 inline-flex items-baseline gap-2 font-display text-xl font-medium text-ink transition-colors hover:text-crimson sm:text-2xl lg:text-2xl"
                >
                  <span className="bg-gradient-to-r from-crimson to-crimson bg-[length:0_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    hello@buildyn.in
                  </span>
                  <span className="text-crimson transition-transform duration-500 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

                <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4 font-sans">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                      Based in
                    </dt>
                    <dd className="mt-2 text-sm text-ink">
                      India / Worldwide
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                      Response time
                    </dt>
                    <dd className="mt-2 text-sm text-ink">Within 48 hours</dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 border-t border-ink/10 pt-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 font-sans text-sm text-ink transition-colors hover:text-crimson"
                    >
                      {s.label}
                      <span className="text-xs text-crimson transition-transform duration-300 group-hover:translate-x-0.5">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col">
            <Reveal delay={0.15}>
              <div className="relative flex flex-col rounded-sm border border-ink/10 bg-ivory/40 p-6 backdrop-blur-sm sm:p-8 lg:p-6">
                <span
                  aria-hidden
                  className="absolute -right-3 -top-3 font-display text-5xl font-extrabold leading-none text-crimson/15"
                >
                  04
                </span>

                <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
                  <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">
                    Start a project
                  </h3>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                    ~2 min read
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {status !== "sent" ? (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={onSubmit}
                      className="flex flex-col gap-5 lg:gap-4"
                      noValidate={false}
                    >
                      <Field
                        label="Your name"
                        name="name"
                        value={form.name}
                        onChange={update("name")}
                        required
                      />
                      <Field
                        label="Email address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        required
                      />
                      <Field
                        label="Tell us about your project"
                        name="message"
                        value={form.message}
                        onChange={update("message")}
                        textarea
                        required
                      />

                      <button
                        type="submit"
                        disabled={!canSubmit || status === "sending"}
                        className="group mt-2 flex items-center justify-center gap-3 rounded-full bg-ink py-4 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {status === "sending" ? (
                          <>
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Send enquiry
                            <span className="transition-transform duration-500 group-hover:translate-x-1 group-disabled:translate-x-0">
                              →
                            </span>
                          </>
                        )}
                      </button>

                      <p className="text-center font-sans text-[11px] text-ink-soft">
                        We'll never share your details. By submitting you agree
                        to our{" "}
                        <a
                          href="/privacy-policy"
                          className="underline underline-offset-2 hover:text-crimson"
                        >
                          privacy policy
                        </a>
                        .
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex flex-col items-center py-10 text-center"
                      role="status"
                      aria-live="polite"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-crimson/10 text-crimson">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-6 w-6"
                        >
                          <motion.path
                            d="M5 12l5 5L20 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </svg>
                      </span>
                      <h4 className="mt-6 font-display text-2xl font-medium text-ink">
                        Thank you — message sent.
                      </h4>
                      <p className="mt-3 max-w-xs font-sans text-sm text-ink-soft">
                        We'll be in touch within 48 hours. In the meantime,
                        grab a coffee and maybe peek at our recent work.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mt-5 grid grid-cols-3 gap-4 border-t border-ink/10 pt-5 lg:mt-4 lg:pt-4">
                {contactSteps.map((s) => (
                  <div key={s.n}>
                    <span className="font-display text-[10px] tracking-[0.3em] text-crimson lg:text-xs">
                      {s.n}
                    </span>
                    <h4 className="mt-1.5 font-display text-xs font-medium text-ink lg:text-sm">
                      {s.title}
                    </h4>
                    <p className="mt-0.5 font-sans text-[11px] leading-relaxed text-ink-soft lg:text-xs">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   FOOTER SECTION
   ============================================================================ */

function Footer() {
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
              <a
                href="#work"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Work
              </a>
              <a
                href="#philosophy"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Studio
              </a>
              <a
                href="#services"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Services
              </a>
              <a
                href="#process"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Process
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft/60">
                Contact
              </span>
              <a
                href="mailto:hello@buildyn.in"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                hello@buildyn.in
              </a>
              <a
                href="#services"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Website design
              </a>
              <a
                href="#contact"
                className="font-sans text-sm text-ink transition-colors hover:text-crimson"
              >
                Start a project
              </a>
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

/* ============================================================================
   HOME PAGE EXPORT
   ============================================================================ */

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <Philosophy />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </>
  );
}
