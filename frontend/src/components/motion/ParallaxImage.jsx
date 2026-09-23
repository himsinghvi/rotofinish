import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import './ParallaxImage.css'

export default function ParallaxImage({ src, alt, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05])

  return (
    <motion.div ref={ref} className={`parallax-image ${className}`} style={{ y }}>
      <motion.img src={src} alt={alt} style={{ scale }} loading="lazy" />
      <span className="parallax-frame" aria-hidden="true" />
    </motion.div>
  )
}
