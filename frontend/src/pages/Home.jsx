import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import StatsCounter from '../components/StatsCounter'
import { WhyChooseSection, CapabilitiesSection, BrandMarquee } from '../components/SectionBlocks'
import ProductCards from '../components/ProductCards'
import IndustriesSection from '../components/IndustriesSection'
import CTASection from '../components/CTASection'
import SectionDivider from '../components/motion/SectionDivider'
import { pageTransition } from '../hooks/useApi'

export default function Home() {
  return (
    <motion.div {...pageTransition}>
      <Hero />
      <SectionDivider icon="bolt" />
      <StatsCounter />
      <SectionDivider icon="gear" />
      <WhyChooseSection />
      <SectionDivider icon="factory" />
      <ProductCards limit={4} />
      <SectionDivider icon="gear" />
      <CapabilitiesSection />
      <SectionDivider icon="bolt" />
      <IndustriesSection />
      <BrandMarquee />
      <CTASection />
    </motion.div>
  )
}
