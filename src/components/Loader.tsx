import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduced ? 400 : 2000;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 320);
        setTimeout(onComplete, 1180);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory"
          exit={{
            opacity: 0,
            filter: "blur(16px)",
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* ambient glow */}
          <motion.div
            className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(192,56,43,0.18), transparent 65%)",
            }}
            animate={{ scale: [0.85, 1.1, 0.85], opacity: [0.5, 0.85, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative flex flex-col items-center">
            <motion.span
              className="font-display text-[14vw] font-extrabold leading-none tracking-tight text-ink sm:text-[10vw] md:text-[7vw]"
              initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              BUILDYN
            </motion.span>
            <motion.span
              className="mt-3 font-serif text-base italic text-crimson sm:text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              digital atmospheres
            </motion.span>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex items-end justify-between px-6 sm:px-10">
            <span className="font-sans text-xs uppercase tracking-[0.3em] text-ink-soft/60">
              Studio
            </span>
            <span className="font-display text-2xl font-semibold tabular-nums text-ink">
              {count}
              <span className="text-crimson">%</span>
            </span>
          </div>

          {/* progress hairline */}
          <div className="absolute bottom-0 left-0 h-px w-full bg-ink/10">
            <motion.div
              className="h-full bg-crimson"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
