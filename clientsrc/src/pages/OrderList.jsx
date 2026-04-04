// import { useEffect, useState } from "react";
// import { getAllOrders, updateOrderStatus, deleteOrder } from "../service/orderservice";

// function OrderList() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     const data = await getAllOrders();
//     setOrders(data || []);
//   };

//   const handleStatusChange = async (id, status) => {
//     await updateOrderStatus(id, status);
//     setOrders((prev) =>
//       prev.map((o) =>
//         o._id === id ? { ...o, orderStatus: status } : o
//       )
//     );
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this order?")) return;
//     await deleteOrder(id);
//     setOrders((prev) => prev.filter((o) => o._id !== id)); // ✅ list-லிருந்து remove
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Orders</h2>

//       {orders.length === 0 ? (
//         <h3>No orders found</h3>
//       ) : (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>UserName</th>
//               <th>Products</th>
//               <th>Quantity</th>
//               <th>TotalAmount</th>
//               <th>Status</th>
//               <th>Action</th> {/* ✅ new column */}
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((o) => (
//               <tr key={o._id}>
//                 <td>{o._id.slice(-5)}</td>

//                 <td>{o.name || "No Name"}</td>

//                 <td>
//                   {o.products?.map((p, i) => (
//                     <div key={i}>{p.name || "Product"}</div>
//                   ))}
//                 </td>

//                 <td>
//                   {o.products?.map((p, i) => (
//                     <div key={i}>{p.quantity}</div>
//                   ))}
//                 </td>

//                 <td>₹{o.totalAmount}</td>

//                 <td>
//                   <select
//                     value={o.orderStatus}
//                     onChange={(e) => handleStatusChange(o._id, e.target.value)}
//                   >
//                     <option>Pending</option>
//                     <option>Shipped</option>
//                     <option>Delivered</option>
//                     <option>Cancelled</option>
//                   </select>
//                 </td>

//                 <td>
//                   <button
//                     onClick={() => handleDelete(o._id)}
//                     style={{
//                       backgroundColor: "red",
//                       color: "white",
//                       border: "none",
//                       padding: "5px 10px",
//                       borderRadius: "5px",
//                       cursor: "pointer"
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </td>

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default OrderList;  










import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus, deleteOrder } from "../service/orderservice";

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await getAllOrders();
    setOrders(data || []);
  };

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    setOrders((prev) =>
      prev.map((o) =>
        o._id === id ? { ...o, orderStatus: status } : o
      )
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await deleteOrder(id);
    setOrders((prev) => prev.filter((o) => o._id !== id));
  };

  return (
    <div style={{ padding: "30px", background: "#f5f7fa", minHeight: "100vh" }}>
      
      <h2 style={{ marginBottom: "20px", color: "#333" }}>📦 Order Management System</h2>

      {orders.length === 0 ? (
        <h3 style={{ color: "#888" }}>No orders found</h3>
      ) : (
        <div style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          overflow: "hidden"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            
            <thead style={{ background: "#4CAF50", color: "white" }}>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Products</th>
                <th style={thStyle}>Qty</th>
                <th style={thStyle}>Amount</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o, index) => (
                <tr
                  key={o._id}
                  style={{
                    background: index % 2 === 0 ? "#fafafa" : "#fff",
                    transition: "0.2s"
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f1f7ff")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      index % 2 === 0 ? "#fafafa" : "#fff")
                  }
                >
                  <td style={tdStyle}>{o._id.slice(-5)}</td>

                  <td style={tdStyle}>{o.name || "No Name"}</td>

                  <td style={tdStyle}>
                    {o.products?.map((p, i) => (
                      <div key={i}>{p.name || "Product"}</div>
                    ))}
                  </td>

                  <td style={tdStyle}>
                    {o.products?.map((p, i) => (
                      <div key={i}>{p.quantity}</div>
                    ))}
                  </td>

                  <td style={{ ...tdStyle, fontWeight: "bold", color: "#333" }}>
                    ₹{o.totalAmount}
                  </td>

                  <td style={tdStyle}>
                    <select
                      value={o.orderStatus}
                      onChange={(e) =>
                        handleStatusChange(o._id, e.target.value)
                      }
                      style={{
                        padding: "5px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        cursor: "pointer"
                      }}
                    >
                      <option>Pending</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(o._id)}
                      style={{
                        background: "#ff4d4f",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        transition: "0.2s"
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.background = "#d9363e")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.background = "#ff4d4f")
                      }
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const thStyle = {
  padding: "12px",
  textAlign: "left",
  fontSize: "14px"
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #eee",
  fontSize: "14px"
};

export default OrderList;
