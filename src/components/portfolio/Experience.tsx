import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Reveal, Section } from "./Reveal";
import { experience } from "./data";

export function Experience() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <Section
      id="experience"
      index="02"
      title="Experience"
      kicker="Where the code met real operations, deadlines and other people's data."
    >
      <div ref={ref} className="relative pl-8 md:pl-12">
        <div aria-hidden className="absolute left-0 top-2 h-full w-px bg-hairline md:left-1" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-2 w-px origin-top bg-primary md:left-1"
          style={{ height: "100%", scaleY: fill }}
        />

        <ol className="space-y-16">
          {experience.map((job) => (
            <li key={job.company} className="relative">
              <Reveal>
                <span
                  aria-hidden
                  className="absolute -left-8 top-2 h-2 w-2 rounded-full bg-primary md:-left-[2.85rem]"
                />
                <p className="font-mono text-xs uppercase tracking-widest text-primary">
                  {job.period}
                </p>
                <h3 className="mt-3 text-xl font-medium md:text-2xl">{job.role}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-5 space-y-3">
                  {job.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="max-w-2xl border-l border-hairline pl-4 text-sm leading-relaxed text-muted-foreground md:text-base"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
