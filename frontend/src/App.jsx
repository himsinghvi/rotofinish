import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import ScrollProgress from './components/ScrollProgress'
import PageLoader from './components/PageLoader'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Industries from './pages/Industries'
import Capabilities from './pages/Capabilities'
import Downloads from './pages/Downloads'
import Contact from './pages/Contact'

export default function App() {
  const location = useLocation()

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  )
}
