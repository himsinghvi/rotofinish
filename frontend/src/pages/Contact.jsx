import { motion } from 'framer-motion'
import PageHero from '../components/PageHero'
import ContactForm from '../components/ContactForm'
import { useApi, pageTransition, useScrollAnimation } from '../hooks/useApi'
import './Contact.css'

export default function Contact() {
  const { data: company } = useApi('/company')
  const anim = useScrollAnimation()

  return (
    <motion.div {...pageTransition}>
      <PageHero
        label="Contact Us"
        title="Let's Build Your Solution"
        subtitle="Reach our team in Jodhpur for quotes, technical consultations, and spare parts support."
      />

      <section className="section-padding">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <motion.div {...anim}>
                <h2 className="h4 mb-4">Get in Touch</h2>
                {company && (
                  <div className="contact-info-list">
                    <div className="contact-info-item">
                      <i className="bi bi-geo-alt-fill" />
                      <div>
                        <strong>Head Office</strong>
                        <p>{company.address.line1}<br />{company.address.line2}</p>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <i className="bi bi-telephone-fill" />
                      <div>
                        <strong>Phone</strong>
                        <p><a href={`tel:${company.phone.replace(/\s/g, '')}`}>{company.phone}</a></p>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <i className="bi bi-envelope-fill" />
                      <div>
                        <strong>Email</strong>
                        <p><a href={`mailto:${company.email}`}>{company.email}</a></p>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <i className="bi bi-clock-fill" />
                      <div>
                        <strong>Business Hours</strong>
                        <p>Monday – Saturday / 9:00 AM – 6:00 PM IST</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="contact-map mt-4">
                  <iframe
                    title="RotoFinish Location"
                    src="https://maps.google.com/maps?q=Jodhpur,Rajasthan,India&output=embed"
                    width="100%"
                    height="250"
                    style={{ border: 0, filter: 'grayscale(80%) invert(92%) contrast(83%)' }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
            <div className="col-lg-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
