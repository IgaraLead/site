import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mailtoLeadInquiry } from '../contactMailto';

function IconMenu() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" aria-hidden>
      <path d="M18 6 6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const sectionHref = id => (isHome ? `#${id}` : `/#${id}`);

  const handleNav = (e, id) => {
    if (!isHome) return;
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/assets/logo_sem_fundo.svg" alt="IgaraLead" />
          </Link>

          <nav className="header-nav">
            <a href={sectionHref('produtos')} onClick={e => handleNav(e, 'produtos')}>
              Produtos
            </a>
            <a href={sectionHref('recursos')} onClick={e => handleNav(e, 'recursos')}>
              Recursos
            </a>
            <a href={sectionHref('metricas')} onClick={e => handleNav(e, 'metricas')}>
              Métricas
            </a>
            <Link to="/privacidade" onClick={() => setMenuOpen(false)}>
              Privacidade
            </Link>
          </nav>

          <div className="header-cta">
            <a href={mailtoLeadInquiry} className="btn btn-gradient">
              Entre em contato
            </a>
          </div>

          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMenuOpen(o => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <nav>
          <a href={sectionHref('produtos')} onClick={e => handleNav(e, 'produtos')}>
            Produtos
          </a>
          <a href={sectionHref('recursos')} onClick={e => handleNav(e, 'recursos')}>
            Recursos
          </a>
          <a href={sectionHref('metricas')} onClick={e => handleNav(e, 'metricas')}>
            Métricas
          </a>
          <Link to="/privacidade" onClick={() => setMenuOpen(false)}>
            Privacidade
          </Link>
          <hr
            style={{
              border: 'none',
              borderTop: '1px solid rgba(70,79,99,0.5)',
              margin: '0.75rem 0',
            }}
          />
          <a
            href={mailtoLeadInquiry}
            className="btn btn-gradient"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}
          >
            Entre em contato
          </a>
        </nav>
      </div>
    </header>
  );
}
