import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../service/orderservice";

const STATUS_CONFIG = {
  Pending:   { color: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
  Shipped:   { color: "#3b82f6", bg: "rgba(59,130,246,0.10)" },
  Delivered: { color: "#10b981", bg: "rgba(16,185,129,0.10)" },
  Cancelled: { color: "#ef4444", bg: "rgba(239,68,68,0.10)"  },
};

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    const data = await getAllOrders();
    setOrders(data || []);
    setTimeout(() => setLoaded(true), 100);
  };

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, orderStatus: status } : o)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    setDeletingId(id);
    setTimeout(async () => {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      setDeletingId(null);
    }, 350);
  };

  const filtered = orders.filter((o) =>
    (o.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .oms-root {
          font-family: 'Syne', sans-serif;
          min-height: 100vh;
          background: #f4f6fb;
          padding: 40px 36px;
        }

        /* ── TOP BAR ── */
        .oms-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .oms-topbar.show { opacity: 1; transform: translateY(0); }

        .oms-title {
          font-size: 28px;
          font-weight: 800;
          color: #1a1a2e;
          letter-spacing: -0.5px;
        }
        .oms-title span {
          background: linear-gradient(90deg, #6366f1, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .oms-search-wrap {
          position: relative;
          width: 280px;
        }
        .oms-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }
        .oms-search {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border-radius: 12px;
          border: 1.5px solid #e5e7eb;
          background: #fff;
          font-family: 'Syne', sans-serif;
          font-size: 13.5px;
          color: #1a1a2e;
          outline: none;
          box-shadow: 0 2px 8px rgba(99,102,241,0.06);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .oms-search::placeholder { color: #b0b7c3; }
        .oms-search:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        /* ── STAT CARDS ── */
        .oms-stats {
          display: flex;
          gap: 20px;
          margin-bottom: 28px;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s;
        }
        .oms-stats.show { opacity: 1; transform: translateY(0); }

        .oms-stat-card {
          flex: 1;
          background: #fff;
          border-radius: 16px;
          padding: 22px 26px;
          border: 1.5px solid #f0f0f5;
          box-shadow: 0 2px 16px rgba(99,102,241,0.07);
          display: flex;
          align-items: center;
          gap: 18px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .oms-stat-card:hover {
          box-shadow: 0 6px 24px rgba(99,102,241,0.13);
          transform: translateY(-2px);
        }

        .oms-stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .oms-stat-label {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #9ca3af;
          font-family: 'DM Mono', monospace;
          margin-bottom: 4px;
        }
        .oms-stat-value {
          font-size: 26px;
          font-weight: 800;
          color: #1a1a2e;
          letter-spacing: -0.5px;
          line-height: 1;
        }

        /* ── TABLE ── */
        .oms-table-wrap {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          border: 1.5px solid #f0f0f5;
          box-shadow: 0 2px 16px rgba(99,102,241,0.07);
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
        }
        .oms-table-wrap.show { opacity: 1; transform: translateY(0); }

        .oms-table { width: 100%; border-collapse: collapse; }

        .oms-thead { background: #fafbff; border-bottom: 1.5px solid #f0f0f5; }
        .oms-thead th {
          padding: 14px 20px;
          text-align: left;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #6366f1;
          font-family: 'DM Mono', monospace;
        }

        .oms-row {
          background: #fff;
          border-bottom: 1px solid #f4f5f9;
          transition: background 0.18s ease, opacity 0.35s ease, transform 0.35s ease;
        }
        .oms-row:last-child { border-bottom: none; }
        .oms-row:hover { background: #f8f8ff; }
        .oms-row.deleting { opacity: 0; transform: translateX(30px); }

        .oms-row td {
          padding: 15px 20px;
          font-size: 13.5px;
          color: #374151;
          vertical-align: middle;
        }

        .oms-id {
          font-family: 'DM Mono', monospace;
          font-size: 11.5px;
          color: #6366f1;
          background: rgba(99,102,241,0.08);
          padding: 3px 9px;
          border-radius: 7px;
          display: inline-block;
          border: 1px solid rgba(99,102,241,0.18);
          font-weight: 500;
        }

        .oms-user { font-weight: 700; color: #1a1a2e; }

        .oms-product-name { color: #6b7280; font-size: 13px; line-height: 1.9; }

        .oms-qty {
          font-family: 'DM Mono', monospace;
          color: #9ca3af;
          font-size: 13px;
          line-height: 1.9;
        }

        .oms-amount {
          font-family: 'DM Mono', monospace;
          font-weight: 700;
          color: #10b981;
          font-size: 14px;
        }

        .oms-select {
          appearance: none;
          padding: 6px 28px 6px 10px;
          border-radius: 8px;
          border: 1.5px solid #e5e7eb;
          font-size: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%236366f1'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
        }
        .oms-select:focus { border-color: #6366f1; }

        .oms-delete-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(239,68,68,0.07);
          color: #ef4444;
          border: 1.5px solid rgba(239,68,68,0.2);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
        }
        .oms-delete-btn:hover {
          background: rgba(239,68,68,0.15);
          border-color: rgba(239,68,68,0.45);
          transform: scale(1.04);
        }
        .oms-delete-btn:active { transform: scale(0.97); }

        .oms-empty {
          text-align: center;
          padding: 70px;
          color: #9ca3af;
          font-size: 16px;
          font-weight: 600;
        }

        .oms-no-result {
          text-align: center;
          padding: 40px;
          color: #b0b7c3;
          font-size: 14px;
          font-weight: 600;
        }
      `}</style>

      <div className="oms-root">

        {/* ── TOP BAR ── */}
        <div className={`oms-topbar ${loaded ? "show" : ""}`}>
          <div className="oms-title">
            Order <span>Management</span>
          </div>

          {/* Search Bar */}
          <div className="oms-search-wrap">
            <svg className="oms-search-icon" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="oms-search"
              type="text"
              placeholder="Search by customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className={`oms-stats ${loaded ? "show" : ""}`}>
          <div className="oms-stat-card">
            <div className="oms-stat-icon" style={{ background: "rgba(99,102,241,0.10)" }}>
              📦
            </div>
            <div>
              <div className="oms-stat-label">Total Orders</div>
              <div className="oms-stat-value">{orders.length}</div>
            </div>
          </div>

          <div className="oms-stat-card">
            <div className="oms-stat-icon" style={{ background: "rgba(16,185,129,0.10)" }}>
              💰
            </div>
            <div>
              <div className="oms-stat-label">Total Revenue</div>
              <div className="oms-stat-value" style={{ color: "#10b981" }}>
                ₹{totalRevenue.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          <div className="oms-stat-card">
            <div className="oms-stat-icon" style={{ background: "rgba(245,158,11,0.10)" }}>
              ⏳
            </div>
            <div>
              <div className="oms-stat-label">Pending</div>
              <div className="oms-stat-value" style={{ color: "#f59e0b" }}>
                {orders.filter((o) => o.orderStatus === "Pending").length}
              </div>
            </div>
          </div>

          <div className="oms-stat-card">
            <div className="oms-stat-icon" style={{ background: "rgba(16,185,129,0.10)" }}>
              ✅
            </div>
            <div>
              <div className="oms-stat-label">Delivered</div>
              <div className="oms-stat-value" style={{ color: "#10b981" }}>
                {orders.filter((o) => o.orderStatus === "Delivered").length}
              </div>
            </div>
          </div>
        </div>

        {/* ── TABLE ── */}
        {orders.length === 0 ? (
          <div className="oms-empty">No orders found.</div>
        ) : (
          <div className={`oms-table-wrap ${loaded ? "show" : ""}`}>
            <table className="oms-table">
              <thead className="oms-thead">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Qty</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="oms-no-result">
                      No customer found matching "{search}"
                    </td>
                  </tr>
                ) : (
                  filtered.map((o) => {
                    const cfg = STATUS_CONFIG[o.orderStatus] || STATUS_CONFIG.Pending;
                    return (
                      <tr
                        key={o._id}
                        className={`oms-row ${deletingId === o._id ? "deleting" : ""}`}
                      >
                        <td>
                          <span className="oms-id">#{o._id.slice(-5).toUpperCase()}</span>
                        </td>

                        <td className="oms-user">{o.name || "—"}</td>

                        <td>
                          {o.products?.map((p, i) => (
                            <div key={i} className="oms-product-name">{p.name || "Product"}</div>
                          ))}
                        </td>

                        <td>
                          {o.products?.map((p, i) => (
                            <div key={i} className="oms-qty">{p.quantity}</div>
                          ))}
                        </td>

                        <td className="oms-amount">₹{o.totalAmount?.toLocaleString("en-IN")}</td>

                        <td>
                          <select
                            className="oms-select"
                            value={o.orderStatus}
                            onChange={(e) => handleStatusChange(o._id, e.target.value)}
                            style={{ color: cfg.color, background: cfg.bg }}
                          >
                            {Object.keys(STATUS_CONFIG).map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>

                        <td>
                          <button
                            className="oms-delete-btn"
                            onClick={() => handleDelete(o._id)}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" strokeWidth="2.5"
                              strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"/>
                              <path d="M19 6l-1 14H6L5 6"/>
                              <path d="M10 11v6M14 11v6"/>
                              <path d="M9 6V4h6v2"/>
                            </svg>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderList;