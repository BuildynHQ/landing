import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { MaskedHeading } from "../components/MaskedHeading";

function Field({
  label,
  type = "text",
  name,
  textarea,
}: {
  label: string;
  type?: string;
  name: string;
  textarea?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const common =
    "peer w-full border-b border-ink/20 bg-transparent py-3 font-sans text-lg text-ink outline-none transition-colors duration-500 placeholder-transparent focus:border-crimson";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={(e) => setFocused(!!e.target.value)}
          className={common}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={label}
          onFocus={() => setFocused(true)}
          onBlur={(e) => setFocused(!!e.target.value)}
          className={common}
        />
      )}
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-0 font-sans text-ink-soft transition-all duration-500 ${
          focused ? "-top-3 text-xs text-crimson" : "top-3 text-lg"
        } peer-focus:-top-3 peer-focus:text-xs peer-focus:text-crimson`}
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-28 sm:px-10 sm:py-40"
    >
      {/* atmospheric motion bg */}
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

      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-crimson" />
                <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Contact
                </span>
              </div>
            </Reveal>
            <MaskedHeading
              as="h2"
              className="mt-6 font-display text-[13vw] font-extrabold leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-[6.5vw]"
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
              <div className="mt-12 flex flex-col gap-2">
                <a
                  href="mailto:hello@buildyn.studio"
                  className="font-display text-xl font-medium text-ink transition-colors hover:text-crimson sm:text-2xl"
                >
                  hello@buildyn.studio
                </a>
                <span className="font-sans text-sm text-ink-soft">
                  Currently accepting select projects for 2026.
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="flex flex-col gap-9 rounded-sm border border-ink/10 bg-ivory/40 p-8 backdrop-blur-sm sm:p-10"
            >
              <Field label="Your name" name="name" />
              <Field label="Email address" name="email" type="email" />
              <Field label="Tell us about your project" name="message" textarea />

              <button
                type="submit"
                disabled={sent}
                className="group mt-2 flex items-center justify-center gap-3 rounded-full bg-ink py-4 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson disabled:opacity-70"
              >
                {sent ? "Thank you — we'll be in touch." : "Send enquiry"}
                {!sent && (
                  <span className="transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
