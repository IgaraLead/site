import { mailtoLeadInquiry } from '../contactMailto';
import Topography from './Topography';
import ShinyText from './ShinyText';

export default function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="hero-waves-bg" aria-hidden>
        <Topography
          lowColor="#0e4662"
          midColor="#0A8BCC"
          highColor="#64b1d8"
          speed={0.5}
          morphAmount={3}
          morphSpeed={0.05}
          bands={2}
          thickness={0.05}
          scale={3}
          pixelSize={1}
          glow={0}
          colorMode="elevation"
          contrast={3}
          brightness={1}
          fillBands={false}
          opacity={0.3}
          grain={false}
          grainIntensity={0.05}
          mouseInteraction={false}
          mouseRadius={0.3}
          mouseStrength={0.4}
        />
      </div>
      <div className="container hero-content">
        <h1>
          Da ideia para a produção, <ShinyText>sem mistério.</ShinyText>
        </h1>
        <p>
          A Igara monta e opera plataformas de vendas e operação sob medida para empresas
          brasileiras, no seu ritmo e sem projeto que nunca termina.
        </p>
        <div className="hero-actions">
          <a href={mailtoLeadInquiry} className="btn btn-gradient" data-observe-cta="hero">
            Agendar reunião
          </a>
          <a href="#produtos" className="btn btn-ghost">
            Ver exemplos
          </a>
        </div>
      </div>
    </section>
  );
}
