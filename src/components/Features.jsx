const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feature-icon">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" strokeWidth="2" />
      </svg>
    ),
    title: 'Multi-Canal Unificado',
    desc: 'WhatsApp, Instagram, E-mail e Chat ao Vivo — tudo em uma única interface do Nexus.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feature-icon">
        <circle cx="11" cy="11" r="8" strokeWidth="2" />
        <path d="m21 21-4.35-4.35" strokeWidth="2" />
      </svg>
    ),
    title: 'Enriquecimento de Dados',
    desc: 'CNPJ, sócios, faturamento, setor — consulta automática via Entity em tempo real.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feature-icon">
        <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="2" />
        <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="2" />
        <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="2" />
        <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="2" />
      </svg>
    ),
    title: 'Pipeline Visual',
    desc: 'Kanban de oportunidades no Amplex — arraste e acompanhe cada deal pelo funil.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feature-icon">
        <circle cx="8" cy="12" r="2" strokeWidth="2" />
        <circle cx="16" cy="12" r="2" strokeWidth="2" />
        <path d="M10 12h4" strokeWidth="2" />
      </svg>
    ),
    title: 'Automações Sob Medida',
    desc: 'Fluxos n8n criados pela nossa consultoria Automata, integrados ao seu ecossistema.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feature-icon">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="2" />
      </svg>
    ),
    title: 'Compliance LGPD',
    desc: 'Gestão de consentimento e tratamento de dados pessoais built-in em toda a plataforma.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="feature-icon">
        <path d="M13 10V3l7 9h-7v8l-9-11h7z" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Gestão Centralizada',
    desc: 'Hub como painel único — usuários, planos, créditos e acesso a todas as plataformas.',
  },
];

export default function Features() {
  return (
    <section id="recursos" className="parallax-section" data-parallax="features-bg">
      <div className="container">
        <div className="section-header">
          <h2>
            Funcionalidades que <span className="gradient-text">Resolvem Dores Reais</span>
          </h2>
          <p>Cada recurso foi desenhado para eliminar gargalos operacionais e acelerar o ciclo de vendas.</p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="glass feature-card">
              {f.icon}
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
