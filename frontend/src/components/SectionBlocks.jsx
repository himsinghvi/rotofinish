import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useApi, useScrollAnimation, staggerContainer, staggerItem } from '../hooks/useApi'
import { ASSETS } from '../config/assets'
import ParallaxImage from './motion/ParallaxImage'
import IndustrialParticles from './motion/IndustrialParticles'
import './SectionBlocks.css'

const icons = {
  factory: 'bi-building-gear',
  design: 'bi-bezier2',
  globe: 'bi-globe2',
  parts: 'bi-tools',
  manufacturing: 'bi-gear-wide-connected',
  research: 'bi-lightbulb',
  testing: 'bi-shield-check',
}

function IconBox({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      className="icon-box"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -6 }}
    >
      <motion.div
        className="icon-box-icon"
        whileHover={{ rotate: 8, scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        <i className={`bi ${icons[icon] || 'bi-star'}`} />
      </motion.div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  )
}

export function WhyChooseSection() {
  const { data } = useApi('/why-choose')
  const { data: company } = useApi('/company')
  const anim = useScrollAnimation()
  const aboutImage = company?.about_image || ASSETS.about

  if (!data) return null

  return (
    <section className="section-padding why-choose-section" id="why-choose">
      <IndustrialParticles density="low" />
      <div className="container position-relative">
        <div className="row align-items-center g-5 mb-5">
          <div className="col-lg-6">
            <motion.div {...anim}>
              <span className="section-label">Why Choose Rotofinish</span>
              <h2 className="section-title">State-of-the-art manufacturing in<br /><span className="text-orange">Jodhpur, Rajasthan</span></h2>
              <motion.ul
                className="why-choose-list"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                {[
                  'In-house design, R&D, and testing teams',
                  'Strong presence across India and expanding abroad',
                  'Reliable spare parts support with ready stock availability',
                  'Tailor-made systems for Aviation, Automotive, Railways, Oil & Gas, and more',
                ].map((item) => (
                  <motion.li key={item} variants={staggerItem}>{item}</motion.li>
                ))}
              </motion.ul>
              <Link to="/contact" className="btn-rf-primary mt-3">
                Contact Us <i className="bi bi-arrow-right" />
              </Link>
            </motion.div>
          </div>
          <div className="col-lg-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <ParallaxImage src={aboutImage} alt="Why choose Rotofinish" />
            </motion.div>
          </div>
        </div>

        <div className="row g-4">
          {data.map((item, i) => (
            <div key={item.title} className="col-md-6 col-lg-3">
              <IconBox {...item} delay={i * 0.1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CapabilitiesSection() {
  const { data } = useApi('/capabilities')
  const anim = useScrollAnimation()

  if (!data) return null

  return (
    <section className="section-padding capabilities-section">
      <IndustrialParticles density="low" />
      <div className="container position-relative">
        <motion.div className="text-center mb-5" {...anim}>
          <span className="section-label justify-content-center">Capabilities</span>
          <h2 className="section-title">From Design to Delivery</h2>
          <p className="section-subtitle mx-auto">
            End-to-end surface preparation solutions — manufacturing, designing, R&amp;D, and rigorous testing.
          </p>
        </motion.div>
        <div className="capabilities-grid">
          {data.map((cap, i) => (
            <motion.div
              key={cap.title}
              className="capability-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div className="cap-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="cap-icon"><i className={`bi ${icons[cap.icon] || 'bi-star'}`} /></div>
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BrandMarquee() {
  const { data: brands } = useApi('/brands')
  if (!brands) return null

  const doubled = [...brands, ...brands]

  return (
    <section className="marquee-section">
      <div className="container mb-4">
        <h2 className="section-title text-center">Brands We&apos;ve Worked With</h2>
      </div>
      <div className="marquee-track">
        <motion.div
          className="marquee-content"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
        >
          {doubled.map((brand, i) => (
            <div key={`${brand.name}-${i}`} className="marquee-brand">
              <img src={brand.logo} alt={brand.name} loading="lazy" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
