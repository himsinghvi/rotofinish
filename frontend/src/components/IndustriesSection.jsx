import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useApi, useScrollAnimation } from '../hooks/useApi'
import IndustrialParticles from './motion/IndustrialParticles'
import './IndustriesSection.css'

export default function IndustriesSection({ fullPage = false }) {
  const { data: industries } = useApi('/industries')
  const [active, setActive] = useState(0)
  const anim = useScrollAnimation()

  if (!industries) return null

  const activeIndustry = industries[active]

  return (
    <section className={`section-padding industries-section ${fullPage ? 'full-page' : ''}`}>
      <IndustrialParticles density="low" />
      <div className="container position-relative">
        <motion.div className="mb-5" {...anim}>
          <span className="section-label">Industries Served</span>
          <h2 className="section-title">
            Built for Every<br /><span className="text-orange">Industrial Sector</span>
          </h2>
        </motion.div>

        <div className="row g-4 mb-4">
          {industries.map((ind, i) => (
            <div key={ind.id} className="col-md-6 col-lg-4">
              <motion.button
                type="button"
                className={`industry-card ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="industry-card-bg">
                  <img src={ind.image} alt={ind.name} loading="lazy" />
                </div>
                <div className="industry-card-overlay" />
                <div className="industry-card-content">
                  <h3>{ind.name}</h3>
                </div>
              </motion.button>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry.id}
            className="industry-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="row g-4 align-items-center">
              <div className="col-lg-5">
                <img src={activeIndustry.image} alt={activeIndustry.name} className="industry-detail-img" />
              </div>
              <div className="col-lg-7">
                <h3>{activeIndustry.name}</h3>
                <p>{activeIndustry.description}</p>
                <Link to="/contact" className="btn-rf-outline mt-3">
                  Request Solution <i className="bi bi-arrow-right" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {!fullPage && (
          <motion.div className="text-center mt-5" {...anim}>
            <Link to="/industries" className="btn-rf-outline">
              View All Industries <i className="bi bi-arrow-right" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
