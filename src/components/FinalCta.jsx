import { mailtoLeadInquiry } from '../contactMailto';

export default function FinalCta() {
  return (
    <section id="fale-conosco" className="final-cta-section">
      <div className="container">
        <div className="final-cta-card">
          <h2>Vamos desenhar sua plataforma no seu ritmo</h2>
          <p>
            Uma conversa de descoberta para entender seu processo e montar um escopo sem custo e sem
            compromisso, e sem projeto que nunca termina.
          </p>
          <div className="final-cta-actions">
            <a href={mailtoLeadInquiry} className="btn btn-gradient">
              Agendar reunião
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
