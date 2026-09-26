import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { sections } from "./data";
import { scrollToSection } from "./useLenis";

/** Floating nav that condenses on scroll, plus a thin scroll-progress bar. */
export function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5, 1] },
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-primary"
        style={{ scaleX: progress }}
      />
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled
            ? "border-b border-hairline bg-background/70 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-6"
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between px-6 md:px-12"
        >
          <button
            onClick={() => scrollToSection("hero")}
            className="font-display text-sm font-medium tracking-tight transition-colors hover:text-primary"
          >
            aastha<span className="text-primary">.</span>
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {sections.slice(1).map((s) => {
              const active = activeId === s.id;
              return (
                <li key={s.id} className="relative">
                  <button
                    onClick={() => scrollToSection(s.id)}
                    aria-current={active ? "true" : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-xs transition-colors ${
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-secondary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {s.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            onClick={() => scrollToSection("contact")}
            className="rounded-full border border-primary/40 px-4 py-1.5 text-xs text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Get in touch
          </button>
        </nav>
      </header>
    </>
  );
}
