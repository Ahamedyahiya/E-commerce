const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { img, name, price, color, ram, storage } = req.body;

    if (!img) {
      return res.status(400).json({ message: "Image is required" });
    }

    const product = await Product.create({ img, name, price, color, ram, storage });

    res.status(201).json({ message: "Product created successfully", product });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { img, name, price, color, ram, storage } = req.body;

    const updateData = { name, price, color, ram, storage };

    if (img) {
      updateData.img = img;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};