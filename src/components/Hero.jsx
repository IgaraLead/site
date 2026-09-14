import { mailtoLeadInquiry } from '../contactMailto';
import { useTheme } from '../lib/theme';
import Dither from './Dither';
import ShinyText from './ShinyText';

const DITHER_DARK = {
  waveColor: [0.0392156862745098, 0.5450980392156862, 0.8],
  backgroundColor: [0.050980392156862744, 0.07058823529411765, 0.09411764705882353],
};

const DITHER_LIGHT = {
  waveColor: [0.9568627450980393, 0.9725490196078431, 0.984313725490196],
  backgroundColor: [0.0392156862745098, 0.5450980392156862, 0.8],
};

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const palette = resolvedTheme === 'light' ? DITHER_LIGHT : DITHER_DARK;

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-waves-bg" aria-hidden>
        <Dither
          waveColor={palette.waveColor}
          backgroundColor={palette.backgroundColor}
          disableAnimation={false}
          enableMouseInteraction={true}
          mouseRadius={0.3}
          colorNum={10}
          waveAmplitude={0}
          waveFrequency={1.5}
          waveSpeed={0.1}
          pixelSize={2}
          style={{ pointerEvents: 'auto' }}
        />
      </div>
      <div className="container hero-content">
        <h1>
          Da ideia para a produção,{' '}
          <ShinyText
            color={resolvedTheme === 'light' ? 'var(--foreground)' : 'var(--primary)'}
            shineColor="#ffffff"
          >
            sem mistério.
          </ShinyText>
        </h1>
        <p>
          A Igara monta e opera plataformas de vendas e operação sob medida para empresas
          brasileiras, no seu ritmo e sem projeto que nunca termina.
        </p>
        <div className="hero-actions">
          <a href={mailtoLeadInquiry} className="btn btn-gradient">
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
