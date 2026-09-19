import {
  ChatsCircle,
  Kanban,
  MagnifyingGlass,
  Microphone,
  PaperPlaneTilt,
  Plus,
} from '@phosphor-icons/react';

/* ─── Product showcase ─────────────────────────────────────────
   Bandas editoriais texto + visual honesto por módulo (sem
   mockups de janelas). Os visuais são abstrações geométricas dos
   dados de exemplo, não telas. */

const PIPE_STAGES = [
  { name: 'Qualificados', pct: 38 },
  { name: 'Proposta enviada', pct: 27 },
  { name: 'Negociação', pct: 21 },
  { name: 'Fechamento', pct: 14 },
];

const CNPJ_ROWS = [
  { label: 'CNPJ', value: '34.567.890/0001-12' },
  { label: 'Situação', value: 'Ativa' },
  { label: 'Porte', value: 'Médio' },
  { label: 'Abertura', value: '15/03/2012' },
];

const SCREENS = [
  {
    id: 'dashboard',
    title: 'CRM e pipeline',
    desc: 'Funil, forecast e atividade do time numa tela só, moldada ao seu processo de vendas.',
    icon: <Kanban size={24} aria-hidden />,
    points: [
      'Pipeline visual e etapas sob medida',
      'Relatórios e previsão de receita',
      'Gestão do time de vendas',
    ],
    visual: 'pipe',
  },
  {
    id: 'conversations',
    title: 'Atendimento omnichannel',
    desc: 'WhatsApp, Instagram, e-mail e chat do site no mesmo painel, com histórico completo.',
    icon: <ChatsCircle size={24} aria-hidden />,
    points: [
      'Todos os canais no mesmo painel',
      'Histórico do cliente completo',
      'Atendimento que vende',
    ],
    visual: 'channels',
  },
  {
    id: 'cnpj',
    title: 'Prospecção e dados',
    desc: 'Enriquecimento por CNPJ, dentro da LGPD, alimentando o CRM automaticamente.',
    icon: <MagnifyingGlass size={24} aria-hidden />,
    points: [
      'Busca e enriquecimento por CNPJ',
      'Sócios, faturamento e segmento',
      'Alimenta o seu CRM automaticamente',
    ],
    visual: 'cnpj',
  },
];

function PipeVisual() {
  return (
    <div className="mod-panel" aria-label="Exemplo de distribuição do pipeline por estágio">
      <p className="mod-panel-title">Pipeline por estágio</p>
      <div className="mod-pipe-list">
        {PIPE_STAGES.map(s => (
          <div key={s.name} className="mod-pipe-row">
            <span className="mod-pipe-name">{s.name}</span>
            <span className="mod-pipe-track">
              <span className="mod-pipe-fill" style={{ width: `${s.pct}%` }} />
            </span>
            <span className="mod-pipe-pct">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChannelsVisual() {
  return (
    <div className="mod-panel" aria-label="Exemplo de conversa omnichannel">
      <div className="mod-thread">
        <p className="mod-bubble incoming">Pode enviar a proposta?</p>
        <p className="mod-bubble outgoing">
          Olá, Marina! Vou te enviar a proposta em alguns minutos.
        </p>
        <p className="mod-bubble incoming">Ok, ficamos no aguardo.</p>
      </div>
      <div className="mod-composer" aria-hidden>
        <span className="mod-icon-btn" title="Anexar arquivo">
          <Plus size={16} aria-hidden />
        </span>
        <span className="mod-composer-field">Escreva uma mensagem…</span>
        <span className="mod-icon-btn" title="Mensagem de voz">
          <Microphone size={16} aria-hidden />
        </span>
        <span className="mod-send">
          <PaperPlaneTilt size={14} aria-hidden />
        </span>
      </div>
    </div>
  );
}

function CnpjVisual() {
  return (
    <div className="mod-panel" aria-label="Exemplo de dados de empresa por CNPJ">
      <p className="mod-panel-title">Grupo Horizonte</p>
      <dl className="mod-cnpj-list">
        {CNPJ_ROWS.map(r => (
          <div key={r.label} className="mod-cnpj-row">
            <dt>{r.label}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const VISUALS = { pipe: PipeVisual, channels: ChannelsVisual, cnpj: CnpjVisual };

export default function Showcase() {
  return (
    <section id="produtos" className="showcase-section">
      <div className="container">
        <div className="section-header">
          <h2>Veja alguns de nossos módulos</h2>
          <p>
            Exemplos do que cada módulo faz, com dados fictícios. Ao contratar, entram a sua marca,
            as suas cores e os seus processos.
          </p>
        </div>

        <div className="showcase-rows">
          {SCREENS.map((screen, i) => {
            const Visual = VISUALS[screen.visual];
            return (
              <article key={screen.id} className={`showcase-row${i % 2 === 1 ? ' reverse' : ''}`}>
                <div className="showcase-text">
                  <div className="showcase-caption-head">
                    <div className="feature-icon">{screen.icon}</div>
                    <h3>{screen.title}</h3>
                  </div>
                  <p>{screen.desc}</p>
                  <ul className="showcase-points">
                    {screen.points.map(point => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <Visual />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
