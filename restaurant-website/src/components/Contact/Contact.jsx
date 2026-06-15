import "./Contact.css";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Contact() {
  return (
    <footer className="footer">

      <div className="icons-All">
           <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a></div>

      <div className="footer-container">

        {/* LEFT */}


        <div className="footer-left">

          <h1>FoodieHub</h1>

          <p>
            India's fastest food and grocery
            delivery platform.
          </p>

          <div className="footer-copy">
            © 2026 FoodieHub Limited
          </div>

        </div>

        {/* RIGHT */}

        <div className="footer-right">

          {/* COMPANY */}

          <div className="footer-column">

            <h3>Company</h3>

            <Link to="/">Home</Link>

            <Link to="/menu">Menu</Link>

            <Link to="/wishlist">
              Wishlist
            </Link>

            <Link to="/cart">Cart</Link>

          </div>

          {/* CONTACT */}

          

          <div className="footer-column">

            <h3>Contact</h3>

            <a href="mailto:foodiehub@gmail.com">
              foodiehub@gmail.com
            </a>

            <a href="tel:+919876543210">
              +91 9876543210
            </a>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
            >
              Bhopal, India
            </a>

          </div>

          {/* LEGAL */}

          <div className="footer-column">

            <h3>Legal</h3>

            <Link to="/privacy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms & Conditions
            </Link>

            <Link to="/refund">
              Refund Policy
            </Link>

          </div>

          {/* APP */}

          <div className="footer-column">

            <h3>Download App</h3>

            <button className="app-btn">
              Google Play
            </button>

            <button className="app-btn">
              App Store
            </button>

          </div>

        </div>

      </div>

        <div className="footer-bottom">

        <p>
          Made with ❤️ by FoodieHub
        </p>

      </div>

    </footer>
  );
}

export default Contact; 