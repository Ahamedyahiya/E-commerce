const express = require("express");
const router = express.Router();
const { addToCart, getCart ,updateCart,deleteCart} = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware, addToCart);
router.get("/",authMiddleware, getCart);
router.put("/:id",authMiddleware, updateCart);
router.delete("/:id",authMiddleware, deleteCart);

module.exports = router;