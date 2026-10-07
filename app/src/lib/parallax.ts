import { useEffect } from "react";

/**
 * Transform-only scroll parallax. Any element with `data-speed` drifts on the
 * Y axis relative to its distance from the viewport centre:
 *   positive speed  -> lags behind the scroll (reads as further away)
 *   negative speed  -> outruns the scroll (reads as closer)
 * Work is batched into one rAF per frame, only for elements near the viewport,
 * scaled down on small screens and switched off for prefers-reduced-motion.
 */
export function useParallax() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-speed]"));
    if (!els.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const visible = new Set<HTMLElement>();
    const speeds = new Map<HTMLElement, number>();
    for (const el of els) speeds.set(el, Number.parseFloat(el.dataset.speed ?? "0") || 0);

    let frame = 0;
    let vh = window.innerHeight;
    let factor = 1;

    const measure = () => {
      vh = window.innerHeight;
      factor = window.innerWidth < 760 ? 0.55 : 1;
    };

    const render = () => {
      frame = 0;
      for (const el of visible) {
        // Measure the untransformed layout box via the parent so the element's
        // own translation never feeds back into its next position.
        const host = el.parentElement ?? el;
        const r = host.getBoundingClientRect();
        const offset = r.top + r.height / 2 - vh / 2;
        const y = -offset * (speeds.get(el) ?? 0) * factor;
        el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      }
    };

    const schedule = () => {
      if (reduce.matches || frame) return;
      frame = requestAnimationFrame(render);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        schedule();
      },
      { rootMargin: "25% 0px 25% 0px" },
    );

    const reset = () => {
      if (reduce.matches) {
        for (const el of els) el.style.transform = "";
      } else {
        measure();
        schedule();
      }
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    for (const el of els) {
      el.classList.add("has-parallax");
      io.observe(el);
    }
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    reduce.addEventListener("change", reset);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      reduce.removeEventListener("change", reset);
      for (const el of els) el.style.transform = "";
    };
  }, []);
}

/**
 * Lift-in reveals for `[data-reveal]`. Content is fully visible without JS;
 * the script only arms a gentle translate (never opacity) for blocks that are
 * still below the fold, then releases each one as it enters the viewport.
 */
export function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const vh = window.innerHeight;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of els) {
      if (el.getBoundingClientRect().top < vh) continue;
      el.classList.add("is-armed");
      io.observe(el);
    }
    return () => io.disconnect();
  }, []);
}
