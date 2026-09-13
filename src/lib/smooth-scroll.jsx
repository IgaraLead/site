import { useEffect, useState } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

/* ─── Smooth scroll (Lenis) ────────────────────────────────────
   Inertial wheel/trackpad scrolling + smooth same-page anchors.
   Respects prefers-reduced-motion (falls back to native scroll). */

export const SCROLL_OFFSET = -96;

export function scrollToSection(lenis, id) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) lenis.scrollTo(el, { offset: SCROLL_OFFSET, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
  return true;
}

/* Intercepts plain same-page hash anchors (e.g. href="#simulador")
   so they animate through Lenis instead of jumping instantly. */
function AnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    const onClick = e => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      if (!hash || hash.length < 2) return;
      if (!scrollToSection(lenis, hash.slice(1))) return;
      e.preventDefault();
      window.history.replaceState(null, '', hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);

  return null;
}

const LENIS_OPTIONS = {
  duration: 1.2,
  // Let the simulator's inner scroll areas scroll natively.
  prevent: node =>
    !!node.closest?.(
      '[data-lenis-prevent], .sim-main, .sim-conv-list, .sim-chat-body, .sim-dashboard, .sim-entity-wrapper'
    ),
};

export function SmoothScrollProvider({ children }) {
  const [reduceMotion] = useState(
    () =>
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  if (reduceMotion) return <>{children}</>;

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <AnchorHandler />
      {children}
    </ReactLenis>
  );
}
