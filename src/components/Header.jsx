import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">
            <img src="/assets/logo_sem_fundo.svg" alt="IgaraLead" />
          </a>

          <nav className="header-nav">
            <a href="#produtos" onClick={e => handleNav(e, 'produtos')}>Produtos</a>
            <a href="#recursos" onClick={e => handleNav(e, 'recursos')}>Recursos</a>
            <a href="#metricas" onClick={e => handleNav(e, 'metricas')}>Métricas</a>
          </nav>

          <div className="header-cta">
            <button className="btn btn-gradient">Entre em contato</button>
          </div>

          <button className="mobile-toggle" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <nav>
          <a href="#produtos" onClick={e => handleNav(e, 'produtos')}>Produtos</a>
          <a href="#recursos" onClick={e => handleNav(e, 'recursos')}>Recursos</a>
          <a href="#metricas" onClick={e => handleNav(e, 'metricas')}>Métricas</a>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(70,79,99,0.5)', margin: '0.75rem 0' }} />
          <button className="btn btn-gradient" style={{ width: '100%', justifyContent: 'center' }}>
            Entre em contato
          </button>
        </nav>
      </div>
    </header>
  );
}
