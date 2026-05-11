import { mailtoLeadInquiry } from '../contactMailto';

const productLinks = [
  { href: '#produtos', label: 'Hub' },
  { href: '#produtos', label: 'Entity' },
  { href: '#produtos', label: 'Amplex' },
  { href: '#produtos', label: 'Nexus' },
  { href: '#produtos', label: 'Automata' },
];

const resourceLinks = [
  { href: '#recursos', label: 'Funcionalidades' },
  { href: '#metricas', label: 'Métricas' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo_sem_fundo.svg" alt="IgaraLead" className="footer-logo" />
            <p>
              Plataforma Integrada de Receita — prospecção, enriquecimento, CRM, atendimento e
              automação em um único ecossistema.
            </p>
          </div>

          <div className="footer-links">
            <h4>Produtos</h4>
            <ul>
              {productLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Recursos</h4>
            <ul>
              {resourceLinks.map(l => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-links">
            <h4>Empresa</h4>
            <ul>
              <li>
                <span>Rua Pais Leme, 215</span>
              </li>
              <li>
                <span>CEP 05.424-150</span>
              </li>
              <li>
                <span>Pinheiros, São Paulo - SP</span>
              </li>
              <li>
                <a href={mailtoLeadInquiry}>contato@igaralead.com.br</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} IgaraLead — CNPJ 64.670.800/0001-00. Todos os direitos reservados.</p>
          <div className="footer-social">
            <a
              href="https://github.com/igaralead"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
