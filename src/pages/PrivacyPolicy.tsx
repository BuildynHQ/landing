import { useMemo } from "react";
import { Link } from "react-router-dom";

const sections = [
  {
    id: "intro",
    title: "Introduction",
    content:
      "Buildyn respects your privacy and is committed to protecting the information you share with us."
  },
  {
    id: "collect",
    title: "Information We Collect",
    content:
      "We may collect your name, email address, company information, project requirements and any details you voluntarily provide through our contact forms."
  },
  {
    id: "usage",
    title: "How We Use Information",
    content:
      "Information is used to respond to enquiries, communicate about projects, improve our services and maintain website security."
  },
  {
    id: "email",
    title: "Email Communications",
    content:
      "When you submit an enquiry, we may send confirmations, project updates and responses to your requests."
  },
  {
    id: "analytics",
    title: "Analytics",
    content:
      "We may use analytics tools to understand visitor behaviour and improve website performance."
  },
  {
    id: "cookies",
    title: "Cookies",
    content:
      "Cookies may be used to improve functionality and understand website usage patterns."
  },
  {
    id: "third-party",
    title: "Third-Party Services",
    content:
      "Buildyn may use trusted providers for hosting, analytics, email delivery and infrastructure services."
  },
  {
    id: "security",
    title: "Data Security",
    content:
      "Reasonable security measures are implemented to protect information from unauthorized access or disclosure."
  },
  {
    id: "rights",
    title: "Your Rights",
    content:
      "You may request access, correction or deletion of personal information we hold about you."
  },
  {
    id: "contact",
    title: "Contact",
    content:
      "For privacy-related enquiries contact hello@buildyn.in."
  }
];

export default function PrivacyPolicy() {
  const date = useMemo(
    () =>
      new Date().toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric"
      }),
    []
  );

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Back Button */}
        <Link
          to="/"
          className="mb-12 inline-flex items-center gap-2 font-sans text-sm text-zinc-400 transition hover:text-white"
        >
          <span>←</span>
          <span>Back to Home</span>
        </Link>

        {/* Hero */}
        <div className="mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-red-500">
            Legal
          </p>

          <h1 className="text-6xl font-light md:text-8xl">
            Privacy Policy
          </h1>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-500">
            <span>Last Updated: {date}</span>
            <span>•</span>
            <span>Buildyn</span>
            <span>•</span>
            <span>India</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="sticky top-10 h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-zinc-500">
              Quick Navigation
            </p>

            <nav className="space-y-2">
              {sections.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block rounded-xl px-4 py-3 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur md:p-12">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 border-b border-white/10 py-10 last:border-none"
              >
                <h2 className="mb-5 text-3xl font-light">
                  {section.title}
                </h2>

                <p className="max-w-3xl leading-8 text-zinc-400">
                  {section.content}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}