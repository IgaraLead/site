import { useState } from 'react';

/* ─── WCAG Contrast Utilities ──────────────────────────────── */

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  return (
    '#' +
    [r, g, b]
      .map(c =>
        Math.max(0, Math.min(255, Math.round(c)))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

function sRGBtoLinear(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance({ r, g, b }) {
  return 0.2126 * sRGBtoLinear(r) + 0.7152 * sRGBtoLinear(g) + 0.0722 * sRGBtoLinear(b);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function hexToHsl(hex) {
  const { r, g, b } = hexToRgb(hex);
  return rgbToHsl(r, g, b);
}

function hslToHex(h, s, l) {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

function wcagLevel(ratio) {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA-large';
  return 'fail';
}

function adjustColorForRatio(fixed, adjustable, targetRatio) {
  const adj = hexToRgb(adjustable);
  const adjHsl = rgbToHsl(adj.r, adj.g, adj.b);
  let bestLight = null;
  let bestDark = null;
  for (let step = 0; step <= 100; step++) {
    if (!bestLight) {
      const l = Math.min(100, adjHsl.l + step);
      if (contrastRatio(fixed, hslToHex(adjHsl.h, adjHsl.s, l)) >= targetRatio)
        bestLight = hslToHex(adjHsl.h, adjHsl.s, l);
    }
    if (!bestDark) {
      const l = Math.max(0, adjHsl.l - step);
      if (contrastRatio(fixed, hslToHex(adjHsl.h, adjHsl.s, l)) >= targetRatio)
        bestDark = hslToHex(adjHsl.h, adjHsl.s, l);
    }
    if (bestLight && bestDark) break;
  }
  if (bestLight && bestDark) {
    return Math.abs(hexToHsl(bestLight).l - adjHsl.l) <= Math.abs(hexToHsl(bestDark).l - adjHsl.l)
      ? bestLight
      : bestDark;
  }
  return bestLight || bestDark || adjustable;
}

function generateSecondary(primary) {
  const { h, s, l } = hexToHsl(primary);
  const candidate = hslToHex((h + 30) % 360, Math.min(s + 5, 100), l);
  if (contrastRatio(primary, candidate) >= 3) return candidate;
  return adjustColorForRatio(primary, candidate, 3);
}

/* ─── Simulator Palette Derivation ─────────────────────────── */

function clamp(n, lo, hi) {
  return Math.max(lo, Math.min(hi, n));
}

export function deriveSimPalette(primary, secondary) {
  const p = hexToRgb(primary);
  const pHsl = hexToHsl(primary);
  const pLum = relativeLuminance(p);

  // Background: desaturated, very dark version of primary
  const bg = hslToHex(pHsl.h, clamp(pHsl.s * 0.2, 5, 25), clamp(pLum > 0.3 ? 6 : 8, 4, 12));
  // Surface: slightly lighter than bg
  const surface = hslToHex(pHsl.h, clamp(pHsl.s * 0.15, 4, 20), clamp(pLum > 0.3 ? 12 : 14, 8, 20));
  // Surface hover
  const surfaceHover = hslToHex(
    pHsl.h,
    clamp(pHsl.s * 0.15, 4, 20),
    clamp(pLum > 0.3 ? 16 : 18, 10, 24)
  );
  // Border: subtle
  const border = hslToHex(pHsl.h, clamp(pHsl.s * 0.12, 3, 15), clamp(pLum > 0.3 ? 22 : 25, 16, 32));
  // Foreground: light text
  const fg = hslToHex(pHsl.h, clamp(pHsl.s * 0.08, 2, 12), 90);
  // Muted foreground
  const mutedFg = hslToHex(pHsl.h, clamp(pHsl.s * 0.08, 2, 10), 55);
  // Outgoing bubble: primary-tinted dark
  const outgoingBg = hslToHex(
    pHsl.h,
    clamp(pHsl.s * 0.8, 20, 80),
    clamp(pLum > 0.3 ? 25 : 30, 18, 40)
  );
  // Incoming bubble
  const incomingBg = surface;
  // Badge / subtle accent
  const accentBg = hslToHex(pHsl.h, clamp(pHsl.s * 0.4, 8, 40), clamp(pLum > 0.3 ? 14 : 16, 8, 22));

  return {
    '--sim-bg': bg,
    '--sim-surface': surface,
    '--sim-surface-hover': surfaceHover,
    '--sim-border': border,
    '--sim-fg': fg,
    '--sim-muted-fg': mutedFg,
    '--sim-outgoing': outgoingBg,
    '--sim-incoming': incomingBg,
    '--sim-accent-bg': accentBg,
  };
}

export function deriveSimPaletteLight(primary, _secondary) {
  const p = hexToRgb(primary);
  const pHsl = hexToHsl(primary);

  const outgoingBg = hslToHex(pHsl.h, clamp(pHsl.s * 0.7, 15, 70), clamp(45, 35, 55));

  return {
    '--sim-bg': '#fafbfc',
    '--sim-surface': '#f0f2f5',
    '--sim-surface-hover': '#e8eaed',
    '--sim-border': '#d1d5db',
    '--sim-fg': '#1a1a2e',
    '--sim-muted-fg': '#6b7280',
    '--sim-outgoing': outgoingBg,
    '--sim-incoming': '#f0f2f5',
    '--sim-accent-bg': '#e0f2fe',
  };
}

/* ─── Data: Dashboard ──────────────────────────────────────── */

const KPI_DATA = [
  { label: 'Vendas do mês', value: 'R$ 84.200', delta: '+12%', up: true },
  { label: 'Novos leads', value: '127', delta: '+23%', up: true },
  { label: 'Conversão', value: '18,4%', delta: '+2,1pp', up: true },
  { label: 'Receita recorrente', value: 'R$ 312k', delta: '+8%', up: true },
  { label: 'Pipeline ativo', value: 'R$ 1,2M', delta: '42 negócios', up: null },
  { label: 'Churn', value: '2,1%', delta: '-0,3pp', up: true },
];

const PIPELINE_SUMMARY = [
  { name: 'Prospecção', count: 18, value: 'R$ 420k', pct: 100 },
  { name: 'Qualificação', count: 12, value: 'R$ 310k', pct: 67 },
  { name: 'Proposta', count: 8, value: 'R$ 245k', pct: 44 },
  { name: 'Negociação', count: 4, value: 'R$ 180k', pct: 22 },
];

const ACTIVITY = [
  {
    who: 'Ana Silva',
    action: 'fechou negócio',
    what: 'Grupo Horizonte',
    value: 'R$ 6.900/mês',
    time: '2min',
  },
  { who: 'Carlos Mendes', action: 'adicionou lead', what: 'TechCorp', value: null, time: '15min' },
  {
    who: 'Maria Santos',
    action: 'enviou proposta',
    what: 'DataFlow',
    value: 'R$ 4.200/mês',
    time: '1h',
  },
  {
    who: 'Pedro Alves',
    action: 'moveu para',
    what: 'Negociação →',
    value: 'R$ 8.500/mês',
    time: '2h',
  },
];

/* ─── Data: CNPJ ───────────────────────────────────────────── */

const MOCK_COMPANY = {
  razao: 'Grupo Horizonte Indústria e Comércio Ltda',
  fantasia: 'Grupo Horizonte',
  cnpj: '34.567.890/0001-12',
  situacao: 'Ativa',
  abertura: '15/03/2012',
  capital: 'R$ 500.000,00',
  porte: 'Médio',
  natureza: 'Sociedade Empresária Limitada',
  endereco: 'Rua Augusta, 1.500, Conjunto 401 — São Paulo, SP — 01305-100',
  atividade: '6201-5/01 — Desenvolvimento de programas de computador sob encomenda',
  socios: [
    { nome: 'João Pedro Ribeiro', qual: 'Administrador' },
    { nome: 'Fernanda Costa Lima', qual: 'Sócia' },
    { nome: 'Luciana Martins', qual: 'Sócia' },
  ],
  telefones: ['(11) 3042-1800', '(11) 99876-5432'],
  email: 'contato@grupohorizonte.com.br',
  situacaoCadastral: '00 — Ativa',
  dataSituacao: '15/03/2012',
};

/* ─── Data: Conversations ──────────────────────────────────── */

const CONVERSATIONS = [
  {
    id: 1,
    name: 'Marina Costa',
    channel: 'WhatsApp',
    preview: 'Pode enviar a proposta?',
    time: '14:02',
    unread: 2,
    status: 'online',
    company: 'Clínica Vida Nova',
    msgs: [
      { from: 'them', text: 'Olá! Vi que vocês atendem pelo WhatsApp.' },
      { from: 'us', text: 'Olá, Marina! Sim. Posso te enviar a proposta?' },
      { from: 'them', text: 'Pode sim, ficamos aguardando.' },
    ],
  },
  {
    id: 2,
    name: 'Rafael Lima',
    channel: 'Instagram',
    preview: 'Tenho interesse no plano',
    time: '13:48',
    unread: 1,
    status: 'online',
    company: 'Estúdio Criativo',
    msgs: [
      { from: 'them', text: 'Oi! Vi o post de vocês sobre o plano Growth.' },
      { from: 'us', text: 'Oi Rafael! Qual o tamanho do seu time?' },
      { from: 'them', text: 'Somos 8 pessoas no comercial.' },
    ],
  },
  {
    id: 3,
    name: 'Camila Souza',
    channel: 'E-mail',
    preview: 'Sobre a reunião de quinta',
    time: '12:15',
    unread: 0,
    status: 'offline',
    company: 'Logística Express',
    msgs: [
      { from: 'them', text: 'Bom dia, gostaria de agendar uma reunião para quinta.' },
      { from: 'us', text: 'Claro, Camila! Temos horário às 10h ou 15h. Qual prefere?' },
      { from: 'them', text: '15h seria perfeito. Obrigada!' },
    ],
  },
  {
    id: 4,
    name: 'João Pedro',
    channel: 'Chat',
    preview: 'Obrigado pelo atendimento!',
    time: '11:03',
    unread: 0,
    status: 'offline',
    company: 'Padaria Sabor & Arte',
    msgs: [
      { from: 'them', text: 'Preciso de ajuda com a integração do WhatsApp.' },
      { from: 'us', text: 'Claro! Posso te ajudar agora. Qual sua dúvida?' },
      { from: 'them', text: 'Obrigado pelo atendimento! Era isso mesmo.' },
    ],
  },
  {
    id: 5,
    name: 'Fernanda Rocha',
    channel: 'WhatsApp',
    preview: 'Qual o valor do plano anual?',
    time: '10:42',
    unread: 3,
    status: 'online',
    company: 'Construtora Horizonte',
    msgs: [
      { from: 'them', text: 'Oi, gostaria de saber o valor do plano anual.' },
      { from: 'us', text: 'Olá Fernanda! Para quantas licenças?' },
      { from: 'them', text: 'Seriam 15 licenças.' },
    ],
  },
];

/* ─── Sub-components: Dashboard View ───────────────────────── */

export function DashboardView({ primary, secondary }) {
  return (
    <div className="sim-dashboard">
      <div className="sim-kpi-grid">
        {KPI_DATA.map(k => (
          <div key={k.label} className="sim-kpi sim-card">
            <div className="sim-kpi-label">{k.label}</div>
            <div className="sim-kpi-value" style={{ color: primary }}>
              {k.value}
            </div>
            {k.delta && (
              <div
                className="sim-kpi-delta"
                style={{
                  color:
                    k.up === true
                      ? '#34d399'
                      : k.up === false
                        ? '#f87171'
                        : 'var(--sim-muted-fg, var(--muted-foreground))',
                }}
              >
                {k.up === true && '↑ '}
                {k.up === false && '↓ '}
                {k.delta}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sim-pipeline-summary sim-card">
        <div className="sim-section-title" style={{ color: primary }}>
          Pipeline de vendas
        </div>
        <div className="sim-pipeline-bars">
          {PIPELINE_SUMMARY.map(s => (
            <div key={s.name} className="sim-pipeline-row">
              <span className="sim-pipeline-name">{s.name}</span>
              <div className="sim-pipeline-track">
                <div
                  className="sim-pipeline-fill"
                  style={{
                    width: `${s.pct}%`,
                    background: `linear-gradient(90deg, ${primary}, ${secondary})`,
                  }}
                />
              </div>
              <span className="sim-pipeline-count">{s.count}</span>
              <span className="sim-pipeline-value">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sim-activity sim-card">
        <div className="sim-section-title" style={{ color: primary }}>
          Atividade recente
        </div>
        <div className="sim-activity-list">
          {ACTIVITY.map((a, i) => (
            <div key={i} className="sim-activity-item">
              <div
                className="sim-activity-dot"
                style={{ background: i === 0 ? primary : secondary }}
              />
              <div className="sim-activity-body">
                <span className="sim-activity-who">{a.who}</span> {a.action}{' '}
                <span className="sim-activity-what">{a.what}</span>
                {a.value && <span className="sim-activity-value">{a.value}</span>}
              </div>
              <span className="sim-activity-time">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components: CNPJ View ────────────────────────────── */

export function CnpjView({ primary }) {
  const company = MOCK_COMPANY;
  return (
    <div className="sim-entity-wrapper">
      <div className="sim-entity-detail">
        <div className="sim-entity-header sim-card">
          <div className="sim-entity-header-top">
            <div className="sim-entity-name">{company.fantasia}</div>
            <span
              className="sim-entity-badge"
              style={{
                background: `color-mix(in srgb, ${primary} 20%, transparent)`,
                color: primary,
              }}
            >
              {company.situacao}
            </span>
          </div>
          <div className="sim-entity-razao">{company.razao}</div>
          <div className="sim-entity-cnpj mono">{company.cnpj}</div>
        </div>

        <div className="sim-entity-grid">
          <div className="sim-entity-field sim-card">
            <div className="sim-entity-field-label">Abertura</div>
            <div className="sim-entity-field-value">{company.abertura}</div>
          </div>
          <div className="sim-entity-field sim-card">
            <div className="sim-entity-field-label">Capital Social</div>
            <div className="sim-entity-field-value">{company.capital}</div>
          </div>
          <div className="sim-entity-field sim-card">
            <div className="sim-entity-field-label">Porte</div>
            <div className="sim-entity-field-value">{company.porte}</div>
          </div>
          <div className="sim-entity-field sim-card">
            <div className="sim-entity-field-label">Natureza Jurídica</div>
            <div className="sim-entity-field-value">{company.natureza}</div>
          </div>
        </div>

        <div className="sim-entity-section sim-card">
          <div className="sim-entity-field-label" style={{ color: primary }}>
            Endereço
          </div>
          <div className="sim-entity-field-value">{company.endereco}</div>
        </div>

        <div className="sim-entity-section sim-card">
          <div className="sim-entity-field-label" style={{ color: primary }}>
            Atividade Principal
          </div>
          <div className="sim-entity-field-value">{company.atividade}</div>
        </div>

        <div className="sim-entity-section sim-card">
          <div className="sim-entity-field-label" style={{ color: primary }}>
            Contato
          </div>
          <div className="sim-entity-field-value">{company.telefones.join(' · ')}</div>
          <div className="sim-entity-field-value mono" style={{ marginTop: '0.2rem' }}>
            {company.email}
          </div>
        </div>

        <div className="sim-entity-section sim-card">
          <div className="sim-entity-field-label" style={{ color: primary }}>
            Quadro Societário
          </div>
          <div className="sim-entity-partners">
            {company.socios.map((s, i) => (
              <div key={i} className="sim-entity-partner">
                <div className="sim-entity-partner-avatar" style={{ background: primary }}>
                  {s.nome.charAt(0)}
                </div>
                <div>
                  <div className="sim-entity-partner-name">{s.nome}</div>
                  <div className="sim-entity-partner-qual">{s.qual}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sim-entity-section sim-card">
          <div className="sim-entity-field-label" style={{ color: primary }}>
            Situação Cadastral
          </div>
          <div className="sim-entity-field-value">{company.situacaoCadastral}</div>
          <div
            className="sim-entity-field-value"
            style={{ fontSize: '0.65rem', marginTop: '0.15rem' }}
          >
            desde {company.dataSituacao}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components: Conversations View ───────────────────── */

export function ConversationsView({ primary }) {
  const [activeId, setActiveId] = useState(1);
  const active = CONVERSATIONS.find(c => c.id === activeId);

  return (
    <div className="sim-inbox">
      <div className="sim-conv-list">
        {CONVERSATIONS.map(c => (
          <div
            key={c.id}
            className={`sim-conv${c.unread ? ' unread' : ''}${c.id === activeId ? ' selected' : ''}`}
            onClick={() => setActiveId(c.id)}
            role="button"
            tabIndex={0}
          >
            <div
              className="sim-avatar"
              style={c.id === activeId ? { background: primary, color: '#04140b' } : undefined}
            >
              {c.name.charAt(0)}
            </div>
            <div className="sim-conv-info">
              <div className="sim-conv-row">
                <span className="sim-conv-name">{c.name}</span>
                <span className="sim-conv-time">{c.time}</span>
              </div>
              <div className="sim-conv-preview">
                <span className="sim-conv-channel">{c.channel}</span> · {c.preview}
              </div>
            </div>
          </div>
        ))}
      </div>
      {active && (
        <div className="sim-chat">
          <div className="sim-chat-head">
            <div className="sim-avatar" style={{ background: primary, color: '#04140b' }}>
              {active.name.charAt(0)}
            </div>
            <div>
              <div className="sim-chat-name">{active.name}</div>
              <div className="sim-chat-status">
                {active.status === 'online' ? 'online agora' : 'visto por último'}
              </div>
            </div>
            <div
              className="sim-chat-channel-badge"
              style={{
                background: `color-mix(in srgb, ${primary} 15%, transparent)`,
                color: primary,
              }}
            >
              {active.channel}
            </div>
          </div>
          <div className="sim-chat-body">
            {active.msgs.map((m, i) => (
              <div key={i} className={`sim-bubble ${m.from === 'us' ? 'outgoing' : 'incoming'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="sim-chat-input">
            <span>Escreva uma mensagem…</span>
            <span className="sim-send" style={{ background: primary }}>
              ↵
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
