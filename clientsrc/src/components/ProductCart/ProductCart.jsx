// import "./ProductCart.css";
// import { useNavigate } from "react-router-dom";

// function ProductCard({ item }) {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     navigate(`/product/${item._id}`);
//   };

//   const handleBuyNow = () => {
//     navigate("/buynow", { state: item }); 
//   };

//   return (
//     <div className="col-md-3">
//       <div className="card border-0 shadow">
//         <img src={item.img} alt="" className="card-img-top" />
//       </div>

//       <div className="d-flex gap-3 mt-3">
//         <button className="btn btn-primary px-2" onClick={handleBuyNow}>
//           Buy Now
//         </button>

//         <button
//           className="btn btn-outline-success px-3"
//           onClick={handleViewDetails}
//         >
//           View Details
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;














import { useNavigate } from "react-router-dom";

function ProductCard({ item }) {
  const navigate = useNavigate();

  const handleViewDetails = () => navigate(`/product/${item._id}`);
  const handleBuyNow = () => navigate("/buynow", { state: item });

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div
        style={{
          position: "relative",
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
          fontFamily: "'Segoe UI', sans-serif",
          height: "100%",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "translateY(-8px) scale(1.01)";
          e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.06), 0 24px 48px rgba(99,91,255,0.18)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08)";
        }}
      >
        {/* Badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px", zIndex: 10,
          background: "linear-gradient(135deg, #635bff, #a78bfa)",
          color: "#fff", fontSize: "10px", fontWeight: 700,
          letterSpacing: "1.5px", padding: "4px 10px",
          borderRadius: "50px", boxShadow: "0 2px 8px rgba(99,91,255,0.4)",
        }}>NEW</div>

        {/* Image */}
        <div style={{
          width: "100%", height: "220px",
          background: "linear-gradient(145deg, #f3f1ff, #ede9fe)",
          overflow: "hidden",
        }}>
          <img
            src={item.img}
            alt={item.name || "Product"}
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              transition: "transform 0.5s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
        </div>

        {/* Body */}
        <div style={{ padding: "16px" }}>
          {item.name && (
            <h3 style={{
              fontSize: "15px", fontWeight: 700, color: "#1a1a2e",
              margin: "0 0 6px", whiteSpace: "nowrap",
              overflow: "hidden", textOverflow: "ellipsis",
            }}>{item.name}</h3>
          )}

          {item.price && (
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "14px" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#635bff" }}>₹</span>
              <span style={{ fontSize: "22px", fontWeight: 800, color: "#635bff", lineHeight: 1 }}>
                {item.price}
              </span>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={handleBuyNow}
              style={{
                flex: 1, padding: "10px 0", border: "none",
                borderRadius: "12px", fontSize: "13px", fontWeight: 600,
                cursor: "pointer",
                background: "linear-gradient(135deg, #635bff, #a78bfa)",
                color: "#fff", boxShadow: "0 4px 14px rgba(99,91,255,0.35)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >⚡ Buy Now</button>

            <button
              onClick={handleViewDetails}
              style={{
                flex: 1, padding: "10px 0",
                border: "1.5px solid #c4b5fd", borderRadius: "12px",
                fontSize: "13px", fontWeight: 600, cursor: "pointer",
                background: "transparent", color: "#635bff",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#f5f3ff";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >👁 Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;





















