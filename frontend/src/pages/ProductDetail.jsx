import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import { useApi, pageTransition, useScrollAnimation } from '../hooks/useApi'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: product, loading, error } = useApi(`/products/${id}`)
  const anim = useScrollAnimation()

  if (loading) {
    return (
      <div className="text-center py-5 min-vh-50">
        <div className="spinner-border text-warning" role="status" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product Not Found</h2>
        <Link to="/products" className="btn-rf-primary mt-3">Back to Products</Link>
      </div>
    )
  }

  return (
    <motion.div {...pageTransition}>
      <PageHero label={product.category} title={product.name} subtitle={product.short_description} />

      <section className="section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <motion.div {...anim}>
                <h2 className="h3 mb-4">Overview</h2>
                <p className="product-detail-desc">{product.description}</p>

                <h3 className="h5 mt-5 mb-3">Key Features</h3>
                <ul className="feature-list">
                  {product.features.map((f) => (
                    <li key={f}><i className="bi bi-check-circle-fill" /> {f}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
            <div className="col-lg-5">
              <motion.div className="product-detail-sidebar glass-card p-4" {...anim} transition={{ delay: 0.2 }}>
                <div className="sidebar-visual">
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>Request a Quote</h3>
                <p className="text-muted small">Get a tailored proposal for {product.name}</p>
                <ContactForm type="quote" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
