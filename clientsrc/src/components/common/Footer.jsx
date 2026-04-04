import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
      <div className="container-fluid">
        <div className="row px-4">

          {/* Brand Section */}
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold fs-4">PSMA SHOP</h5>
            <p className="text-secondary">
              Your one-stop destination for quality products at the best prices.
              Shop smart, shop easy.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold text-uppercase mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-1">
                <Link className="text-secondary text-decoration-none" to="/">🏠 Home</Link>
              </li>
              <li className="mb-1">
                <Link className="text-secondary text-decoration-none" to="/aboutpage">About</Link>
              </li>
              <li className="mb-1">
                <Link className="text-secondary text-decoration-none" to="/contactpage">Contact</Link>
              </li>
              <li className="mb-1">
                <Link className="text-secondary text-decoration-none" to="/cardpage">🛒 Cart</Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="col-md-2 mb-3">
            <h6 className="fw-bold text-uppercase mb-3">Account</h6>
            <ul className="list-unstyled">
              <li className="mb-1">
                <Link className="text-secondary text-decoration-none" to="/loginpage">Login</Link>
              </li>
              <li className="mb-1">
                <Link className="text-secondary text-decoration-none" to="/registerpage">Register</Link>
              </li>
              <li className="mb-1">
                <Link className="text-secondary text-decoration-none" to="/profilepage">👤 Profile</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold text-uppercase mb-3">Contact Us</h6>
            <ul className="list-unstyled text-secondary">
              <li className="mb-1">📧 support@psma-shop.com</li>
              <li className="mb-1">📞 +91 98765 43210</li>
              <li className="mb-1">📍 Chennai, Tamil Nadu, India</li>
            </ul>
            {/* Social Icons */}
            <div className="mt-3 d-flex gap-3">
              <a href="#" className="text-warning fs-5 text-decoration-none">📘</a>
              <a href="#" className="text-warning fs-5 text-decoration-none">📸</a>
              <a href="#" className="text-warning fs-5 text-decoration-none">🐦</a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center px-4">
          <p className="text-secondary mb-1 mb-md-0 small">
            © {new Date().getFullYear()} <span className="text-warning fw-bold">PSMA SHOP</span>. All rights reserved.
          </p>
          <div className="d-flex gap-3">
            <Link className="text-secondary text-decoration-none small" to="/privacy">Privacy Policy</Link>
            <Link className="text-secondary text-decoration-none small" to="/terms">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;