import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useApi, useScrollAnimation } from '../hooks/useApi'
import './StatsCounter.css'

function AnimatedNumber({ value, suffix = '' }) {
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    if (reduceMotion) {
      setCount(value)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 2000
          const start = performance.now()
          const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, reduceMotion])

  return (
    <span ref={ref} className="stat-number">
      {count}{suffix}
    </span>
  )
}

export default function StatsCounter() {
  const { data: stats } = useApi('/stats')
  const anim = useScrollAnimation()

  if (!stats) return null

  return (
    <section className="stats-section">
      <div className="container">
        <motion.div className="stats-grid" {...anim}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
