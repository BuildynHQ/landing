import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../components/Reveal";

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
    image:
      "https://images.pexels.com/photos/3407857/pexels-photo-3407857.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    tone: "Architecture studio identity & immersive portfolio.",
  },
  {
    index: "02",
    title: "Sienvera",
    category: "Branding · Art Direction",
    year: "2025",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    tone: "A bold editorial identity for a fashion house.",
  },
  {
    index: "03",
    title: "Folio Café",
    category: "Website · UI/UX",
    year: "2024",
    image:
      "https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
    tone: "A warm, tactile digital home for a specialty café.",
  },
  {
    index: "04",
    title: "Form & Field",
    category: "Creative Direction",
    year: "2024",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1400",
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

            {/* index badge */}
            <span className="absolute left-5 top-5 font-display text-sm font-medium text-ivory mix-blend-difference">
              ({project.index})
            </span>

            {/* hover CTA */}
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

export function Work() {
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
