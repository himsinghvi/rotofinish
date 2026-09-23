import { motion } from 'framer-motion'
import './BlastPulse.css'

export default function BlastPulse() {
  return (
    <div className="blast-pulse" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="blast-ring"
          initial={{ scale: 0.4, opacity: 0.5 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
