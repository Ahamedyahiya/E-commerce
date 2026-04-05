import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getCart, updateCartQty, deleteCartItem } from "../service/cartservice";

export default function CardPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteCartItem(id);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const increaseQty = async (item) => {
    await updateCartQty(item._id, item.quantity + 1);
    fetchCart();
  };

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;
    await updateCartQty(item._id, item.quantity - 1);
    fetchCart();
  };

  const totalPrice = cartItems.reduce((total, item) => {
    const price = Number(item?.product?.price) || 0;
    const qty = item?.quantity || 0;
    return total + price * qty;
  }, 0);

  return (
    <div>
      <style>{`
        @media (max-width: 767px) {
          .cart-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            padding: 12px;
          }
          .cart-img-col {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
          }
          .cart-img-col img {
            height: 100px !important;
          }
          .cart-info-col {
            width: 100%;
            padding: 0 8px;
            margin-bottom: 10px;
          }
          .cart-qty-col {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
          }
          .cart-remove-col {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 4px;
          }
          .cart-total {
            text-align: center !important;
          }
        }
      `}</style>

      <Link to="/" className="btn btn-warning mt-2 ms-2">Back to Home</Link>

      <div className="container mt-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">🛒 Your Cart</h2>
          <p className="text-muted">Manage your items easily</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-5">
            <div style={{ fontSize: "60px" }}>🛍️</div>
            <h5 className="mt-3 text-muted">Your cart is empty</h5>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-9">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="card mb-4 border-0 rounded-4 shadow-sm"
                  style={{ transition: "all 0.3s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div className="row g-0 align-items-center cart-row">

                    {/* Image */}
                    <div className="col-md-3 text-center p-3 cart-img-col">
                      <img
                        src={item?.product?.img}
                        alt={item?.product?.name}
                        className="img-fluid"
                        style={{ height: "130px", objectFit: "contain" }}
                      />
                    </div>

                    {/* Info */}
                    <div className="col-md-4 cart-info-col">
                      <div className="card-body">
                        <h5 className="fw-bold mb-1">{item?.product?.name}</h5>
                        <span className="badge bg-success mb-2">In Stock</span>
                        <p className="text-success fw-semibold fs-5 mb-0">
                          ₹ {item?.product?.price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-md-3 cart-qty-col">
                      <div className="d-flex justify-content-center align-items-center">
                        <div className="border rounded-pill px-3 py-2 d-flex align-items-center gap-3 shadow-sm">
                          <button
                            className="btn btn-light btn-sm rounded-circle"
                            onClick={() => decreaseQty(item)}
                          >
                            −
                          </button>
                          <span className="fw-bold fs-5">{item.quantity}</span>
                          <button
                            className="btn btn-light btn-sm rounded-circle"
                            onClick={() => increaseQty(item)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Remove */}
                    <div className="col-md-2 text-center cart-remove-col">
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill px-3"
                        onClick={() => removeItem(item._id)}
                      >
                        ✕ Remove
                      </button>
                    </div>

                  </div>
                </div>
              ))}

              {/* Total */}
              <div className="text-end mt-4 cart-total">
                <h4 className="fw-bold">Total: ₹ {totalPrice}</h4>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}