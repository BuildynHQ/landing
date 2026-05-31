import { useState, useMemo, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { MaskedHeading } from "../components/MaskedHeading";

/* ----------------------------- Field ----------------------------- */

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

      {/* animated underline that fills on focus */}
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

/* ----------------------------- Contact ----------------------------- */

type FormState = "idle" | "sending" | "sent";

const socials = [
  { label: "Dribbble", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "X / Twitter", href: "#" },
];

const steps = [
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

export function Contact() {
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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    // Simulate network — wire up to your endpoint here.
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setStatus("idle");
      }, 3200);
    }, 1200);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-6 py-20 sm:px-10 lg:flex lg:min-h-screen lg:items-center lg:py-10"
    >
      {/* atmospheric motion bg — two counter-rotating blobs */}
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
          {/* -------------------- Left column -------------------- */}
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
                {/* Availability pill */}
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
                  href="mailto:hello@buildyn.studio"
                  className="group mt-4 inline-flex items-baseline gap-2 font-display text-xl font-medium text-ink transition-colors hover:text-crimson sm:text-2xl lg:text-2xl"
                >
                  <span className="bg-gradient-to-r from-crimson to-crimson bg-[length:0_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    hello@buildyn.studio
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
                      Lisbon / Remote
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

          {/* -------------------- Right column -------------------- */}
          <div className="flex flex-col">
            <Reveal delay={0.15}>
              <div className="relative flex flex-col rounded-sm border border-ink/10 bg-ivory/40 p-6 backdrop-blur-sm sm:p-8 lg:p-6">
                {/* section corner index */}
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
                        disabled={false}
                        className="group mt-2 flex items-center justify-center gap-3 rounded-full bg-ink py-4 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson"
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
                          href="#"
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

            {/* What to expect */}
            <Reveal delay={0.35}>
              <div className="mt-5 grid grid-cols-3 gap-4 border-t border-ink/10 pt-5 lg:mt-4 lg:pt-4">
                {steps.map((s) => (
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
