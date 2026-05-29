import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
};

/**
 * Cinematic reveal: subtle upward drift, opacity + blur interpolation.
 * Restrained, heavy easing for an "expensive" feel.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = true,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y,
        filter: blur ? "blur(12px)" : "blur(0px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 1.1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
