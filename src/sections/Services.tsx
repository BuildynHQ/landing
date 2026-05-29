import { Reveal } from "../components/Reveal";

const services = [
  {
    no: "01",
    title: "Websites",
    desc: "Custom, hand-built websites that turn brands into immersive digital atmospheres.",
  },
  {
    no: "02",
    title: "Landing Pages",
    desc: "High-conversion, cinematic single pages engineered to make a first impression land.",
  },
  {
    no: "03",
    title: "Branding",
    desc: "Identity systems with a point of view — typography, tone, marks and meaning.",
  },
  {
    no: "04",
    title: "UI / UX Design",
    desc: "Interfaces designed around feeling and flow, not just function and grids.",
  },
  {
    no: "05",
    title: "Creative Direction",
    desc: "End-to-end art direction that keeps every touchpoint intentional and aligned.",
  },
  {
    no: "06",
    title: "SEO & Optimization",
    desc: "Performance, structure and visibility — premium that loads fast and ranks.",
  },
];

export function Services() {
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
              What we{" "}
              <span className="font-serif font-normal italic text-crimson">
                craft.
              </span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 border-t border-ink/10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.no} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden border-b border-ink/10 p-8 transition-colors duration-700 hover:bg-ink sm:p-10 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-ink/10 lg:border-r">
                {/* glow */}
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
