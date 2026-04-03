const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");

exports.createOrder = async (req, res) => {
  try {
    const { name, address, city, state, phoneNumber, paymentMethod } = req.body; // ✅ name add
    const userId = req.user.id || req.user._id;

    const cartItems = await Cart.find({ user: userId }).populate("product");

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty or not found"
      });
    }

    let totalAmount = 0;

    const orderProducts = cartItems.map(item => {
      const price = item.product.price;
      const quantity = item.quantity;
      totalAmount += price * quantity;

      return {
        product: item.product._id,
        name: item.product.name,
        price: price,
        quantity: quantity
      };
    });

    const newOrder = new Order({
      user: userId,
      name,           // ✅ form name save பண்றோம்
      products: orderProducts,
      address,
      city,
      state,
      phoneNumber,
      paymentMethod,
      totalAmount
    });

    const savedOrder = await newOrder.save();

    await Cart.deleteMany({ user: userId });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: savedOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to place order"
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders"
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching your orders"
    });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order"
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    order.orderStatus = status;

    if (status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order"
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order"
    });
  }
};





