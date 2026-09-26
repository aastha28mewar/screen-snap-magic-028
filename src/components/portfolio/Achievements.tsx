import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Reveal, Section } from "./Reveal";
import { achievements, extraAchievement } from "./data";

/** Counts up to a target once scrolled into view. */
function Counter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView || reduced) return;
    const duration = 1500;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="font-display text-5xl text-primary text-glow md:text-7xl">
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" index="05" title="Achievements">
      <div className="grid gap-px overflow-hidden rounded-xl border border-hairline bg-hairline md:grid-cols-3">
        {achievements.map((a, i) => (
          <div key={a.label} className="bg-background/60 px-7 py-12">
            <Reveal delay={i * 0.08}>
              <Counter value={a.value} suffix={a.suffix} decimals={a.decimals ?? 0} />
              <p className="mt-5 text-sm font-medium">{a.label}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
            </Reveal>
          </div>
        ))}
      </div>

      <Reveal delay={0.2}>
        <p className="mt-8 flex items-start gap-3 text-sm text-muted-foreground">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          {extraAchievement}
        </p>
      </Reveal>
    </Section>
  );
}
