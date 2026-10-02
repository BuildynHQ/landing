import { useState, useMemo, type FormEvent, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MaskedHeading } from "../components/MaskedHeading";
import { Reveal } from "../components/Reveal";

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
    "peer relative z-10 w-full border-b border-ink/20 bg-transparent py-3 font-sans text-base text-ink outline-none transition-colors duration-500 placeholder-transparent focus:border-transparent lg:text-lg";

  return (
    <div className="relative">
      {textarea ? (
        <textarea rows={4} className={inputClass} {...sharedProps} />
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
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "X / Twitter", href: "https://x.com" },
];

const contactSteps = [
  {
    n: "01",
    title: "You reach out",
    body: "Share a few details — no formal brief required.",
  },
  {
    n: "02",
    title: "We reply within 48h",
    body: "A real human, usually the founder.",
  },
  {
    n: "03",
    title: "Kick-off call",
    body: "30 minutes to see if we're a great fit.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", budget: "" });
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed");

      setStatus("sent");
      setTimeout(() => {
        setForm({ name: "", email: "", message: "", budget: "" });
        setStatus("idle");
      }, 3500);
    } catch (error) {
      console.error(error);
      alert("Failed to send enquiry. Please try emailing directly at hello@buildyn.in");
      setStatus("idle");
    }
  };

  return (
    <div className="relative min-h-screen pt-32 pb-24 sm:pt-40">
      {/* Background ambient lighting */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[15%] top-1/4 -z-10 h-[55vmin] w-[55vmin] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(192,56,43,0.16), transparent 65%)",
        }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-5%] bottom-[10%] -z-10 h-[50vmin] w-[50vmin] rounded-full blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(192,56,43,0.12), transparent 65%)",
        }}
        animate={{ x: [0, -50, 0], y: [0, 30, 0], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Left Column */}
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="font-sans text-xs tracking-[0.3em] text-ink-soft">
                  05
                </span>
                <span className="h-px w-10 bg-crimson" />
                <span className="font-sans text-xs uppercase tracking-[0.35em] text-ink-soft">
                  Start a Conversation
                </span>
              </div>
            </Reveal>

            <MaskedHeading
              as="h1"
              className="mt-6 font-display text-[12vw] font-medium leading-[0.92] tracking-[-0.03em] text-ink sm:text-7xl lg:text-7xl xl:text-8xl"
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
              <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
                An independent digital product and software engineering studio. We design and build complete digital products, SaaS platforms, dashboards, and custom software systems — from concept to deployment.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 rounded-2xl border border-ink/10 bg-paper/60 p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson/60 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson" />
                  </span>
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft">
                    Currently Booking for Q1 / Q2 2026
                  </span>
                </div>

                <a
                  href="mailto:hello@buildyn.in"
                  className="group mt-4 inline-flex items-baseline gap-2 font-display text-2xl font-medium text-ink transition-colors hover:text-crimson sm:text-3xl"
                >
                  <span className="bg-gradient-to-r from-crimson to-crimson bg-[length:0_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                    hello@buildyn.in
                  </span>
                  <span className="text-crimson transition-transform duration-500 group-hover:translate-x-1">
                    ↗
                  </span>
                </a>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-ink/10 pt-4 font-sans">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                      Location
                    </dt>
                    <dd className="mt-1 text-sm text-ink">
                      India / Worldwide
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                      Response Time
                    </dt>
                    <dd className="mt-1 text-sm text-ink">Within 48 hours</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink/10 pt-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-1.5 font-sans text-xs text-ink transition-colors hover:text-crimson"
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

          {/* Right Column / Form */}
          <div className="flex flex-col">
            <Reveal delay={0.15}>
              <div className="relative flex flex-col rounded-3xl border border-ink/10 bg-paper/70 p-6 sm:p-10 backdrop-blur-md">
                <span
                  aria-hidden
                  className="absolute -right-3 -top-3 font-display text-5xl font-extrabold leading-none text-crimson/15"
                >
                  05
                </span>

                <div className="mb-6 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-4">
                  <h2 className="font-display text-2xl font-medium text-ink">
                    Project Enquiry
                  </h2>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink-soft">
                    ~2 min
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
                      className="flex flex-col gap-6"
                    >
                      <Field
                        label="Your Name"
                        name="name"
                        value={form.name}
                        onChange={update("name")}
                        required
                      />
                      <Field
                        label="Email Address"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={update("email")}
                        required
                      />
                      <Field
                        label="Estimated Budget / Timeline (Optional)"
                        name="budget"
                        value={form.budget}
                        onChange={update("budget")}
                      />
                      <Field
                        label="Tell us about your project & system requirements"
                        name="message"
                        value={form.message}
                        onChange={update("message")}
                        textarea
                        required
                      />

                      <button
                        type="submit"
                        disabled={!canSubmit || status === "sending"}
                        className="group mt-3 flex items-center justify-center gap-3 rounded-full bg-ink py-4 font-sans text-sm text-ivory transition-all duration-500 hover:bg-crimson disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {status === "sending" ? (
                          <>
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory" />
                            Sending inquiry…
                          </>
                        ) : (
                          <>
                            Send Enquiry
                            <span className="transition-transform duration-500 group-hover:translate-x-1 group-disabled:translate-x-0">
                              →
                            </span>
                          </>
                        )}
                      </button>

                      <p className="text-center font-sans text-xs text-ink-soft">
                        We respect your privacy. By submitting, you agree to our{" "}
                        <Link
                          to="/privacy-policy"
                          className="underline underline-offset-2 hover:text-crimson"
                        >
                          privacy policy
                        </Link>
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
                      className="flex flex-col items-center py-12 text-center"
                      role="status"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-crimson/10 text-crimson">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-8 w-8"
                        >
                          <motion.path
                            d="M5 12l5 5L20 7"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                          />
                        </svg>
                      </span>
                      <h3 className="mt-6 font-display text-3xl font-medium text-ink">
                        Thank you — enquiry received.
                      </h3>
                      <p className="mt-3 max-w-xs font-sans text-sm text-ink-soft">
                        We'll be in touch within 48 hours. Looking forward to discussing your vision.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* Steps mini breakdown */}
            <Reveal delay={0.35}>
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6">
                {contactSteps.map((s) => (
                  <div key={s.n}>
                    <span className="font-display text-xs tracking-[0.3em] text-crimson">
                      {s.n}
                    </span>
                    <h4 className="mt-1 font-display text-xs sm:text-sm font-medium text-ink">
                      {s.title}
                    </h4>
                    <p className="mt-0.5 font-sans text-[11px] sm:text-xs leading-relaxed text-ink-soft">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
