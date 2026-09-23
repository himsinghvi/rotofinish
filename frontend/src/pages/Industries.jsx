import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import IndustriesSection from '../components/IndustriesSection'
import { pageTransition } from '../hooks/useApi'

export default function Industries() {
  return (
    <motion.div {...pageTransition}>
      <PageHero
        label="Industries"
        title="Industries We Serve"
        subtitle="Tailor-made blasting systems for aviation, automotive, railways, oil & gas, foundry, and fabrication sectors."
      />
      <IndustriesSection fullPage />
    </motion.div>
  )
}
