import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../service/orderservice";

const STATUS_COLORS = {
  Pending:   { bg: "#FEF9C3", color: "#854D0E" },
  Shipped:   { bg: "#DBEAFE", color: "#1E40AF" },
  Delivered: { bg: "#DCFCE7", color: "#166534" },
  Cancelled: { bg: "#FEE2E2", color: "#991B1B" },
};

const AVATAR_COLORS = [
  "#4F46E5","#0891B2","#059669","#D97706","#DC2626","#7C3AED","#DB2777",
];

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

const getAvatarColor = (name = "") =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

export default function UserList() {
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [statusMap, setStatusMap]   = useState({});

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllOrders();
      setOrders(data);
    } catch {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setStatusMap((prev) => ({ ...prev, [id]: newStatus }));
      await updateOrderStatus(id, newStatus);
      setOrders((prev) =>
        prev.map((o) => o._id === id ? { ...o, orderStatus: newStatus } : o)
      );
    } catch {
      alert("Failed to update status. Please try again!");
      setStatusMap((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(id);
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch {
      alert("Failed to delete order. Please try again!");
    }
  };

  const filtered = orders.filter((o) =>
    [o.name, o.phoneNumber, o.city, o.state, o.address, o.orderStatus]
      .join(" ").toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total:     orders.length,
    pending:   orders.filter((o) => o.orderStatus === "Pending").length,
    delivered: orders.filter((o) => o.orderStatus === "Delivered").length,
    revenue:   orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
  };

  if (loading) return (
    <div style={s.center}>
      <div style={s.spinner} />
      <p style={{ color: "#6B7280", marginTop: 12 }}>Loading orders...</p>
    </div>
  );

  if (error) return (
    <div style={s.center}>
      <p style={{ color: "#DC2626" }}>{error}</p>
      <button style={s.retryBtn} onClick={fetchOrders}>Retry</button>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <h1 style={s.title}>UserList Management System</h1>
          <p style={s.subtitle}>{orders.length} Total User</p>
        </div>
        <input
          style={s.searchInput}
          placeholder="Search name, phone, city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={s.statsRow}>
        {[
          { label: "Total User", value: stats.total,                           color: "#4F46E5" },
          { label: "Pending",      value: stats.pending,                         color: "#D97706" },
          { label: "Delivered",    value: stats.delivered,                       color: "#059669" },
          { label: "Revenue",      value: `₹${stats.revenue.toLocaleString()}`,  color: "#0891B2" },
        ].map((st) => (
          <div key={st.label} style={s.statCard}>
            <p style={{ ...s.statVal, color: st.color }}>{st.value}</p>
            <p style={s.statLabel}>{st.label}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={s.empty}>No orders found.</div>
      ) : (
        <div style={s.tableWrap}>
          <table style={s.table}>
            <thead>
              <tr>
                {["User","Phone","Address","City","State","Amount","Payment","Status","Action"].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <>
                  <tr
                    key={order._id}
                    style={{ backgroundColor: i % 2 === 0 ? "#fff" : "#F9FAFB", cursor: "pointer" }}
                    onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                  >
                    <td style={s.td}>
                      <div style={s.userCell}>
                        <div style={{ ...s.avatar, background: getAvatarColor(order.name) }}>
                          {getInitials(order.name)}
                        </div>
                        <span style={s.username}>{order.name || "—"}</span>
                      </div>
                    </td>
                    <td style={s.td}><span style={s.mono}>{order.phoneNumber || "—"}</span></td>
                    <td style={{ ...s.td, maxWidth: 180 }}>
                      <span style={s.ellipsis} title={order.address}>{order.address || "—"}</span>
                    </td>
                    <td style={s.td}><span style={s.cityBadge}>{order.city || "—"}</span></td>
                    <td style={s.td}><span style={s.stateBadge}>{order.state || "—"}</span></td>
                    <td style={s.td}><span style={s.amount}>₹{order.totalAmount?.toLocaleString()}</span></td>
                    <td style={s.td} onClick={(e) => e.stopPropagation()}>
                      <span style={order.paymentMethod === "Online" ? s.online : s.cod}>
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td style={s.td} onClick={(e) => e.stopPropagation()}>
                      <select
                        style={{
                          ...s.select,
                          backgroundColor: STATUS_COLORS[statusMap[order._id] || order.orderStatus]?.bg,
                          color: STATUS_COLORS[statusMap[order._id] || order.orderStatus]?.color,
                        }}
                        value={statusMap[order._id] || order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      >
                        {["Pending","Shipped","Delivered","Cancelled"].map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td style={s.td} onClick={(e) => e.stopPropagation()}>
                      <button style={s.deleteBtn} onClick={() => handleDelete(order._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>

                  {expandedId === order._id && (
                    <tr key={`${order._id}-products`}>
                      <td colSpan={9} style={s.expandedCell}>
                        <div style={s.productsBox}>
                          <p style={s.productsTitle}>Products — {order.products?.length || 0} item(s)</p>
                          <table style={s.innerTable}>
                            <thead>
                              <tr>
                                {["#","Product Name","Price","Qty","Subtotal"].map((h) => (
                                  <th key={h} style={s.innerTh}>{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {order.products?.map((p, pi) => (
                                <tr key={pi}>
                                  <td style={s.innerTd}>{pi + 1}</td>
                                  <td style={{ ...s.innerTd, fontWeight: 500 }}>{p.name}</td>
                                  <td style={s.innerTd}>₹{p.price?.toLocaleString()}</td>
                                  <td style={s.innerTd}>{p.quantity}</td>
                                  <td style={{ ...s.innerTd, fontWeight: 600, color: "#4F46E5" }}>
                                    ₹{(p.price * p.quantity).toLocaleString()}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p style={s.totalLine}>
                            Total: <strong style={{ color: "#4F46E5" }}>₹{order.totalAmount?.toLocaleString()}</strong>
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const s = {
  page:         { padding: "2rem", fontFamily: "'Segoe UI', sans-serif", maxWidth: 1200, margin: "0 auto" },
  header:       { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" },
  title:        { fontSize: 24, fontWeight: 700, color: "#111827", margin: 0 },
  subtitle:     { fontSize: 14, color: "#6B7280", margin: "4px 0 0" },
  searchInput:  { paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 14, outline: "none", width: 260, color: "#111827" },
  statsRow:     { display: "flex", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap" },
  statCard:     { background: "#F3F4F6", borderRadius: 10, padding: "0.75rem 1.25rem", minWidth: 130 },
  statVal:      { fontSize: 22, fontWeight: 700, margin: 0 },
  statLabel:    { fontSize: 12, color: "#6B7280", margin: "2px 0 0" },
  tableWrap:    { overflowX: "auto", borderRadius: 12, border: "1px solid #E5E7EB" },
  table:        { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th:           { background: "#F3F4F6", padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#374151", letterSpacing: "0.05em", textTransform: "uppercase", borderBottom: "1px solid #E5E7EB", whiteSpace: "nowrap" },
  td:           { padding: "12px 14px", borderBottom: "1px solid #F3F4F6", color: "#374151", verticalAlign: "middle" },
  userCell:     { display: "flex", alignItems: "center", gap: 10 },
  avatar:       { width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600, fontSize: 12, flexShrink: 0 },
  username:     { fontWeight: 500, color: "#111827" },
  mono:         { fontFamily: "monospace", fontSize: 13 },
  ellipsis:     { display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 180, color: "#6B7280", fontSize: 13 },
  cityBadge:    { background: "#EEF2FF", color: "#4338CA", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 },
  stateBadge:   { background: "#F0FDF4", color: "#166534", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 },
  amount:       { fontWeight: 600, color: "#111827" },
  online:       { background: "#DBEAFE", color: "#1E40AF", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 },
  cod:          { background: "#FEF9C3", color: "#854D0E", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 500 },
  select:       { border: "none", borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", outline: "none" },
  deleteBtn:    { background: "#FEE2E2", color: "#DC2626", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 500, cursor: "pointer" },
  expandedCell: { padding: 0, borderBottom: "2px solid #C7D2FE" },
  productsBox:  { background: "#F5F7FF", padding: "1rem 1.5rem" },
  productsTitle:{ fontWeight: 600, color: "#4F46E5", fontSize: 14, margin: "0 0 10px" },
  innerTable:   { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  innerTh:      { background: "#EEF2FF", padding: "8px 12px", textAlign: "left", color: "#4338CA", fontSize: 12, fontWeight: 600 },
  innerTd:      { padding: "8px 12px", borderBottom: "1px solid #E0E7FF", color: "#374151" },
  totalLine:    { textAlign: "right", marginTop: 10, fontSize: 14, color: "#111827" },
  center:       { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: 12 },
  spinner:      { width: 36, height: 36, border: "3px solid #E5E7EB", borderTop: "3px solid #4F46E5", borderRadius: "50%", animation: "spin 0.8s linear infinite" },
  retryBtn:     { padding: "8px 20px", background: "#4F46E5", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14 },
  empty:        { textAlign: "center", padding: "3rem", background: "#F9FAFB", borderRadius: 12, color: "#6B7280" },
};