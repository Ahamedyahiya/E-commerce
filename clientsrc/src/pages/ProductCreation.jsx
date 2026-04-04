import { useState } from "react";
import { createProduct } from "../service/productservice";
import { Link } from "react-router-dom";

const CLOUD_NAME = "dph10ldao";
const UPLOAD_PRESET = "my_products";

const initialForm = {
  img: "",
  name: "",
  price: "",
  color: "",
  ram: "",
  storage: "",
};

export default function ProductCreation() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const validate = (currentForm) => {
    const e = {};
    if (!currentForm.img || !currentForm.img.trim())
      e.img = "Please upload a product image";
    if (!currentForm.name.trim()) e.name = "Product name is required";
    if (!currentForm.price || isNaN(currentForm.price) || Number(currentForm.price) <= 0)
      e.price = "Enter a valid price";
    if (!currentForm.color.trim()) e.color = "Color is required";
    if (!currentForm.ram.trim()) e.ram = "RAM is required";
    if (!currentForm.storage.trim()) e.storage = "Storage is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setErrors((err) => ({ ...err, img: undefined }));

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: data }
      );

      if (!res.ok) throw new Error("Upload failed");

      const json = await res.json();
      console.log("✅ Cloudinary URL:", json.secure_url);
      setForm((f) => ({ ...f, img: json.secure_url }));
    } catch (err) {
      console.error("❌ Image upload error:", err);
      setErrors((e) => ({ ...e, img: "Image upload failed. Try again." }));
      setPreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) {
      setStatus("error");
      setMessage("Please wait, image is still uploading...");
      return;
    }

    const e2 = validate(form);
    if (Object.keys(e2).length) {
      setErrors(e2);
      return;
    }

    const payload = { ...form, price: Number(form.price) };
    console.log("📦 Submitting payload:", payload);

    setStatus("loading");
    try {
      await createProduct(payload);
      setStatus("success");
      setMessage(`"${form.name}" created successfully!`);
      setForm(initialForm);
      setPreview("");
    } catch (err) {
      console.error("❌ Create product error:", err?.response);
      setStatus("error");
      setMessage(
        err?.response?.data?.message ||
        err?.response?.data ||
        "Failed to create product."
      );
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus(null);
    setPreview("");
    setUploading(false);
  };

  const fields = [
    { key: "name",    label: "Product Name", type: "text",   placeholder: "e.g. iPhone 15 Pro",  span: 2 },
    { key: "price",   label: "Price (₹)",    type: "number", placeholder: "0.00",                 span: 1 },
    { key: "color",   label: "Color",        type: "text",   placeholder: "e.g. Midnight Black",  span: 1 },
    { key: "ram",     label: "RAM",          type: "text",   placeholder: "e.g. 8GB",             span: 1 },
    { key: "storage", label: "Storage",      type: "text",   placeholder: "e.g. 128GB",           span: 1 },
  ];

  return (
    <>
      <Link
        to="/admin/dashboard"
        className="btn btn-warning px-2 mt-3 ms-2 py-2 ">
        Back to Dashboard
      </Link>

      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.iconWrap}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1 style={styles.title}>Create Product</h1>
              <p style={styles.subtitle}>Add a new product to your inventory</p>
            </div>
          </div>

          {status === "success" && (
            <div style={{ ...styles.toast, ...styles.toastSuccess }}>✓ {message}</div>
          )}
          {status === "error" && (
            <div style={{ ...styles.toast, ...styles.toastError }}>✕ {message}</div>
          )}

          <form onSubmit={handleSubmit} style={styles.grid}>
            <div style={{ ...styles.field, gridColumn: "span 2" }}>
              <label style={styles.label}>Product Image</label>
              <label style={{
                ...styles.uploadBox,
                borderColor: errors.img ? "#f87171" : preview ? "#1a1a2e" : "#e5e7eb",
              }}>
                {uploading ? (
                  <div style={styles.uploadInner}>
                    <div style={styles.spinner} />
                    <span style={styles.uploadText}>Uploading to Cloudinary...</span>
                  </div>
                ) : preview ? (
                  <div style={styles.uploadInner}>
                    <img src={preview} alt="preview" style={styles.previewImg} />
                    <span style={{ ...styles.uploadText, color: "#16a34a", fontWeight: 600 }}>
                      ✓ Uploaded — click to change
                    </span>
                  </div>
                ) : (
                  <div style={styles.uploadInner}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round"/>
                      <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round"/>
                    </svg>
                    <span style={styles.uploadText}>Click to upload image</span>
                    <span style={styles.uploadHint}>PNG, JPG, WEBP supported</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  disabled={uploading}
                />
              </label>
              {errors.img && <span style={styles.errorMsg}>{errors.img}</span>}
            </div>

            {fields.map(({ key, label, type, placeholder, span }) => (
              <div key={key} style={{ ...styles.field, gridColumn: `span ${span}` }}>
                <label style={styles.label}>{label}</label>
                <input
                  name={key}
                  type={type}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  style={{ ...styles.input, ...(errors[key] ? styles.inputError : {}) }}
                />
                {errors[key] && <span style={styles.errorMsg}>{errors[key]}</span>}
              </div>
            ))}

            <div style={{ ...styles.actions, gridColumn: "span 2" }}>
              <button type="button" onClick={handleReset} style={styles.btnSecondary}>
                Reset
              </button>
              <button
                type="submit"
                disabled={status === "loading" || uploading}
                style={{
                  ...styles.btnPrimary,
                  opacity: (status === "loading" || uploading) ? 0.6 : 1,
                  cursor: (status === "loading" || uploading) ? "not-allowed" : "pointer",
                }}
              >
                {status === "loading" ? "Creating..." : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh", background: "#f4f6f9", display: "flex",
    alignItems: "flex-start", justifyContent: "center",
    padding: "100px 16px 40px", fontFamily: "system-ui, sans-serif",
  },
  card: {
    background: "#fff", borderRadius: 16,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    padding: "36px 40px", width: "100%", maxWidth: 640,
  },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 28 },
  iconWrap: {
    background: "#1a1a2e", color: "#fff", borderRadius: 10,
    width: 44, height: 44, display: "flex", alignItems: "center",
    justifyContent: "center", flexShrink: 0,
  },
  title: { fontSize: 20, fontWeight: 700, color: "#111", margin: 0 },
  subtitle: { fontSize: 13, color: "#888", margin: "2px 0 0" },
  toast: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "12px 16px", borderRadius: 10, fontSize: 14,
    fontWeight: 500, marginBottom: 24,
  },
  toastSuccess: { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0" },
  toastError:   { background: "#fff1f2", color: "#dc2626", border: "1px solid #fecaca" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 24px" },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  uploadBox: {
    border: "2px dashed", borderRadius: 10, padding: "20px 16px",
    cursor: "pointer", display: "block", background: "#fafafa",
  },
  uploadInner: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  uploadText: { fontSize: 14, color: "#555", fontWeight: 500 },
  uploadHint: { fontSize: 12, color: "#aaa" },
  previewImg: {
    width: 100, height: 100, objectFit: "contain",
    borderRadius: 10, border: "1px solid #e5e7eb",
  },
  spinner: {
    width: 28, height: 28, border: "3px solid #e5e7eb",
    borderTop: "3px solid #1a1a2e", borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  input: {
    padding: "10px 14px", border: "1.5px solid #e5e7eb",
    borderRadius: 8, fontSize: 14, color: "#111", outline: "none",
    background: "#fafafa", fontFamily: "system-ui, sans-serif",
  },
  inputError: { borderColor: "#f87171", background: "#fff5f5" },
  errorMsg: { fontSize: 12, color: "#dc2626" },
  actions: { display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 4 },
  btnPrimary: {
    background: "#1a1a2e", color: "#fff", border: "none",
    borderRadius: 9, padding: "11px 24px", fontSize: 14, fontWeight: 600,
  },
  btnSecondary: {
    background: "#fff", color: "#555", border: "1.5px solid #e5e7eb",
    borderRadius: 9, padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
};