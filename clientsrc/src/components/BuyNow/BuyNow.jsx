import { useState } from "react";
import { placeOrder } from "../../service/orderservice";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Puducherry", "Chandigarh",
];

const UPI_APPS = [
  { id: "gpay", label: "Google Pay" },
  { id: "phonepe", label: "PhonePe" },
  { id: "paytm", label: "Paytm" },
  { id: "other", label: "Other UPI" },
];

const BuyNow = () => {
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    paymentMethod: "COD",
    upiId: "",
    selectedUpiApp: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = "Phone required";
    else if (!/^[6-9]\d{9}$/.test(form.phoneNumber))
      newErrors.phoneNumber = "Enter valid 10-digit number";
    if (!form.address.trim()) newErrors.address = "Address required";
    if (!form.city.trim()) newErrors.city = "City required";
    if (!form.state) newErrors.state = "Select state";
    if (form.paymentMethod === "UPI") {
      if (!form.upiId.trim()) newErrors.upiId = "UPI ID is required";
      else if (!/^[\w.\-]{2,256}@[a-zA-Z]{2,64}$/.test(form.upiId.trim()))
        newErrors.upiId = "Enter a valid UPI ID (e.g. name@upi)";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePaymentToggle = (method) => {
    setForm((prev) => ({ ...prev, paymentMethod: method, upiId: "", selectedUpiApp: "" }));
    setErrors((prev) => ({ ...prev, upiId: "" }));
  };

  const handleUpiApp = (appId) => {
    setForm((prev) => ({ ...prev, selectedUpiApp: appId }));
  };

  const handleSubmit = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true);
      const orderData = {
        name: form.name,
        address: form.address,
        city: form.city,
        state: form.state,
        phoneNumber: form.phoneNumber,
        paymentMethod: form.paymentMethod,
        ...(form.paymentMethod === "UPI" && { upiId: form.upiId }),
      };
      const res = await placeOrder(orderData);
      console.log("Order Success:", res);
      setSubmitted(true);
    } catch (error) {
      console.error("Status:", error.response?.status);
      console.error("Error body:", error.response?.data);
      alert(`Order Failed ❌ - ${error.response?.data?.message || "Please try again"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center py-4 px-3">
      <div className="w-100" style={{ maxWidth: 900 }}>
        <div className="card border-0 shadow-lg overflow-hidden rounded-4">
          <div className="row g-0">

            {/* Left Panel */}
            <div className="col-12 col-md-5 bg-dark text-white p-4 p-lg-5 d-flex flex-column justify-content-between">
              <div>
                <span className="badge rounded-pill mb-4 px-3 py-2 fs-6"
                  style={{ background: "rgba(234,179,8,0.2)", color: "#eab308", border: "1px solid rgba(234,179,8,0.4)" }}>
                  🛍️ Secure Checkout
                </span>
                <h2 className="fw-bold mb-2" style={{ fontSize: "1.8rem", lineHeight: 1.3 }}>
                  Almost <span style={{ color: "#eab308" }}>there!</span><br />Just one step.
                </h2>
                <p className="text-secondary mb-4" style={{ fontSize: "0.9rem" }}>
                  Fill in your delivery details and we'll get your order on the way fast.
                </p>
                <ul className="list-unstyled d-none d-md-flex flex-column gap-3 mb-0">
                  {[
                    { icon: "🚚", text: "Free delivery on all orders" },
                    { icon: "📦", text: "Packed & shipped within 24 hrs" },
                    { icon: "🔒", text: "Safe & secure ordering" },
                    { icon: "↩️", text: "Easy 7-day returns" },
                  ].map((item) => (
                    <li key={item.text} className="d-flex align-items-center gap-3">
                      <span className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                        style={{ width: 34, height: 34, background: "rgba(234,179,8,0.15)", fontSize: 16 }}>
                        {item.icon}
                      </span>
                      <span className="text-white-50" style={{ fontSize: "0.875rem" }}>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 d-flex flex-column gap-2">
                <div className="p-3 rounded-3 d-flex align-items-center gap-3"
                  style={{ background: "rgba(234,179,8,0.12)", border: "1px solid rgba(234,179,8,0.25)" }}>
                  <span style={{ fontSize: 22 }}>💵</span>
                  <div style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>
                    <strong style={{ color: "#eab308", display: "block" }}>Cash on Delivery</strong>
                    <span className="text-white-50">Pay when your order arrives.</span>
                  </div>
                </div>
                <div className="p-3 rounded-3 d-flex align-items-center gap-3"
                  style={{ background: "rgba(99,179,237,0.1)", border: "1px solid rgba(99,179,237,0.25)" }}>
                  <span style={{ fontSize: 22 }}>📲</span>
                  <div style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>
                    <strong style={{ color: "#63b3ed", display: "block" }}>UPI Payment</strong>
                    <span className="text-white-50">Instant pay via GPay, PhonePe & more.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="col-12 col-md-7 bg-white p-4 p-lg-5">
              {!submitted ? (
                <>
                  <h3 className="fw-bold mb-1">Delivery Details</h3>
                  <p className="text-muted mb-4" style={{ fontSize: "0.875rem" }}>
                    We'll ship to the address below
                  </p>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>Full Name</label>
                    <input type="text" name="name"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      value={form.name} onChange={handleChange} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>Phone Number</label>
                    <input type="tel" name="phoneNumber" maxLength={10}
                      className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
                      value={form.phoneNumber} onChange={handleChange} />
                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>Address</label>
                    <input type="text" name="address"
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      value={form.address} onChange={handleChange} />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>

                  <div className="row g-3 mb-4">
                    <div className="col-6">
                      <label className="form-label fw-semibold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>City</label>
                      <input type="text" name="city"
                        className={`form-control ${errors.city ? "is-invalid" : ""}`}
                        value={form.city} onChange={handleChange} />
                      {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                    </div>
                    <div className="col-6">
                      <label className="form-label fw-semibold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>State</label>
                      <select name="state"
                        className={`form-select ${errors.state ? "is-invalid" : ""}`}
                        value={form.state} onChange={handleChange}>
                        <option value="">Select State</option>
                        {indianStates.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                    </div>
                  </div>

                  {/* Payment Method Toggle */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>Payment Method</label>
                    <div className="d-flex gap-2">
                      <button type="button" onClick={() => handlePaymentToggle("COD")}
                        className="flex-fill py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        style={{
                          border: form.paymentMethod === "COD" ? "2px solid #eab308" : "1.5px solid #dee2e6",
                          background: form.paymentMethod === "COD" ? "rgba(234,179,8,0.08)" : "#fff",
                          color: form.paymentMethod === "COD" ? "#856404" : "#6c757d",
                          fontSize: "0.875rem", cursor: "pointer", transition: "all 0.15s",
                        }}>
                        💵 Cash on Delivery
                      </button>
                      <button type="button" onClick={() => handlePaymentToggle("UPI")}
                        className="flex-fill py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
                        style={{
                          border: form.paymentMethod === "UPI" ? "2px solid #0d6efd" : "1.5px solid #dee2e6",
                          background: form.paymentMethod === "UPI" ? "rgba(13,110,253,0.07)" : "#fff",
                          color: form.paymentMethod === "UPI" ? "#0d6efd" : "#6c757d",
                          fontSize: "0.875rem", cursor: "pointer", transition: "all 0.15s",
                        }}>
                        📲 UPI
                      </button>
                    </div>
                  </div>

                  {/* UPI Section */}
                  {form.paymentMethod === "UPI" && (
                    <div className="mb-3 p-3 rounded-3" style={{ background: "#f8f9ff", border: "1px solid #d0e0ff" }}>
                      <label className="form-label fw-semibold text-uppercase mb-2" style={{ fontSize: "0.7rem", letterSpacing: "0.5px", color: "#495057" }}>
                        Select App (optional)
                      </label>
                      <div className="d-flex gap-2 mb-3 flex-wrap">
                        {UPI_APPS.map((app) => (
                          <button key={app.id} type="button" onClick={() => handleUpiApp(app.id)}
                            className="rounded-3 px-3 py-1 fw-semibold"
                            style={{
                              border: form.selectedUpiApp === app.id ? "2px solid #0d6efd" : "1.5px solid #dee2e6",
                              background: form.selectedUpiApp === app.id ? "rgba(13,110,253,0.1)" : "#fff",
                              color: form.selectedUpiApp === app.id ? "#0d6efd" : "#6c757d",
                              fontSize: "0.8rem", cursor: "pointer",
                            }}>
                            {app.label}
                          </button>
                        ))}
                      </div>
                      <label className="form-label fw-semibold text-uppercase" style={{ fontSize: "0.7rem", letterSpacing: "0.5px", color: "#495057" }}>
                        UPI ID
                      </label>
                      <input type="text" name="upiId" placeholder="yourname@upi"
                        className={`form-control ${errors.upiId ? "is-invalid" : ""}`}
                        value={form.upiId} onChange={handleChange} />
                      {errors.upiId && <div className="invalid-feedback">{errors.upiId}</div>}
                      <p className="text-muted mt-2 mb-0" style={{ fontSize: "0.75rem" }}>
                        e.g. mobilenumber@upi · name@okaxis · name@paytm
                      </p>
                    </div>
                  )}

                  <button
                    className="btn w-100 fw-bold text-white mt-2 py-3"
                    style={{ background: form.paymentMethod === "UPI" ? "#0d6efd" : "#ffc107", border: "none" }}
                    onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status" />Placing Order...</>
                    ) : (
                      form.paymentMethod === "UPI" ? "Pay via UPI →" : "Confirm Order →"
                    )}
                  </button>
                </>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center text-center h-100 py-5 gap-2">
                  <div style={{ fontSize: 52 }}>✅</div>
                  <h3 className="fw-bold mt-2">Order Placed!</h3>
                  <p className="text-muted mb-1">
                    <strong className="text-dark d-block">{form.name}</strong>
                    {form.address}, {form.city}<br />{form.state}<br />📞 {form.phoneNumber}
                  </p>
                  <span className="badge rounded-pill px-3 py-2"
                    style={{
                      background: form.paymentMethod === "UPI" ? "rgba(13,110,253,0.1)" : "rgba(234,179,8,0.15)",
                      color: form.paymentMethod === "UPI" ? "#0d6efd" : "#856404",
                      fontSize: "0.85rem",
                    }}>
                    {form.paymentMethod === "UPI" ? `📲 Paid via UPI · ${form.upiId}` : "💵 Cash on Delivery"}
                  </span>
                  <button className="btn btn-outline-warning fw-bold mt-3 px-4"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", phoneNumber: "", address: "", city: "", state: "", paymentMethod: "COD", upiId: "", selectedUpiApp: "" });
                    }}>
                    Place New Order
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;