import { motion } from 'framer-motion'
import './SectionDivider.css'

export default function SectionDivider({ icon = 'gear' }) {
  const icons = {
    gear: 'bi-gear-wide-connected',
    bolt: 'bi-lightning-charge',
    factory: 'bi-building-gear',
  }

  return (
    <div className="section-divider" aria-hidden="true">
      <motion.span
        className="divider-line divider-line-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="divider-icon"
        initial={{ opacity: 0, rotate: -90 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.i
          className={`bi ${icons[icon] || icons.gear}`}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
      <motion.span
        className="divider-line divider-line-right"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
