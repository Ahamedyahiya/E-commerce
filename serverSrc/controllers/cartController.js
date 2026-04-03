const Cart = require("../models/cartModel");

async function addToCart(req, res) {
  try {
    const { product } = req.body;

    let cartItem = await Cart.findOne({
      user: req.user.id,
      product: product,
    });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();

      return res.status(200).json({
        message: "Quantity updated",
        cartItem,
      });
    }

    const newCart = await Cart.create({
      user: req.user.id,
      product,
      quantity: 1,
    });

    res.status(201).json({
      message: "Added to cart",
      cartItem: newCart,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCart(req, res) {
  try {
    const cart = await Cart.find({ user: req.user.id })
      .populate("product", "name price img");

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateCart(req, res) {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    ).populate("product", "name price img");

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Quantity updated",
      cartItem,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteCart(req, res) {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item removed from cart",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {addToCart,getCart,updateCart,deleteCart};