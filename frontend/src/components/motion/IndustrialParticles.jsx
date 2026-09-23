import './IndustrialParticles.css'

export default function IndustrialParticles({ density = 'low' }) {
  const count = density === 'low' ? 12 : 20

  return (
    <div className="industrial-particles" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${(i * 17 + 5) % 95}%`,
            animationDelay: `${(i * 0.7) % 5}s`,
            animationDuration: `${6 + (i % 4)}s`,
          }}
        />
      ))}
    </div>
  )
}
