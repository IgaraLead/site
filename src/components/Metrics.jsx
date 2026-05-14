const metrics = [
  { value: '4', label: 'Soluções comerciais' },
  { value: '∞', label: 'Automações possíveis' },
  { value: '360°', label: 'Gestão do relacionamento' },
  { value: 'BR', label: 'Operação no Brasil' },
];

export default function Metrics() {
  return (
    <section id="metricas" className="metrics-section parallax-section" data-parallax="metrics-bg">
      <div className="container">
        <div className="section-header">
          <h2>
            Resultados que <span className="neon-text">Escalam</span>
          </h2>
          <p>
            Da prospecção ao pós-venda, cada etapa pode contar com uma solução dedicada, sem
            obrigatoriedade de uso conjunto entre produtos.
          </p>
        </div>

        <div className="metrics-dashboard glass">
          <div className="metrics-grid">
            {metrics.map((m, i) => (
              <div key={i} className="metric-card">
                <span className="metric-value gradient-text">{m.value}</span>
                <span className="metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="dashboard-visual">
            <div className="dashboard-chart">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="chart-bar"
                  style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
