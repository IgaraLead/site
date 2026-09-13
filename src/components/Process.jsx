const STEPS = [
  {
    number: '01',
    title: 'Descoberta',
    desc: 'Uma conversa sobre o seu processo, suas ferramentas e suas dores. Nada de palpite.',
  },
  {
    number: '02',
    title: 'Proposta',
    desc: 'Escopo e preço fechados antes de começar. Você decide se faz sentido.',
  },
  {
    number: '03',
    title: 'Montagem',
    desc: 'Sua plataforma montada sob medida para o seu processo, no seu ritmo.',
  },
  {
    number: '04',
    title: 'Go-live',
    desc: 'Sua equipe treinada e usando a plataforma de verdade, com seus dados reais.',
  },
  {
    number: '05',
    title: 'Cuidamos',
    desc: 'Hospedagem, backups, evolução e suporte. Você cuida do negócio, nós da plataforma.',
  },
];

export default function Process() {
  return (
    <section id="como-funciona" className="process-section">
      <div className="container">
        <div className="section-header align-left">
          <h2>Do primeiro papo ao go-live, você sabe onde está</h2>
          <p>Um processo claro, sem letras miúdas e sem projeto que nunca termina.</p>
        </div>

        <ol className="process-timeline">
          {STEPS.map(step => (
            <li
              key={step.number}
              className={`process-step${step.number === '05' ? ' featured' : ''}`}
            >
              <span className="process-node" aria-hidden />
              <div className="process-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
