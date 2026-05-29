import { motion } from "framer-motion";

const items = [
  "Custom Websites",
  "Branding",
  "Landing Pages",
  "UI / UX Systems",
  "Creative Direction",
  "Digital Presence",
];

export function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-ink/10 bg-paper py-6">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl font-medium tracking-tight text-ink/80 sm:text-3xl">
              {it}
            </span>
            <span className="text-crimson">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
