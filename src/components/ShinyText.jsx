export default function ShinyText({
  children,
  speed = 3,
  className = '',
  color = 'var(--primary)',
  shineColor = '#ffffff',
  spread = 120,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: `shiny-text-move ${speed}s linear infinite`,
  };

  return (
    <span className={`shiny-text ${className}`} style={gradientStyle}>
      {children}
    </span>
  );
}
