const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  deleteOrder
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");




router.post("/create", authMiddleware, createOrder);

router.get("/my-orders", authMiddleware, getMyOrders);



router.get("/",authMiddleware,adminMiddleware,getAllOrders);

router.put("/:id/status", authMiddleware,adminMiddleware,updateOrderStatus);

router.delete("/:id", authMiddleware,adminMiddleware,deleteOrder);

router.get("/:id",authMiddleware, getSingleOrder);


module.exports = router;