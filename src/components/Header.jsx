import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLenis } from 'lenis/react';
import { useTheme } from '../lib/theme';
import { scrollToSection } from '../lib/smooth-scroll';
import { mailtoLeadInquiry } from '../contactMailto';

const NAV = [
  { id: 'produtos', label: 'Produtos' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'fale-conosco', label: 'Fale conosco' },
];

function IconSun() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <circle cx="12" cy="12" r="5" />
      <path
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const { theme, toggle } = useTheme();

  const visibleSections = useRef(new Set());

  useEffect(() => {
    if (!isHome) {
      setActiveSection(null);
      return;
    }
    const ids = ['inicio', ...NAV.filter(item => item.id).map(item => item.id)];
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;
    visibleSections.current.clear();
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSections.current.add(entry.target.id);
          else visibleSections.current.delete(entry.target.id);
        }
        // Hero in the band means "back at top": no highlight.
        // Otherwise the deepest visible section wins.
        if (visibleSections.current.has('inicio')) {
          setActiveSection(null);
        } else {
          const navIds = NAV.filter(item => item.id).map(item => item.id);
          setActiveSection(navIds.reverse().find(id => visibleSections.current.has(id)) ?? null);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(section => io.observe(section));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const sectionHref = id => (isHome ? `#${id}` : `/#${id}`);

  const lenis = useLenis();

  const handleNav = (e, id) => {
    setMenuOpen(false);
    if (!isHome) return;
    e.preventDefault();
    scrollToSection(lenis, id);
  };

  return (
    <header className="site-header">
      <div className="header-content">
        <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
          <img src="/assets/logo_sem_fundo.svg" alt="Igara" />
          <span className="logo-wordmark">Igara</span>
        </Link>

        <nav className="header-nav">
          {NAV.map(item =>
            item.to ? (
              <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={sectionHref(item.id)}
                onClick={e => handleNav(e, item.id)}
                className={activeSection === item.id ? 'active' : undefined}
                aria-current={activeSection === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
        </div>

        <div className="header-mobile-group">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>
          <button
            type="button"
            className="header-menu-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="header-mobile-menu">
          <nav className="header-mobile-nav">
            {NAV.map(item =>
              item.to ? (
                <Link key={item.label} to={item.to} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={sectionHref(item.id)}
                  onClick={e => handleNav(e, item.id)}
                  className={activeSection === item.id ? 'active' : undefined}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>
          <a
            href={mailtoLeadInquiry}
            className="btn btn-gradient btn-sm"
            onClick={() => setMenuOpen(false)}
          >
            Agendar reunião
          </a>
        </div>
      )}
    </header>
  );
}
