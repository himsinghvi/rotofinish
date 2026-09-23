import { Link } from 'react-router-dom'
import { ASSETS } from '../config/assets'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer-rf">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="footer-brand">
              <img src={ASSETS.logo.footer} alt="RotoFinish" className="footer-logo-img" />
            </div>
            <p className="footer-desc">
              At RotoFinish, we manufacture and export advanced surface preparation systems
              including Sand Blasting Machines, Shot Blasting Machines, Blasting Rooms,
              Spray Booths, Dust Collectors, and Baking Ovens.
            </p>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Top Products</h5>
            <ul>
              <li><Link to="/products/airless-swing-table">Airless Swing Table</Link></li>
              <li><Link to="/products/airless-shot-blasting">Airless Shot Blasting Machine</Link></li>
              <li><Link to="/products/abrasive-blasting-cabinets">Abrasive Blasting Cabinets</Link></li>
            </ul>
          </div>

          <div className="col-6 col-lg-2">
            <h5>Quick Links</h5>
            <ul>
              <li><Link to="/about">Vision & Mission</Link></li>
              <li><Link to="/about">Quality Policy</Link></li>
              <li><Link to="/downloads">Certification</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="col-lg-4">
            <h5>Contact Us</h5>
            <div className="footer-contact">
              <p><strong>Head Office</strong></p>
              <p>Khasra No.-173, Salawas Road, Near B.L. Junawa Weigh Bridge</p>
              <p>Sangariya, Jodhpur-342013, Rajasthan, INDIA</p>
              <p className="mt-3">
                <a href="tel:+917014006147"><i className="bi bi-telephone-fill" /> +91 7014006147</a>
              </p>
              <p>
                <a href="mailto:rotofinishblasting@gmail.com">
                  <i className="bi bi-envelope-fill" /> rotofinishblasting@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rotofinish. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
