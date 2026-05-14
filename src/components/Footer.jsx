import { Link } from 'react-router-dom';
import { mailtoLeadInquiry } from '../contactMailto';

const productLinks = [
  { href: '/#produtos', label: 'Entity' },
  { href: '/#produtos', label: 'Amplex' },
  { href: '/#produtos', label: 'Nexus' },
  { href: '/#produtos', label: 'Automata' },
];

const resourceLinks = [
  { href: '/#recursos', label: 'Funcionalidades' },
  { href: '/#metricas', label: 'Métricas' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/">
              <img src="/assets/logo_sem_fundo.svg" alt="IgaraLead" className="footer-logo" />
            </Link>
            <p>
              Prospecção, enriquecimento de dados, CRM, atendimento omnichannel e automação:
              soluções IgaraLead contratáveis de forma independente.
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
                <Link to="/privacidade">Privacidade</Link>
              </li>
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
          <p>© {year} IgaraLead. CNPJ 64.670.800/0001-00. Todos os direitos reservados.</p>
          <div className="footer-social">
            <a
              href="https://github.com/igaralead"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="20"
                height="20"
                aria-hidden
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
