import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { useApi, pageTransition, useScrollAnimation } from '../hooks/useApi'
import './About.css'

export default function About() {
  const { data: about } = useApi('/about')
  const { data: company } = useApi('/company')
  const anim = useScrollAnimation()

  return (
    <motion.div {...pageTransition}>
      <PageHero
        label="About Us"
        title="Vision, Mission & Quality"
        subtitle="Engineering surface preparation excellence from Jodhpur, Rajasthan — serving industries across India and beyond."
      />

      <section className="section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <motion.div className="about-block glass-card p-4 p-lg-5" {...anim}>
                <span className="section-label">Vision</span>
                <p className="about-text">{about?.vision}</p>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div className="about-block glass-card p-4 p-lg-5" {...anim} transition={{ delay: 0.15 }}>
                <span className="section-label">Mission</span>
                <p className="about-text">{about?.mission}</p>
              </motion.div>
            </div>
          </div>

          <motion.div className="about-block glass-card p-4 p-lg-5 mt-5" {...anim}>
            <span className="section-label">Quality Policy</span>
            <p className="about-text">{about?.quality_policy}</p>
          </motion.div>

          <motion.div className="mt-5" {...anim}>
            <span className="section-label">Certifications</span>
            <h2 className="section-title mb-4">Standards & Compliance</h2>
            <div className="row g-3">
              {about?.certifications?.map((cert, i) => (
                <div key={cert} className="col-md-6">
                  <motion.div
                    className="cert-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <i className="bi bi-patch-check-fill" />
                    <span>{cert}</span>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>

          {company && (
            <motion.div className="about-location mt-5 p-4 p-lg-5" {...anim}>
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <span className="section-label">Head Office</span>
                  <h3 className="h4 mb-3">{company.address.line1}</h3>
                  <p className="text-muted mb-0">{company.address.line2}</p>
                </div>
                <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
                  <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="btn-rf-primary">
                    <i className="bi bi-telephone" /> {company.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  )
}
