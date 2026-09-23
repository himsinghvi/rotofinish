import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import ProductCards from '../components/ProductCards'
import { pageTransition } from '../hooks/useApi'

export default function Products() {
  return (
    <motion.div {...pageTransition}>
      <PageHero
        label="Products"
        title="Our Equipment Range"
        subtitle="From abrasive blasting cabinets to complete blast room systems — engineered for precision, durability, and industrial performance."
      />
      <ProductCards showAll />
    </motion.div>
  )
}
