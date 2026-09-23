import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import { useApi, pageTransition, useScrollAnimation } from '../hooks/useApi'
import './Downloads.css'

export default function Downloads() {
  const { data: downloads } = useApi('/downloads')
  const anim = useScrollAnimation()

  return (
    <motion.div {...pageTransition}>
      <PageHero
        label="Downloads"
        title="Resources & Documents"
        subtitle="Company profile, product catalogues, quality policies, and certification documents."
      />

      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            {downloads?.map((doc, i) => (
              <div key={doc.title} className="col-md-6 col-lg-3">
                <motion.div
                  className="download-card glass-card"
                  {...anim}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="download-icon">
                    <i className="bi bi-file-earmark-pdf" />
                  </div>
                  <h3>{doc.title}</h3>
                  <div className="download-meta">
                    <span>{doc.type}</span>
                    <span>{doc.size}</span>
                  </div>
                  <button className="btn-rf-outline w-100 mt-3" type="button">
                    <i className="bi bi-download" /> Download
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
          <motion.p className="text-center text-muted mt-5 small" {...anim}>
            Documents available upon request. Contact us for the latest product catalogues and technical specifications.
          </motion.p>
        </div>
      </section>
    </motion.div>
  )
}
