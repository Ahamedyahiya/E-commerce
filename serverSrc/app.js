const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const authRoutes = require("./routes/authRoutes");

app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  next();
});

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://e-commerce-murex-eight-54.vercel.app",
    "https://e-commerce-raceryahiya.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/api/product", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
