import { useState, useRef } from "react";
import { createProduct } from "../service/productservice";

const REQUIRED_HEADERS = ["name", "price", "category", "stock"];
const ALL_HEADERS = ["name", "description", "price", "category", "stock", "sku"];

function parseCSV(text) {
  const lines = text.trim().split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) throw new Error("CSV must have a header row and at least one data row.");
  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const missing = REQUIRED_HEADERS.filter((r) => !headers.includes(r));
  if (missing.length) throw new Error(`Missing required columns: ${missing.join(", ")}`);
  return lines.slice(1).map((line, i) => {
    const values = line.split(",").map((v) => v.trim());
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = values[idx] ?? ""; });
    return { _row: i + 2, ...obj };
  });
}

export default function ProductBulkUpload() {
  const [parseError, setParseError] = useState("");
  const [preview, setPreview] = useState([]);
  const [results, setResults] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const reset = () => {
    setParseError(""); setPreview([]); setResults([]);
    setUploading(false); setDone(false);
    setProgress({ done: 0, total: 0 });
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.endsWith(".csv")) return setParseError("Only .csv files are supported.");
    setParseError("");
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        setPreview(parseCSV(e.target.result));
      } catch (err) {
        setParseError(err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    setUploading(true);
    setResults([]);
    setProgress({ done: 0, total: preview.length });
    const res = [];
    for (let i = 0; i < preview.length; i++) {
      const row = preview[i];
      try {
        await createProduct({
          name: row.name,
          description: row.description || "",
          price: Number(row.price),
          category: row.category,
          stock: Number(row.stock),
          sku: row.sku || "",
        });
        res.push({ row: row._row, name: row.name, status: "success" });
      } catch (err) {
        res.push({ row: row._row, name: row.name, status: "error", error: err?.response?.data?.message || "Failed" });
      }
      setProgress({ done: i + 1, total: preview.length });
      setResults([...res]);
    }
    setUploading(false);
    setDone(true);
  };

  const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
  const successCount = results.filter((r) => r.status === "success").length;
  const errorCount = results.filter((r) => r.status === "error").length;

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.header}>
          <div style={s.iconWrap}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 style={s.title}>Bulk Upload Products</h1>
            <p style={s.subtitle}>Upload a CSV to create multiple products at once</p>
          </div>
        </div>

        <div style={s.hint}>
          Required columns: <strong>name, price, category, stock</strong> — Optional: description, sku
        </div>

        {!done && (
          <div
            style={{ ...s.dropZone, ...(dragging ? s.dropZoneActive : {}) }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
            <p style={s.dropText}>{dragging ? "Drop your CSV here" : "Drag & drop a CSV, or click to browse"}</p>
            <span style={s.dropSub}>.csv files only</span>
          </div>
        )}

        {parseError && <div style={{ ...s.toast, ...s.toastError }}>✕ {parseError}</div>}

        {preview.length > 0 && !done && (
          <div style={s.section}>
            <div style={s.sectionHead}>
              <span style={s.badge}>{preview.length} rows ready</span>
              <button onClick={reset} style={s.linkBtn}>Clear</button>
            </div>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>{ALL_HEADERS.map((h) => <th key={h} style={s.th}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {preview.slice(0, 5).map((row, i) => (
                    <tr key={i} style={i % 2 === 0 ? s.trEven : {}}>
                      {ALL_HEADERS.map((h) => <td key={h} style={s.td}>{row[h] || "—"}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {preview.length > 5 && <p style={s.moreRows}>+ {preview.length - 5} more rows</p>}
          </div>
        )}

        {uploading && (
          <div style={s.progressSection}>
            <div style={s.progressHead}>
              <span style={s.progressLabel}>Uploading... {progress.done}/{progress.total}</span>
              <span>{pct}%</span>
            </div>
            <div style={s.progressBar}>
              <div style={{ ...s.progressFill, width: `${pct}%` }} />
            </div>
          </div>
        )}

        {results.length > 0 && (
          <div style={s.section}>
            <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
              <span style={s.statSuccess}>✓ {successCount} created</span>
              {errorCount > 0 && <span style={s.statError}>✕ {errorCount} failed</span>}
            </div>
            <div style={s.tableWrap}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {["Row", "Product", "Status", "Note"].map((h) => <th key={h} style={s.th}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {results.map((r, i) => (
                    <tr key={i} style={i % 2 === 0 ? s.trEven : {}}>
                      <td style={s.td}>{r.row}</td>
                      <td style={s.td}>{r.name}</td>
                      <td style={s.td}>
                        <span style={r.status === "success" ? s.pillSuccess : s.pillError}>
                          {r.status === "success" ? "Success" : "Failed"}
                        </span>
                      </td>
                      <td style={s.td}>{r.error || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={s.actions}>
          {done ? (
            <button onClick={reset} style={s.btnPrimary}>Upload Another File</button>
          ) : (
            <>
              <button onClick={reset} style={s.btnSecondary} disabled={uploading}>Reset</button>
              <button
                onClick={handleUpload}
                disabled={!preview.length || uploading}
                style={{ ...s.btnPrimary, opacity: !preview.length || uploading ? 0.5 : 1, cursor: !preview.length || uploading ? "not-allowed" : "pointer" }}
              >
                {uploading ? "Uploading..." : `Upload ${preview.length > 0 ? `${preview.length} Products` : "Products"}`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#f4f6f9", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 16px", fontFamily: "system-ui, sans-serif" },
  card: { background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", padding: "36px 40px", width: "100%", maxWidth: 720 },
  header: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  iconWrap: { background: "#1a1a2e", color: "#fff", borderRadius: 10, width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  title: { fontSize: 20, fontWeight: 700, color: "#111", margin: 0 },
  subtitle: { fontSize: 13, color: "#888", margin: "2px 0 0" },
  hint: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#475569", marginBottom: 20 },
  dropZone: { border: "2px dashed #d1d5db", borderRadius: 12, padding: "36px 20px", textAlign: "center", cursor: "pointer", background: "#fafafa", marginBottom: 20 },
  dropZoneActive: { borderColor: "#1a1a2e", background: "#f0f4ff" },
  dropText: { fontSize: 14, color: "#555", fontWeight: 500, margin: "0 0 4px" },
  dropSub: { fontSize: 12, color: "#aaa" },
  toast: { display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", borderRadius: 9, fontSize: 13, fontWeight: 500, marginBottom: 16 },
  toastError: { background: "#fff1f2", color: "#dc2626", border: "1px solid #fecaca" },
  section: { marginBottom: 20 },
  sectionHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  badge: { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 600 },
  linkBtn: { background: "none", border: "none", color: "#888", fontSize: 13, cursor: "pointer", padding: 0 },
  tableWrap: { overflowX: "auto", borderRadius: 10, border: "1px solid #e5e7eb" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: { padding: "9px 14px", textAlign: "left", fontWeight: 600, color: "#6b7280", background: "#f9fafb", borderBottom: "1px solid #e5e7eb", textTransform: "uppercase", fontSize: 11 },
  td: { padding: "9px 14px", color: "#111" },
  trEven: { background: "#fafafa" },
  moreRows: { fontSize: 12, color: "#999", textAlign: "right", marginTop: 6 },
  progressSection: { marginBottom: 20 },
  progressHead: { display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, fontWeight: 600, color: "#374151" },
  progressLabel: { fontSize: 13 },
  progressBar: { height: 8, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #1a1a2e, #4f46e5)", borderRadius: 99, transition: "width 0.3s ease" },
  statSuccess: { fontSize: 14, fontWeight: 700, color: "#16a34a" },
  statError: { fontSize: 14, fontWeight: 700, color: "#dc2626" },
  pillSuccess: { background: "#f0fdf4", color: "#16a34a", border: "1px solid #bbf7d0", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 },
  pillError: { background: "#fff1f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 600 },
  actions: { display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 8 },
  btnPrimary: { background: "#1a1a2e", color: "#fff", border: "none", borderRadius: 9, padding: "11px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
  btnSecondary: { background: "#fff", color: "#555", border: "1.5px solid #e5e7eb", borderRadius: 9, padding: "11px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" },
};