import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
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
    <motion.article
      ref={ref}
      data-hoverable
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={`group relative flex h-full w-full shrink-0 flex-col overflow-hidden rounded-xl border bg-card/60 p-7 backdrop-blur-sm transition-colors md:w-[min(560px,42vw)] ${
        hovered ? "border-primary/40 glow-ring" : "border-hairline"
      }`}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <span className="font-mono text-[11px] text-muted-foreground">{project.date}</span>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="outline" className="border-primary/40 text-primary">
            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Code for ${project.name}`}>
              <Github /> Code
            </a>
          </Button>
          {project.live ? (
            <Button asChild size="sm" variant="ghost">
              <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Live ${project.name}`}>
                <ArrowUpRight /> Live
              </a>
            </Button>
          ) : null}
        </div>
      </div>
      <h3 className="break-words font-display text-xl md:text-2xl">{project.name}</h3>

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
            animate={reduced ? false : { x: hovered ? 0 : -6, opacity: hovered ? 1 : 0.65 }}
            transition={{ duration: 0.35, delay: hovered ? i * 0.03 : 0 }}
            className="rounded-full border border-hairline px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {tech}
          </motion.li>
        ))}
      </ul>

    </motion.article>
  );
}

/**
 * Scroll-driven horizontal gallery: the section is taller than the viewport,
 * the inner panel stays sticky, and vertical scroll progress translates the
 * card track horizontally. On mobile (and with reduced motion) the cards
 * fall back to a normal vertical stack.
 */
export function Projects() {
  const reduced = useReducedMotion();
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  // Move the track left until the last card is fully in view.
  const x = useTransform(smooth, [0, 1], ["1%", "-68%"]);
  const trackX = useMotionTemplate`${x}`;
  // Progress bar under the heading.
  const barScale = useTransform(smooth, [0, 1], [0, 1]);

  return (
    <section id="projects" className="relative border-t border-hairline py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-primary">03</span>
            <h2 className="text-3xl font-medium md:text-5xl">Selected projects</h2>
          </div>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
             Research assistants, compatibility scoring, and contribution tracking.
          </p>
        </Reveal>
      </div>

      {/* Mobile / reduced-motion fallback: plain vertical stack */}
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-6 md:hidden">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>

      {/* Desktop: sticky horizontal scroll */}
      <div ref={targetRef} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-8 w-full max-w-6xl px-6">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              <span>Scroll to explore</span>
              <span className="text-primary">0{projects.length} projects</span>
            </div>
            <div className="mt-3 h-px w-full bg-hairline">
              <motion.div
                style={{ scaleX: reduced ? 1 : barScale }}
                className="h-px origin-left bg-primary"
              />
            </div>
          </div>

          <motion.div
            {...(reduced ? {} : { style: { x: trackX } })}
            className="flex gap-6 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
          >
            {projects.map((p, i) => (
              <div key={p.name} className="h-[62vh] min-h-[420px] w-[min(560px,42vw)] shrink-0">
                <ProjectCard project={p} index={i} />
              </div>
            ))}
            {/* End spacer so the last card clears the right edge */}
            <div className="w-[8vw] shrink-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
