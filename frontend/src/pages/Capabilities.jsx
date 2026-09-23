import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { CapabilitiesSection } from '../components/SectionBlocks'
import { pageTransition, useScrollAnimation } from '../hooks/useApi'

export default function Capabilities() {
  const anim = useScrollAnimation()

  return (
    <motion.div {...pageTransition}>
      <PageHero
        label="Capabilities"
        title="End-to-End Manufacturing"
        subtitle="From in-house fabrication and advanced CAD design to rigorous testing — every RotoFinish system is built for reliability."
      />
      <CapabilitiesSection />
      <section className="section-padding">
        <div className="container text-center">
          <motion.div {...anim}>
            <h2 className="section-title mb-3">Ready to Discuss Your Project?</h2>
            <p className="section-subtitle mx-auto mb-4">
              Our design and engineering teams in Jodhpur can develop custom blasting solutions for your specific application.
            </p>
            <Link to="/contact" className="btn-rf-primary">
              Start a Conversation <i className="bi bi-arrow-right" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
