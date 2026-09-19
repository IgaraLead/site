import { mailtoDemoRequest } from '../contactMailto';

const INCLUDED = [
  'Hospedagem, backups e monitoramento',
  'Atualizações e melhorias contínuas',
  'Suporte em português, do nosso time',
  'Conformidade LGPD e boas práticas de segurança',
  'Equipe treinada no MVP',
];

const PLANS = [
  {
    name: 'Starter',
    price: 'R$ 1.500 a 2.500',
    unit: '/mês',
    desc: 'Para começar a operar em um processo específico.',
    features: [
      'Plataforma para um processo (ex.: CRM ou Atendimento)',
      'Até 10 usuários',
      'Suporte por e-mail',
    ],
    featured: false,
  },
  {
    name: 'Growth',
    price: 'R$ 3.000 a 5.000',
    unit: '/mês',
    desc: 'Vendas e operação conectadas em uma só plataforma.',
    features: ['Vendas e operação integradas', 'Usuários ilimitados', 'Suporte prioritário'],
    featured: true,
  },
  {
    name: 'Custom',
    price: 'A partir de R$ 6.000',
    unit: '/mês',
    desc: 'Para processos complexos e integrações específicas.',
    features: ['Plataforma sob medida', 'Integrações com suas APIs', 'SLA e gerente dedicado'],
    featured: false,
  },
];

export default function Membership() {
  return (
    <section id="assinatura" className="membership-section">
      <div className="container">
        <div className="section-header">
          <h2>
            Um só compromisso: <span className="gradient-text">sua plataforma funcionando</span>
          </h2>
          <p>Você recebe uma plataforma operada por nós, evoluindo todo mês.</p>
        </div>

        <div className="metrics-grid">
          <div className="metric-card glass">
            <div className="metric-value">2 a 6</div>
            <div className="metric-label">semanas até o MVP</div>
          </div>
          <div className="metric-card glass">
            <div className="metric-value">100%</div>
            <div className="metric-label">sob medida para o seu processo</div>
          </div>
          <div className="metric-card glass">
            <div className="metric-value">LGPD</div>
            <div className="metric-label">conformidade e segurança</div>
          </div>
          <div className="metric-card glass">
            <div className="metric-value">BR</div>
            <div className="metric-label">suporte em português</div>
          </div>
        </div>

        <div className="pricing-grid">
          {PLANS.map(plan => (
            <div
              key={plan.name}
              className={`pricing-card glass${plan.featured ? ' featured' : ''}`}
            >
              {plan.featured && <span className="pricing-badge">Mais escolhido</span>}
              <h3>{plan.name}</h3>
              <div className="pricing-price">
                {plan.price}
                <span className="pricing-unit">{plan.unit}</span>
              </div>
              <p className="pricing-desc">{plan.desc}</p>
              <ul className="pricing-features">
                {plan.features.map(f => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a
                href={mailtoDemoRequest}
                className={`btn ${plan.featured ? 'btn-gradient' : 'btn-ghost'}`}
              >
                Falar com especialista
              </a>
            </div>
          ))}
        </div>

        <div className="pricing-note glass">
          <p>
            Valores de referência. Cada projeto recebe uma proposta fechada após a conversa de
            descoberta, sem custo e sem compromisso.
          </p>
          <p className="pricing-handover">
            Prefere ter o código na mão? Fazemos compra única com manutenção por 90 dias. Não é o
            nosso padrão, mas é possível.
          </p>
        </div>
      </div>
    </section>
  );
}
