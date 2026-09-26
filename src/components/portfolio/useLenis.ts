import { useEffect } from "react";

/** Smooth scrolling via Lenis, loaded lazily on the client only. */
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroy: (() => void) | undefined;
    let raf = 0;

    void (async () => {
      const { default: Lenis } = await import("lenis");
      const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    })();

    return () => destroy?.();
  }, []);
}

/** Scrolls to a section id, accounting for the fixed nav. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
}
