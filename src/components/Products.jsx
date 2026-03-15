const products = [
  {
    emoji: '🏠',
    name: 'Hub',
    badge: 'hub',
    badgeLabel: 'Central de Gestão',
    tagline: 'Painel Unificado',
    description:
      'Painel central de toda a operação IgaraLead. Gerencie usuários, planos, créditos e acesse todas as plataformas a partir de um único lugar.',
    features: ['Gestão de usuários e permissões', 'Controle de planos e créditos', 'Acesso centralizado às plataformas'],
  },
  {
    emoji: '🔍',
    name: 'Entity',
    badge: 'entity',
    badgeLabel: 'Enriquecimento & Prospecção',
    tagline: 'Dados Enriquecidos',
    description:
      'Encontre e enriqueça leads com dados públicos. CNPJ, sócios, faturamento, setor e contatos — tudo em tempo real para alimentar seu pipeline.',
    features: ['Busca por CNPJ e razão social', 'Enriquecimento automático de dados', 'Exportação para CRM integrada'],
  },
  {
    emoji: '📊',
    name: 'Amplex',
    badge: 'amplex',
    badgeLabel: 'Powered by Odoo',
    tagline: 'CRM Completo',
    description:
      'CRM completo com pipeline visual, kanban de oportunidades e gestão de vendas. Molde funis e etapas de acordo com o seu processo comercial.',
    features: ['Pipeline kanban de vendas', 'Gestão de oportunidades', 'Relatórios e métricas de conversão'],
  },
  {
    emoji: '💬',
    name: 'Nexus',
    badge: 'nexus',
    badgeLabel: 'Powered by Chatwoot',
    tagline: 'Chat Omnichannel',
    description:
      'Atendimento unificado em WhatsApp, Instagram, E-mail e chat ao vivo. Converta conversas em vendas com histórico completo e atribuição inteligente.',
    features: ['Multi-canal unificado', 'Widget de chat ao vivo', 'Histórico completo de conversas'],
  },
  {
    emoji: '⚡',
    name: 'Automata',
    badge: 'automata',
    badgeLabel: 'Consultoria de Automação',
    tagline: 'Fluxos Inteligentes',
    description:
      'Consultoria para criação de fluxos de automação sob medida com n8n. Você recebe os resultados dos fluxos integrados ao seu ecossistema — sem complexidade técnica.',
    features: ['Fluxos de automação personalizados', 'Integração com qualquer API', 'Resultados entregues prontos'],
  },
];

export default function Products() {
  return (
    <section id="produtos" className="parallax-section" data-parallax="products-bg">
      <div className="container">
        <div className="section-header">
          <h2>
            O Ecossistema <span className="neon-text">IgaraLead</span>
          </h2>
          <p>
            Cinco produtos integrados que cobrem todo o ciclo de receita — da prospecção ao
            atendimento, da automação à gestão.
          </p>
        </div>

        <div className="products-grid">
          {products.map(p => (
            <div key={p.name} className="glass product-card">
              <span className={`product-badge ${p.badge}`}>{p.badgeLabel}</span>
              <span className="product-emoji">{p.emoji}</span>
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
