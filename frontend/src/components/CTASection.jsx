import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useApi'
import BlastPulse from './motion/BlastPulse'
import IndustrialParticles from './motion/IndustrialParticles'
import './CTASection.css'

export default function CTASection() {
  const anim = useScrollAnimation()

  return (
    <section className="cta-section">
      <IndustrialParticles density="low" />
      <BlastPulse />
      <div className="cta-particles" aria-hidden="true" />
      <div className="container position-relative">
        <motion.div className="cta-content text-center" {...anim}>
          <span className="section-label justify-content-center">Get Started</span>
          <h2 className="section-title">
            Ready to Upgrade Your<br />Surface Preparation?
          </h2>
          <p className="section-subtitle mx-auto mb-4">
            From custom blasting cabinets to complete blast room systems —
            our team in Jodhpur is ready to engineer the right solution for your industry.
          </p>
          <motion.div
            className="d-flex flex-wrap justify-content-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <Link to="/contact" className="btn-rf-primary">
              Request a Quote <i className="bi bi-arrow-right" />
            </Link>
            <a href="tel:+917014006147" className="btn-rf-outline cta-outline">
              <i className="bi bi-telephone" /> Call Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
