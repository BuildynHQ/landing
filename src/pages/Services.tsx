import { Link } from "react-router-dom";
import { MaskedHeading } from "../components/MaskedHeading";
import { Reveal } from "../components/Reveal";

const servicesList = [
  {
    no: "01",
    title: "Full-Stack Web Apps & SaaS",
    tagline: "Scalable digital products engineered from data layer to interface.",
    desc: "We design and build complete web applications and subscription software platforms. From authentication, database architecture, and API integration to state management and real-time features, we take products from concept through full production deployment.",
    deliverables: [
      "End-to-End Application Architecture",
      "Robust State & Real-time Data Sync",
      "Authentication, RBAC & Multi-tenancy",
      "Modern React / Next.js / TypeScript Stacks",
      "Cloud Infrastructure & CI/CD Pipelines",
    ],
    idealFor: "Founders building new SaaS platforms, interactive digital tools, or scaling web products with serious technical demands.",
  },
  {
    no: "02",
    title: "Admin Dashboards & Internal Software",
    tagline: "Mission-critical control centers and custom business tools.",
    desc: "Off-the-shelf software rarely fits bespoke business workflows. We engineer high-density admin consoles, internal operations platforms, data analytics dashboards, and workflow automation panels tailored to your team's exact operations.",
    deliverables: [
      "High-Density Data Tables & Filtering",
      "Interactive Analytics & Metric Visualization",
      "Role-Based Permissions & Audit Logs",
      "Workflow Automation & CRUD Operations",
      "Third-Party Service & ERP Integrations",
    ],
    idealFor: "Companies needing custom operational tools, internal management portals, or SaaS founders building powerful admin backends.",
  },
  {
    no: "03",
    title: "Marketing Websites & Landing Pages",
    tagline: "Flagship digital experiences that command attention and drive conversion.",
    desc: "Your web presence is your primary commercial asset. We architect high-converting landing pages and iconic marketing platforms that blend cinematic aesthetic polish, responsive interaction, and fast load speeds.",
    deliverables: [
      "Custom Art Direction & Responsive Layouts",
      "Cinematic Motion & Micro-interactions",
      "High-Converting Landing Funnels",
      "Technical SEO & Structured Data Markup",
      "Fast Load Optimization & Sub-second TTI",
    ],
    idealFor: "Companies launching new products, entering growth stages, or needing a digital flagship that reflects true market leadership.",
  },
  {
    no: "04",
    title: "UI/UX & Design Systems",
    tagline: "Intuitive product design engineered for effortless scale.",
    desc: "We design software interfaces that feel tactile, natural, and immediately intuitive. We construct comprehensive design systems with reusable tokens, rigorous component states, and accessibility standards that keep design and engineering in perfect lockstep.",
    deliverables: [
      "Complete Figma Design Token Systems",
      "Ergonomic Product Wireframing & User Journeys",
      "Interactive High-Fidelity Prototypes",
      "Production-Ready Component Libraries",
      "Accessibility (WCAG) Compliance & Micro-copy",
    ],
    idealFor: "Product teams building or scaling digital interfaces who need cohesive design systems ready for engineering implementation.",
  },
  {
    no: "05",
    title: "Custom Software Systems & APIs",
    tagline: "Resilient backend architectures, secure APIs, and custom logic.",
    desc: "Behind every seamless user experience lies reliable server-side engineering. We build secure REST and GraphQL APIs, integrate third-party webhooks, design relational/document schemas, and orchestrate serverless or microservice logic.",
    deliverables: [
      "RESTful & GraphQL API Design",
      "Relational & NoSQL Database Modeling",
      "Webhook Handlers & Payment Pipelines (Stripe)",
      "Security Hardening, Rate Limiting & Auth",
      "Serverless Functions & Background Workers",
    ],
    idealFor: "Products requiring custom backend services, bespoke data pipelines, or seamless integrations across complex third-party platforms.",
  },
  {
    no: "06",
    title: "Interactive Experiences & Creative Tech",
    tagline: "Sensory digital experiences that captivate and linger.",
    desc: "When standard web interfaces aren't enough, we deploy creative engineering — WebGL shaders, 3D interactive product configurators, immersive audio-visual canvas elements, and storytelling mechanisms that leave an indelible impression.",
    deliverables: [
      "Interactive 3D (Three.js / WebGL)",
      "Custom Canvas & Physics-Based Motion",
      "Dynamic Audio & Micro-haptics",
      "Gamified & Interactive Product Demos",
      "Cross-Platform Performance Profiling",
    ],
    idealFor: "Pioneering brands, creative platforms, and hardware/product launches looking to create a category-defining moment.",
  },
];

export default function Services() {
  return (
    <div className="relative min-h-screen pt-32 pb-24 sm:pt-40">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[15%] top-[10%] -z-10 h-[65vmin] w-[65vmin] rounded-full blur-[100px]"
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
                Capabilities &amp; Services
              </span>
            </div>
          </Reveal>

          <MaskedHeading
            as="h1"
            className="font-display text-[12vw] font-medium leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-8xl"
            lines={[
              <>Digital products</>,
              <>
                built from{" "}
                <span className="font-serif font-normal italic text-crimson">
                  concept to code.
                </span>
              </>,
            ]}
          />

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl font-sans text-base leading-relaxed text-ink-soft sm:text-xl">
              We architect, design, and engineer complete digital products and software systems — from high-converting marketing flagships and SaaS platforms to admin dashboards and custom backend APIs.
            </p>
          </Reveal>
        </div>

        {/* Services In-Depth Grid */}
        <div className="flex flex-col gap-12 sm:gap-16">
          {servicesList.map((service, i) => (
            <Reveal key={service.no} delay={i * 0.05}>
              <div className="rounded-3xl border border-ink/10 bg-paper/50 p-8 sm:p-12 lg:p-14 backdrop-blur-sm transition-colors hover:border-crimson/30">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm font-semibold text-crimson">
                        ({service.no})
                      </span>
                      <span className="h-px w-8 bg-ink/10" />
                      <span className="font-sans text-xs uppercase tracking-[0.25em] text-ink-soft/70">
                        Capability
                      </span>
                    </div>

                    <h2 className="mt-6 font-display text-3xl sm:text-5xl font-medium tracking-tight text-ink">
                      {service.title}
                    </h2>

                    <p className="mt-3 font-serif text-lg italic text-crimson sm:text-xl">
                      {service.tagline}
                    </p>

                    <p className="mt-6 max-w-xl font-sans text-sm sm:text-base leading-relaxed text-ink-soft">
                      {service.desc}
                    </p>

                    <div className="mt-8 border-t border-ink/10 pt-6">
                      <span className="font-sans text-xs uppercase tracking-[0.2em] text-ink-soft/60">
                        Best Suited For:
                      </span>
                      <p className="mt-1 font-sans text-sm text-ink-soft">
                        {service.idealFor}
                      </p>
                    </div>
                  </div>

                  {/* Deliverables List */}
                  <div className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-ink/[0.02] p-6 sm:p-8">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest text-ink-soft/60">
                        What's Included
                      </span>
                      <ul className="mt-6 flex flex-col gap-3.5">
                        {service.deliverables.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1 text-xs text-crimson">✦</span>
                            <span className="font-sans text-sm text-ink-soft">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 pt-6 border-t border-ink/10">
                      <Link
                        to="/contact"
                        className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.25em] text-ink transition-colors hover:text-crimson"
                      >
                        Inquire about {service.title}
                        <span className="transition-transform duration-300 group-hover:translate-x-1 text-crimson">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Engagement Models */}
        <div className="my-28 rounded-3xl border border-ink/10 bg-paper/60 p-8 sm:p-14 backdrop-blur-md">
          <div className="mb-12 max-w-xl">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-crimson">
              Models
            </span>
            <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-5xl">
              How we collaborate
            </h2>
            <p className="mt-4 font-sans text-sm text-ink-soft">
              Transparent scope and dedicated attention. Choose the engagement that aligns with your timeline.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-8">
              <span className="font-mono text-xs text-crimson">01 // Sprint</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                Project-Based Scope
              </h3>
              <p className="mt-3 font-sans text-sm text-ink-soft leading-relaxed">
                Fixed scope, clear architecture milestones, and dedicated sprint execution. Ideal for net-new SaaS platforms, web applications, admin portals, or major brand &amp; website builds.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5 font-sans text-xs text-ink-soft/80">
                <li>• 2-8 week delivery timeline</li>
                <li>• Clear weekly working demos &amp; milestones</li>
                <li>• Complete source code &amp; asset ownership</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-8">
              <span className="font-mono text-xs text-crimson">02 // Partnership</span>
              <h3 className="mt-2 font-display text-2xl font-bold text-ink">
                Product Retainer
              </h3>
              <p className="mt-3 font-sans text-sm text-ink-soft leading-relaxed">
                An ongoing product partnership acting as your dedicated design &amp; full-stack software engineering team. Perfect for scaling startups shipping continuous product features, backend updates, and web presence.
              </p>
              <ul className="mt-6 flex flex-col gap-2.5 font-sans text-xs text-ink-soft/80">
                <li>• Dedicated weekly sprint allocation</li>
                <li>• Direct Slack/Discord channel access</li>
                <li>• Priority execution across product, tech &amp; web</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-ink/10 bg-paper/60 p-8 sm:p-16 backdrop-blur-md">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-crimson">
                Get started
              </span>
              <h3 className="mt-4 font-display text-4xl font-medium text-ink sm:text-6xl">
                Ready to begin your project?
              </h3>
              <p className="mt-4 max-w-md font-sans text-sm sm:text-base text-ink-soft">
                Tell us about your objectives and we'll reply within 48 hours with ideas on how to approach it.
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
