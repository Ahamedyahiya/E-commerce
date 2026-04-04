import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSearch } from "../../context/SearchContext";
function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const { search, setSearch } = useSearch(); 

  const loadUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {

    loadUser();

    window.addEventListener("authChange", loadUser);

    return () => {
      window.removeEventListener("authChange", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChange"));

    navigate("/loginpage");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand fw-bold" to="/">PSMA SHOP</Link>

        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <form 
            className="d-flex mx-auto w-50"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search products Here..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          <ul className="navbar-nav ms-auto align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">🏠Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/aboutpage">About</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contactpage">Contact</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cardpage">🛒Cart</Link>
            </li>

            <li className="nav-item ms-3">
              {!user ? (
                 <> 
                  <Link className="btn btn-warning me-2 px-4 text-white" to="/loginpage">
                    Login
                  </Link>

                </>
              ) : (
                <>
                  <span className="text-white fs-4 me-3">👤</span>

                  <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                 </> 
               )} 
             </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


















