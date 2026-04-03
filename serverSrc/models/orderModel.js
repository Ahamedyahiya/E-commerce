const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true
  },

  name: {
    type: String,
    required: true  
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],

  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Invalid phone number"]
  },

  paymentMethod: {
    type: String,
    enum: ["COD", "Online"],
    default: "COD"
  },

  totalAmount: {
    type: Number,
    required: true
  },

  orderStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending"
  },

  deliveredAt: Date

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);