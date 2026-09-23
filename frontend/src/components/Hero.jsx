import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useApi } from '../hooks/useApi'
import { ASSETS, BRAND } from '../config/assets'
import './Hero.css'

function SparkCanvas() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId
    let particles = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }

    class Particle {
      constructor(w, h) {
        this.reset(w, h)
      }

      reset(w, h) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 3
        this.vy = (Math.random() - 0.5) * 3
        this.life = Math.random() * 60 + 20
        this.maxLife = this.life
        this.size = Math.random() * 2 + 0.5
      }

      update(w, h) {
        this.x += this.vx
        this.y += this.vy
        this.life--
        this.vy += 0.02
        if (this.life <= 0 || this.y > h) this.reset(w, h)
      }

      draw(context) {
        const alpha = (this.life / this.maxLife) * 0.8
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fillStyle = `rgba(196, 3, 0, ${alpha})`
        context.fill()
        context.beginPath()
        context.moveTo(this.x, this.y)
        context.lineTo(this.x - this.vx * 3, this.y - this.vy * 3)
        context.strokeStyle = `rgba(255, 80, 50, ${alpha * 0.5})`
        context.lineWidth = this.size * 0.5
        context.stroke()
      }
    }

    resize()
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    particles = Array.from({ length: 70 }, () => new Particle(w, h))

    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.update(w, h)
        p.draw(ctx)
      })
      animationId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion])

  if (reduceMotion) return null

  return <canvas ref={canvasRef} className="spark-canvas" aria-hidden="true" />
}

export default function Hero() {
  const { data: slides } = useApi('/slider')
  const [activeSlide, setActiveSlide] = useState(0)
  const slideImages = slides?.length ? slides : ASSETS.slider

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slideImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slideImages.length])

  return (
    <section className="hero-rf">
      <div className="hero-slides">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            className="hero-slide"
            style={{ backgroundImage: `url(${slideImages[activeSlide]})` }}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
      </div>

      <SparkCanvas />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-gradient" aria-hidden="true" />
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <div className="row align-items-center min-vh-hero py-5">
          <div className="col-lg-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="hero-badge">
                <span className="pulse" />
                {BRAND.tagline}
              </span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="line-1">Roto</span>
              <span className="line-2">Finish</span>
              <span className="line-3">Blasting</span>
            </motion.h1>

            <motion.p
              className="hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Reliable blasting, shot peening and surface preparation solutions
              engineered for modern industrial performance.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/contact" className="btn-rf-primary">
                Contact Us <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/products" className="btn-rf-outline hero-outline">
                Explore Products
              </Link>
            </motion.div>
          </div>

          <div className="col-lg-5 d-none d-lg-block">
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="hero-machine">
                <div className="machine-ring ring-1" />
                <div className="machine-ring ring-2" />
                <div className="machine-ring ring-3" />
                <div className="machine-core">
                  <i className="bi bi-gear-wide-connected" />
                </div>
                <motion.div
                  className="machine-label"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Shot Blasting
                </motion.div>
                <motion.div
                  className="machine-label label-2"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  Surface Prep
                </motion.div>
                <motion.div
                  className="machine-label label-3"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  Shot Peening
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="hero-dots">
        {slideImages.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`hero-dot ${i === activeSlide ? 'active' : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="scroll-line">
          <motion.div
            className="scroll-dot"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
