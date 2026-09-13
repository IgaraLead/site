import { useEffect, useState } from 'react';
import { mailtoLeadInquiry } from '../contactMailto';

/* ─── Floating CTA ─────────────────────────────────────────────
   Fixed bottom-right "Agendar reunião" button. Visible only when
   neither the hero CTA nor the final CTA is on screen. */

export default function FloatingCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-observe-cta]');
    if (targets.length === 0) {
      setShow(true);
      return;
    }
    const visible = new Set();
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setShow(visible.size === 0);
      },
      { threshold: 0 }
    );
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={mailtoLeadInquiry}
      className={`btn btn-gradient floating-cta${show ? ' visible' : ''}`}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
    >
      Agendar reunião
    </a>
  );
}
