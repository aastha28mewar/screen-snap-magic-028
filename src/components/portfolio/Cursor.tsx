import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Custom dot cursor with a trailing ring that grows over interactive elements. */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.4 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest("a, button, input, textarea, [data-hoverable]")));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-primary"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="absolute rounded-full border border-primary/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: active ? 46 : 26,
          height: active ? 46 : 26,
          opacity: active ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
    </div>
  );
}
