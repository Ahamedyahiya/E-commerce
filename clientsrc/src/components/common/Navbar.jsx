import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUser();
    window.addEventListener("authChange", loadUser);
    return () => window.removeEventListener("authChange", loadUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/loginpage");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');

        .psma-navbar {
          background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
          font-family: 'DM Sans', sans-serif;
          position: sticky;
          top: 0;
          z-index: 1000;
          padding: 0;
          box-shadow: 0 4px 30px rgba(0,0,0,0.4);
        }

        .psma-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 68px;
          max-width: 1400px;
          margin: 0 auto;
          gap: 12px;
          overflow: hidden;
        }

        /* BRAND */
        .psma-brand {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.75rem;
          letter-spacing: 4px;
          text-decoration: none !important;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .psma-brand-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #f5a623, #e8433a);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 4px 15px rgba(245,166,35,0.4);
          animation: pulse 2.5s infinite;
          flex-shrink: 0;
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(245,166,35,0.4); }
          50%       { box-shadow: 0 4px 25px rgba(245,166,35,0.7); }
        }
        .psma-brand-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }
        .psma-brand-top {
          font-size: 0.55rem;
          letter-spacing: 3px;
          color: #f5a623;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          text-transform: uppercase;
        }
        .psma-brand-main {
          color: #ffffff;
          font-size: 1.5rem;
          letter-spacing: 3px;
        }
        .psma-brand-main span { color: #f5a623; }

        /* NAV LINKS */
        .psma-links {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 768px) { .psma-links { display: none; } }

        .psma-links a {
          color: rgba(255,255,255,0.6);
          text-decoration: none !important;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 10px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .psma-links a:hover {
          color: #fff;
          background: rgba(255,255,255,0.08);
        }
        .psma-links a .nav-icon { font-size: 1rem; }

        .cart-special {
          background: rgba(245,166,35,0.12) !important;
          border: 1px solid rgba(245,166,35,0.3) !important;
          color: #f5a623 !important;
          font-weight: 600 !important;
        }
        .cart-special:hover {
          background: rgba(245,166,35,0.22) !important;
          border-color: #f5a623 !important;
        }

        /* RIGHT SECTION — hidden on mobile */
        .psma-right {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .psma-right { display: none; }
        }

        /* BADGE */
        .psma-badge {
          background: linear-gradient(135deg, #f5a623, #e8433a);
          color: #fff;
          font-size: 0.62rem;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
          letter-spacing: 1px;
          text-transform: uppercase;
          animation: badgePulse 2s infinite;
          white-space: nowrap;
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.7; }
        }

        /* AUTH BUTTONS */
        .btn-psma-login {
          background: linear-gradient(135deg, #f5a623, #e8433a);
          color: #fff !important;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 8px 22px;
          border-radius: 10px;
          text-decoration: none !important;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          box-shadow: 0 4px 15px rgba(245,166,35,0.3);
          white-space: nowrap;
        }
        .btn-psma-login:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245,166,35,0.5);
        }

        .btn-psma-logout {
          background: transparent;
          border: 1px solid rgba(232,67,58,0.5);
          color: #e8433a;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 7px 16px;
          border-radius: 10px;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .btn-psma-logout:hover {
          background: #e8433a;
          color: #fff;
          border-color: #e8433a;
        }

        .psma-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .psma-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f5a623, #e8433a);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          box-shadow: 0 0 0 2px rgba(245,166,35,0.4);
          flex-shrink: 0;
        }

        /* HAMBURGER */
        .psma-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          flex-shrink: 0;
        }
        .psma-burger span {
          display: block;
          width: 24px;
          height: 2px;
          background: #f0ede8;
          border-radius: 2px;
          transition: all 0.3s;
        }
        .psma-burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .psma-burger.open span:nth-child(2) { opacity: 0; }
        .psma-burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        @media (max-width: 768px) { .psma-burger { display: flex; } }

        /* MOBILE DRAWER */
        .psma-drawer {
          display: none;
          background: #13102a;
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 16px 24px 24px;
          flex-direction: column;
          gap: 6px;
          animation: slideDown 0.25s ease;
        }
        .psma-drawer.open { display: flex; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .psma-drawer a {
          color: rgba(255,255,255,0.65);
          text-decoration: none !important;
          font-size: 1rem;
          font-weight: 500;
          padding: 11px 14px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.2s;
        }
        .psma-drawer a:hover {
          background: rgba(255,255,255,0.06);
          color: #fff;
        }

        .psma-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 6px 0;
        }

        /* Mobile user info row */
        .psma-drawer-user {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
        }
        .psma-drawer-username {
          color: rgba(255,255,255,0.85);
          font-size: 0.95rem;
          font-weight: 600;
        }

        .psma-drawer-auth {
          display: flex;
          gap: 10px;
          padding-top: 4px;
        }
        .psma-drawer-auth .btn-psma-login,
        .psma-drawer-auth .btn-psma-logout {
          flex: 1;
          justify-content: center;
        }
      `}</style>

      <nav className="psma-navbar">
        <div className="psma-inner">

          {/* BRAND */}
          <Link className="psma-brand" to="/">
            <div className="psma-brand-icon">🛍️</div>
            <div className="psma-brand-text">
              <span className="psma-brand-top">Premium Store</span>
              <span className="psma-brand-main">PSMA <span>SHOP</span></span>
            </div>
          </Link>

          {/* NAV LINKS - Desktop only */}
          <ul className="psma-links">
            <li><Link to="/"><span className="nav-icon">🏠</span> Home</Link></li>
            <li><Link to="/aboutpage"><span className="nav-icon">💡</span> About</Link></li>
            <li><Link to="/contactpage"><span className="nav-icon">📞</span> Contact</Link></li>
            <li><Link to="/cardpage" className="cart-special"><span className="nav-icon">🛒</span> Cart</Link></li>
          </ul>

          {/* RIGHT - Desktop auth (hidden on mobile) */}
          <div className="psma-right">
            <span className="psma-badge">✨ New Arrivals</span>
            {!user ? (
              <Link className="btn-psma-login" to="/loginpage">🔐 Login</Link>
            ) : (
              <div className="psma-user">
                <div className="psma-avatar">👤</div>
                <button className="btn-psma-logout" onClick={handleLogout}>🚪 Logout</button>
              </div>
            )}
          </div>

          {/* HAMBURGER - Mobile only */}
          <button
            className={`psma-burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`psma-drawer ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>🏠 Home</Link>
          <Link to="/aboutpage" onClick={() => setMenuOpen(false)}>💡 About</Link>
          <Link to="/contactpage" onClick={() => setMenuOpen(false)}>📞 Contact</Link>
          <Link to="/cardpage" onClick={() => setMenuOpen(false)}>🛒 Cart</Link>

          <div className="psma-divider" />

          {/* Mobile Auth Section */}
          {user ? (
            <>
              <div className="psma-drawer-user">
                <div className="psma-avatar">👤</div>
                <span className="psma-drawer-username">
                  {user.name || user.email || "My Account"}
                </span>
              </div>
              <div className="psma-drawer-auth">
                <button
                  className="btn-psma-logout"
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                >
                  🚪 Logout
                </button>
              </div>
            </>
          ) : (
            <div className="psma-drawer-auth">
              <Link
                className="btn-psma-login"
                to="/loginpage"
                onClick={() => setMenuOpen(false)}
              >
                🔐 Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;