import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Scroll-triggered fade-up + blur-to-sharp reveal. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Section shell with hairline structure and an index label. */
export function Section({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id: string;
  index: string;
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative border-t border-hairline px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-primary">{index}</span>
            <h2 className="text-3xl font-medium md:text-5xl">{title}</h2>
          </div>
          {kicker ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {kicker}
            </p>
          ) : null}
        </Reveal>
        <div className="mt-14">{children}</div>
      </div>
    </section>
  );
}
