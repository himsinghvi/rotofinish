import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <div className={`scroll-indicator ${visible ? 'visible' : ''}`}>
        <div className="scroll-indicator-dot" />
        <span>Scroll</span>
      </div>
    </>
  )
}
