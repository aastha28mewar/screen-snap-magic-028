import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { Reveal, Section } from "./Reveal";
import { projects } from "./data";

type Project = (typeof projects)[number];

/** Card with magnetic 3D tilt toward the cursor and a glow border on hover. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [hovered, setHovered] = useState(false);

  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHovered(false);
  };

  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        ref={ref}
        data-hoverable
        onPointerMove={onMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className={`group relative h-full overflow-hidden rounded-xl border bg-card/60 p-7 backdrop-blur-sm transition-colors ${
          hovered ? "border-primary/40 glow-ring" : "border-hairline"
        }`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-xl tracking-tight md:text-2xl">{project.name}</h3>
          <span className="font-mono text-[11px] text-muted-foreground">{project.date}</span>
        </div>

        <dl className="mt-6 space-y-4 text-sm leading-relaxed">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-primary">Problem</dt>
            <dd className="mt-1.5 text-muted-foreground">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-primary">
              Approach
            </dt>
            <dd className="mt-1.5 text-muted-foreground">{project.approach}</dd>
          </div>
        </dl>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <motion.li
              key={tech}
              initial={false}
              animate={
                reduced
                  ? undefined
                  : { x: hovered ? 0 : -6, opacity: hovered ? 1 : 0.65 }
              }
              transition={{ duration: 0.35, delay: hovered ? i * 0.03 : 0 }}
              className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </motion.li>
          ))}
        </ul>

        <div className="mt-7 flex items-center gap-4 text-xs">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <Github className="h-3.5 w-3.5" /> Code
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowUpRight className="h-3.5 w-3.5" /> Live
            </a>
          ) : null}
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      title="Selected projects"
      kicker="Three things I built end to end — the problem, how I approached it, and what it runs on."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
