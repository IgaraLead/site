function ProductMonoIcon({ variant }) {
  const p = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: 'product-icon',
    'aria-hidden': true,
  };

  switch (variant) {
    case 'entity':
      return (
        <svg {...p}>
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      );
    case 'amplex':
      return (
        <svg {...p}>
          <path d="M3 3v18h18" />
          <path d="M7 16V9" />
          <path d="M12 16v-5" />
          <path d="M17 16V6" />
        </svg>
      );
    case 'nexus':
      return (
        <svg {...p}>
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case 'automata':
      return (
        <svg {...p}>
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      );
    default:
      return null;
  }
}

const products = [
  {
    icon: 'entity',
    name: 'Entity',
    badge: 'entity',
    badgeLabel: 'Enriquecimento & Prospecção',
    tagline: 'Dados Enriquecidos',
    description:
      'Encontre e enriqueça leads com dados públicos. CNPJ, sócios, faturamento, setor e contatos em tempo real para apoiar sua prospecção.',
    features: [
      'Busca por CNPJ e razão social',
      'Enriquecimento automático de dados',
      'Exportação dos dados para o seu fluxo de trabalho',
    ],
  },
  {
    icon: 'amplex',
    name: 'Amplex',
    badge: 'amplex',
    badgeLabel: 'CRM & Pipeline',
    tagline: 'CRM Completo',
    description:
      'CRM completo com pipeline visual, kanban de oportunidades e gestão de vendas. Molde funis e etapas de acordo com o seu processo comercial.',
    features: [
      'Pipeline kanban de vendas',
      'Gestão de oportunidades',
      'Relatórios e métricas de conversão',
    ],
  },
  {
    icon: 'nexus',
    name: 'Nexus',
    badge: 'nexus',
    badgeLabel: 'Powered by Chatwoot',
    tagline: 'Chat Omnichannel',
    description:
      'Atendimento unificado em WhatsApp, Instagram, E-mail e chat ao vivo. Converta conversas em vendas com histórico completo e atribuição inteligente.',
    features: [
      'Multi-canal unificado',
      'Widget de chat ao vivo',
      'Histórico completo de conversas',
    ],
  },
  {
    icon: 'automata',
    name: 'Automata',
    badge: 'automata',
    badgeLabel: 'Powered by n8n',
    tagline: 'Fluxos Inteligentes',
    description:
      'Consultoria para criação de fluxos de automação sob medida. Você recebe os fluxos prontos para uso nas ferramentas da sua empresa, sem complexidade técnica no dia a dia.',
    features: [
      'Fluxos de automação personalizados',
      'Integração com qualquer API',
      'Resultados entregues prontos',
    ],
  },
];

export default function Products() {
  return (
    <section id="produtos" className="parallax-section" data-parallax="products-bg">
      <div className="container">
        <div className="section-header">
          <h2>
            Soluções <span className="neon-text">para o seu negócio</span>
          </h2>
          <p>
            Quatro produtos distintos para etapas do ciclo de receita, da prospecção ao atendimento,
            da automação à gestão comercial. Contrate apenas o que fizer sentido para o seu time.
          </p>
        </div>

        <div className="products-grid">
          {products.map(p => (
            <div key={p.name} className="glass product-card">
              <span className={`product-badge ${p.badge}`}>{p.badgeLabel}</span>
              <ProductMonoIcon variant={p.icon} />
              <h3>{p.name}</h3>
              <p className="product-tagline">{p.tagline}</p>
              <p>{p.description}</p>
              <ul className="product-features">
                {p.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
