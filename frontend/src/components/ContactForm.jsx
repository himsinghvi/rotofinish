import { useState } from 'react'
import { motion } from 'framer-motion'
import { postApi } from '../hooks/useApi'
import './ContactForm.css'

export default function ContactForm({ type = 'contact' }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    product: '',
    industry: '',
    message: '',
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const endpoint = type === 'quote' ? '/quote' : '/contact'
      const payload = type === 'quote'
        ? { name: form.name, email: form.email, phone: form.phone, product: form.product, industry: form.industry, message: form.message }
        : { name: form.name, email: form.email, phone: form.phone, company: form.company, subject: form.subject, message: form.message }
      const result = await postApi(endpoint, payload)
      setStatus({ type: 'success', message: result.message })
      setForm({ name: '', email: '', phone: '', company: '', subject: '', product: '', industry: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {status && (
        <div className={`alert-rf mb-4 ${status.type === 'error' ? 'alert-error' : ''}`}>
          {status.message}
        </div>
      )}

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label-rf">Full Name *</label>
          <input type="text" name="name" className="form-control form-control-rf w-100" required value={form.name} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label-rf">Email *</label>
          <input type="email" name="email" className="form-control form-control-rf w-100" required value={form.email} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label-rf">Phone {type === 'quote' ? '*' : ''}</label>
          <input type="tel" name="phone" className="form-control form-control-rf w-100" required={type === 'quote'} value={form.phone} onChange={handleChange} />
        </div>
        {type === 'contact' ? (
          <>
            <div className="col-md-6">
              <label className="form-label-rf">Company</label>
              <input type="text" name="company" className="form-control form-control-rf w-100" value={form.company} onChange={handleChange} />
            </div>
            <div className="col-12">
              <label className="form-label-rf">Subject *</label>
              <input type="text" name="subject" className="form-control form-control-rf w-100" required value={form.subject} onChange={handleChange} />
            </div>
          </>
        ) : (
          <>
            <div className="col-md-6">
              <label className="form-label-rf">Product Interest</label>
              <input type="text" name="product" className="form-control form-control-rf w-100" placeholder="e.g. Shot Blasting Machine" value={form.product} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label-rf">Industry</label>
              <input type="text" name="industry" className="form-control form-control-rf w-100" placeholder="e.g. Automotive" value={form.industry} onChange={handleChange} />
            </div>
          </>
        )}
        <div className="col-12">
          <label className="form-label-rf">Message *</label>
          <textarea name="message" className="form-control form-control-rf w-100" rows="5" required value={form.message} onChange={handleChange} />
        </div>
        <div className="col-12">
          <button type="submit" className="btn-rf-primary" disabled={loading}>
            {loading ? 'Sending...' : type === 'quote' ? 'Request Quote' : 'Send Message'}
            {!loading && <i className="bi bi-send" />}
          </button>
        </div>
      </div>
    </motion.form>
  )
}
