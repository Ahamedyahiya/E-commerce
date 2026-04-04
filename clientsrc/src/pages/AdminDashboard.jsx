import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  const navItems = [
    {
      to: "/productcreation",
      icon: "📦",
      label: "Product Creation",
      sub: "Add new products to your catalog",
      badge: "Create",
      badgeColor: "bg-success",
      btnColor: "btn-success",
      borderColor: "border-success",
    },
    {
      to: "/productbulkupload",
      icon: "📤",
      label: "Bulk Upload",
      sub: "Import multiple products via CSV",
      badge: "Upload",
      badgeColor: "bg-primary",
      btnColor: "btn-primary",
      borderColor: "border-primary",
    },
    {
      to: "/orderlist",
      icon: "🧾",
      label: "Order List",
      sub: "View and manage all customer orders",
      badge: "Manage",
      badgeColor: "bg-warning text-dark",
      btnColor: "btn-warning",
      borderColor: "border-warning",
    },
    {
      to: "/userlist",       // ✅ NEW
      icon: "👥",
      label: "User List",
      sub: "View and manage all registered users",
      badge: "Users",
      badgeColor: "bg-info text-dark",
      btnColor: "btn-info",
      borderColor: "border-info",
    },
  ];

  return (
    <div className="min-vh-100">
      {/* Top Navbar */}
      <nav className="navbar navbar-dark bg-black border-bottom border-secondary shadow-sm px-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold fs-4 text-white d-flex align-items-center gap-2">
            <span>👑</span>
            <span>Admin<span className="text-warning">Panel</span></span>
          </span>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle bg-warning d-flex align-items-center justify-content-center text-dark fw-bold"
                style={{ width: 36, height: 36, fontSize: 14 }}
              >
                {(user?.name || user?.email || "A")[0].toUpperCase()}
              </div>
              <span className="text-secondary d-none d-md-inline" style={{ fontSize: 13 }}>
                {user?.name || user?.email || "Admin"}
              </span>
            </div>
            <button className="btn btn-outline-danger btn-sm px-3" onClick={handleLogout}>
              ↩ Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container py-5">

        <div
          className="rounded-4 p-4 mb-5 text-white d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3"
          style={{ background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" }}
        >
          <div>
            <p className="text-warning fw-semibold mb-1" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              ● Live — Admin Console
            </p>
            <h2 className="fw-bold mb-1">
              Welcome back, {user?.name || user?.email || "Admin"} 👋
            </h2>
            <p className="text-secondary mb-0" style={{ fontSize: 14 }}>
              Manage your store from one place
            </p>
          </div>
          <div className="text-md-end">
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill fw-semibold">
              🛡️ Super Admin
            </span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 mb-4">
          <span className="bg-warning rounded" style={{ width: 4, height: 20, display: "inline-block" }}></span>
          <h6 className="text-uppercase text-secondary mb-0 fw-semibold" style={{ letterSpacing: "0.12em", fontSize: 12 }}>
            Quick Actions
          </h6>
        </div>

        <div className="row g-4">
          {navItems.map((item) => (
            <div className="col-12 col-md-4" key={item.to}>
              <div
                className={`card bg-black border ${item.borderColor} border-opacity-25 rounded-4 h-100 shadow`}
                style={{ transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
              >
                <div className="card-body p-4 d-flex flex-column gap-3">
                  <div className="d-flex justify-content-between align-items-start">
                    <span style={{ fontSize: 36 }}>{item.icon}</span>
                    <span className={`badge ${item.badgeColor} rounded-pill px-3`} style={{ fontSize: 11 }}>
                      {item.badge}
                    </span>
                  </div>
                  <div>
                    <h5 className="text-white fw-bold mb-1">{item.label}</h5>
                    <p className="text-secondary mb-0" style={{ fontSize: 13 }}>{item.sub}</p>
                  </div>
                  <div className="mt-auto pt-2">
                    <Link to={item.to} className={`btn ${item.btnColor} btn-sm w-100 fw-semibold rounded-pill`}>
                      Go to {item.label} →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;



