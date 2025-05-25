import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3 className="footer-heading">FitShop</h3>
            <p className="footer-text">
              Your one-stop destination for premium fitness equipment, 
              accessories, and gear to support your fitness journey.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-section links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Equipment</Link></li>
              <li><Link to="/products">Wearables</Link></li>
              <li><Link to="/products">Accessories</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section customer-service">
            <h3 className="footer-heading">Customer Service</h3>
            <ul className="footer-links">
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping & Returns</Link></li>
              <li><Link to="/warranty">Warranty</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section newsletter">
            <h3 className="footer-heading">Stay Updated</h3>
            <p className="footer-text">
              Subscribe to our newsletter for the latest products, offers, and fitness tips.
            </p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your Email" required />
              <button type="submit" className="btn btn-accent">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} FitShop. All Rights Reserved.
          </p>
          <div className="payment-methods">
            <span>Visa</span>
            <span>MasterCard</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;