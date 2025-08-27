// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// create product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const p = new Product({ name, description, price, category, image: image || '' });
    await p.save();
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// list products (optional ?categoryId=<id>)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.categoryId) filter.category = req.query.categoryId;
    const products = await Product.find(filter).populate('category').sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Trending Product (highest salesCount) - MOVE THIS BEFORE /:id
router.get('/trending', async (req, res) => {
  try {
    const topProduct = await Product.findOne().sort({ salesCount: -1 }).populate('category');
    if (!topProduct) {
      return res.status(404).json({ error: 'No products found' });
    }
    res.json(topProduct);
  } catch (err) {
    console.error('Error fetching trending product:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// single product - MOVE THIS AFTER /trending
router.get('/:id', async (req, res) => {
  try {
    const p = await Product.findById(req.params.id).populate('category');
    if (!p) return res.status(404).json({ error: 'Product not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;