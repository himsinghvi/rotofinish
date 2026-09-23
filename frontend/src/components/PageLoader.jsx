import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS } from '../config/assets'
import './PageLoader.css'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 400)
          return 100
        }
        return p + Math.random() * 15 + 5
      })
    }, 120)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="page-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loader-content">
            <img src={ASSETS.logo.header} alt="RotoFinish" className="loader-logo-img" />
            <div className="loader-bar">
              <motion.div
                className="loader-progress"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <span className="loader-percent">{Math.min(Math.floor(progress), 100)}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
