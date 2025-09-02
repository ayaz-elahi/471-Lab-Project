const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ inStock: true });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: "Error fetching product", error: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
};
