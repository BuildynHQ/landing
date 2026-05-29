import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type MaskedHeadingProps = {
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

/**
 * Masked typography reveal — each line rises from behind an overflow-hidden mask
 * with a slow cinematic stagger.
 */
export function MaskedHeading({
  lines,
  className,
  delay = 0,
  stagger = 0.12,
  as = "h2",
}: MaskedHeadingProps) {
  const Tag = motion[as];
  return (
    <Tag className={className} aria-label={lines.map(String).join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line" aria-hidden="true">
          <motion.span
            className="block"
            initial={{ y: "115%", opacity: 0.4 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1.15,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function cnHeading(...args: Parameters<typeof cn>) {
  return cn(...args);
}
