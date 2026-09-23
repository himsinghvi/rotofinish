import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS } from '../config/assets'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/industries', label: 'Industries' },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/downloads', label: 'Downloads' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <div className="top-bar">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="top-bar-left">
            <a href="tel:+917014006147"><i className="bi bi-telephone-fill" /> (+91) 7014006147</a>
            <a href="mailto:rotofinishblasting@gmail.com"><i className="bi bi-envelope-fill" /> rotofinishblasting@gmail.com</a>
          </div>
          <div className="top-bar-right d-none d-md-flex">
            <span><i className="bi bi-geo-alt-fill" /> Jodhpur, Rajasthan, India</span>
          </div>
        </div>
      </div>

      <motion.header
        className={`navbar-rf ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="navbar-brand-rf">
            <img src={ASSETS.logo.header} alt="RotoFinish Blasting Equipments" className="brand-logo" />
          </Link>

          <nav className="nav-desktop d-none d-lg-flex">
            {navLinks.map((link) => (
              <motion.div key={link.to} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => `nav-link-rf ${isActive ? 'active' : ''}`}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <div className="d-flex align-items-center gap-3">
            <Link to="/contact" className="btn-rf-primary d-none d-md-inline-flex">
              Contact Us <i className="bi bi-arrow-right" />
            </Link>
            <button
              className={`menu-toggle ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mobile-nav">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink to={link.to} className="mobile-nav-link" end={link.to === '/'}>
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <Link to="/contact" className="btn-rf-primary mt-4">
              Contact Us <i className="bi bi-arrow-right" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
