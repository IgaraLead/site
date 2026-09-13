import { Kanban, ChatsCircle, MagnifyingGlass } from '@phosphor-icons/react';
import { useTheme } from '../lib/theme';
import { mailtoLeadInquiry } from '../contactMailto';
import {
  DashboardView,
  ConversationsView,
  CnpjView,
  deriveSimPalette,
  deriveSimPaletteLight,
} from './simViews';

/* ─── Product showcase ─────────────────────────────────────────
   Static example screens reusing the shared product views to demo
   Igara products on the home page. (The interactive simulator is
   currently disabled: Simulator.jsx.disabled.) */

const PRIMARY = '#0A8BCC';
const SECONDARY = '#186adc';
const DISPLAY_NAME = 'Grupo Horizonte';
const URL_SLUG = 'app.grupohorizonte.com.br';

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
    View: DashboardView,
    viewProps: { primary: PRIMARY, secondary: SECONDARY },
  },
  {
    id: 'conversations',
    title: 'Atendimento omnichannel',
    desc: 'WhatsApp, Instagram, e-mail e chat do site na mesma conversa, com histórico completo.',
    icon: <ChatsCircle size={24} aria-hidden />,
    points: [
      'Todos os canais em uma conversa',
      'Histórico do cliente completo',
      'Atendimento que vende',
    ],
    View: ConversationsView,
    viewProps: { primary: PRIMARY },
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
    View: CnpjView,
    viewProps: { primary: PRIMARY },
  },
];

function ExampleScreen({ screen, previewDark }) {
  const { View, viewProps } = screen;
  const simPalette = previewDark
    ? deriveSimPalette(PRIMARY, SECONDARY)
    : deriveSimPaletteLight(PRIMARY, SECONDARY);
  return (
    <div
      className="showcase-frame sim-preview"
      style={{
        '--sim-accent': PRIMARY,
        '--sim-secondary': SECONDARY,
        ...simPalette,
        ...(previewDark ? {} : { colorScheme: 'light' }),
      }}
    >
      <div className="sim-chrome">
        <span className="sim-dot red" />
        <span className="sim-dot amber" />
        <span className="sim-dot green" />
        <span className="sim-url">{URL_SLUG}</span>
      </div>
      <div className="showcase-viewport">
        <View {...viewProps} />
      </div>
    </div>
  );
}

export default function Showcase() {
  const { theme } = useTheme();
  const previewDark = theme !== 'light';
  return (
    <section id="produtos" className="showcase-section">
      <div className="container">
        <div className="section-header">
          <h2>Veja alguns de nossos módulos</h2>
          <p>
            Telas de exemplo montadas com dados fictícios. No simulador, entram a sua marca e as
            suas cores. Ao contratar, entram os seus processos.
          </p>
        </div>

        <div className="showcase-rows">
          {SCREENS.map((screen, i) => (
            <figure key={screen.id} className={`showcase-row${i % 2 === 1 ? ' reverse' : ''}`}>
              <ExampleScreen screen={screen} previewDark={previewDark} />
              <figcaption className="showcase-caption">
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
                <span className="showcase-brand">
                  Exibido como <strong>{DISPLAY_NAME}</strong>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
