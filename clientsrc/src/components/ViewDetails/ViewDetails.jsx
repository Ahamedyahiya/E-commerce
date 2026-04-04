// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getProductById } from "../../service/productservice";
// import { addToCart } from "../../service/cartservice";

// function ViewDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await getProductById(id);
//       setProduct(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleAddToCart = async () => {
//     try {
//       await addToCart({
//         product: product._id, 
//       });

//       alert("Added to cart ✅");

//       navigate("/cardpage");

//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

//   return (
//     <div className="container mt-4">

//       <Link to="/" className="btn btn-outline-dark mb-4">
//         ← Back
//       </Link>

//       <div className="mx-auto" style={{ maxWidth: "500px" }}>

//         <div className="text-center mb-4 p-3 border rounded-3">
//           <img
//             src={product.img}
//             alt={product.name}
//             className="img-fluid"
//             style={{ maxHeight: "260px", objectFit: "contain" }}
//           />
//         </div>

//         <div>

//           <h4 className="fw-bold mb-2">{product.name}</h4>

//           <h5 className="text-success fw-bold mb-3">
//             ₹ {product.price}
//           </h5>

//           <div className="mb-3">
//             <p className="mb-1"><b>Color:</b> {product.color}</p>
//             <p className="mb-1"><b>RAM:</b> {product.ram}</p>
//             <p className="mb-1"><b>Storage:</b> {product.storage}</p>
//           </div>

//           <Link
//             className="btn btn-primary w-100 py-2"
//             onClick={handleAddToCart} to="/cardpage">
//             🛒 Add To Cart
//           </Link>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default ViewDetails;






import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById } from "../../service/productservice";
import { addToCart } from "../../service/cartservice";

function ViewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart({ product: product._id });
      navigate("/cardpage");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (!product) return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-warning mb-3" role="status" />
        <p className="text-secondary">Fetching product details...</p>
      </div>
    </div>
  );

  return (
    <div className="min-vh-100 py-4 px-3">

        <Link to="/" className="btn btn-outline-dark">
          ← Back to Home
        </Link>

      <div className="container" style={{ maxWidth: "900px" }}>
        <div className="row g-0 rounded-4 overflow-hidden border shadow-lg">

          {/* Image Panel */}
          <div className="col-md-5 d-flex align-items-center justify-content-center p-4 position-relative bg-light">

            {/* Decorative circles behind image */}
            <div className="position-absolute rounded-circle"
              style={{
                width: "220px", height: "220px",
                background: "rgba(255,100,50,0.08)",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)"
              }} />
            <div className="position-absolute rounded-circle"
              style={{
                width: "160px", height: "160px",
                background: "rgba(255,100,50,0.12)",
                top: "50%", left: "50%",
                transform: "translate(-50%,-50%)"
              }} />

            {/* In Stock Badge */}
            <span className="badge position-absolute top-0 start-0 m-3 px-3 py-2 rounded-pill text-white"
              style={{ background: "linear-gradient(135deg,#ff6432,#ff3b6b)", fontSize: "10px", letterSpacing: "1px" }}>
              ✔ IN STOCK
            </span>

            {/* Product Image */}
            <img
              src={product.img}
              alt={product.name}
              className="img-fluid position-relative"
              style={{
                maxHeight: "260px",
                objectFit: "contain",
                zIndex: 1,
                filter: "drop-shadow(0px 16px 32px rgba(0,0,0,0.18))"
              }}
            />
          </div>

          {/* Info Panel */}
          <div className="col-md-7 p-4 p-md-5 d-flex flex-column justify-content-center">

            <p className="text-warning fw-semibold mb-2" style={{ fontSize: "11px", letterSpacing: "2.5px" }}>
              📱 SMARTPHONE
            </p>

            <h1 className="fw-bold mb-3" style={{ fontSize: "26px", lineHeight: "1.2" }}>
              {product.name}
            </h1>

            {/* Price Row */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <h2 className="fw-bold mb-0 text-dark" style={{ fontSize: "30px" }}>
                ₹ {product.price?.toLocaleString("en-IN")}
              </h2>
              <span className="badge border border-warning text-warning fw-semibold px-3 py-2"
                style={{ fontSize: "11px", background: "rgba(255,193,7,0.08)" }}>
                EMI Available
              </span>
            </div>

            <hr className="mb-4" />

            {/* Specs */}
            <div className="row g-3 mb-4">
              <div className="col-6">
                <div className="rounded-3 p-3 h-100 border bg-light">
                  <p className="text-secondary mb-1" style={{ fontSize: "10px", letterSpacing: "2px" }}>COLOR</p>
                  <div className="d-flex align-items-center gap-2">
                    <span className="rounded-circle d-inline-block border"
                      style={{ width: "14px", height: "14px", background: product.color?.toLowerCase() || "#888" }} />
                    <span className="fw-medium" style={{ fontSize: "14px" }}>{product.color}</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="rounded-3 p-3 h-100 border bg-light">
                  <p className="text-secondary mb-1" style={{ fontSize: "10px", letterSpacing: "2px" }}>RAM</p>
                  <span className="fw-medium" style={{ fontSize: "14px" }}>{product.ram}</span>
                </div>
              </div>
              <div className="col-12">
                <div className="rounded-3 p-3 border bg-light">
                  <p className="text-secondary mb-1" style={{ fontSize: "10px", letterSpacing: "2px" }}>STORAGE</p>
                  <span className="fw-medium" style={{ fontSize: "14px" }}>{product.storage}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mb-3">
              <button
                className="btn btn-outline-secondary rounded-3 d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: "52px", height: "52px", fontSize: "20px" }}
                title="Wishlist">
                ♡
              </button>
              <button
                className="btn fw-bold rounded-3 flex-fill d-flex align-items-center justify-content-center gap-2 text-white"
                style={{
                  height: "52px",
                  background: loading ? "#aaa" : "linear-gradient(135deg, #ff6432, #ff3b6b)",
                  border: "none",
                  fontSize: "15px",
                  letterSpacing: "0.5px"
                }}
                onClick={handleAddToCart}
                disabled={loading}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2" />Adding...</>
                ) : (
                  <>🛒 Add to Cart</>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="d-flex flex-wrap gap-3 mt-1">
              {[["🚚", "Free Delivery"], ["🔄", "7-Day Returns"], ["🛡️", "1 Year Warranty"]].map(([icon, label]) => (
                <div key={label} className="d-flex align-items-center gap-1 text-secondary" style={{ fontSize: "12px" }}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;