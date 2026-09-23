import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useApi, useScrollAnimation } from '../hooks/useApi'
import IndustrialParticles from './motion/IndustrialParticles'
import './ProductCards.css'

export default function ProductCards({ limit, showAll = false }) {
  const { data: products, loading } = useApi('/products')
  const anim = useScrollAnimation()

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  const items = limit ? products?.slice(0, limit) : products

  return (
    <section className="section-padding products-section">
      <IndustrialParticles density="low" />
      <div className="container position-relative">
        <div className="row align-items-end mb-5">
          <div className="col-lg-6">
            <motion.div {...anim}>
              <span className="section-label">Top Products</span>
              <h2 className="section-title">Industrial Blasting<br /><span className="text-orange">Equipment Range</span></h2>
            </motion.div>
          </div>
          {!showAll && (
            <div className="col-lg-6 text-lg-end">
              <motion.div {...anim}>
                <Link to="/products" className="btn-rf-outline">
                  View All Products <i className="bi bi-arrow-right" />
                </Link>
              </motion.div>
            </div>
          )}
        </div>

        <div className="row g-4">
          {items?.map((product, i) => (
            <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <Link to={`/products/${product.id}`} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="product-shine" aria-hidden="true" />
                    <div className="product-overlay">
                      <span>View Details <i className="bi bi-arrow-up-right" /></span>
                    </div>
                  </div>
                  <div className="product-body">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p>{product.short_description}</p>
                  </div>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
