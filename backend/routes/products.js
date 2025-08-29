// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// create product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, image, isPromotional } = req.body;
    const p = new Product({ 
      name, 
      description, 
      price, 
      category, 
      image: image || '',
      isPromotional: isPromotional || false
    });
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

// GET Trending Product (highest salesCount) - MOVED BEFORE /:id
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

// NEW: GET Promotional Products (for banner)
router.get('/promotional', async (req, res) => {
  try {
    const promotionalProducts = await Product.find({ isPromotional: true })
      .populate('category')
      .limit(5)
      .sort({ createdAt: -1 });
    res.json(promotionalProducts);
  } catch (err) {
    console.error('Error fetching promotional products:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// single product - MOVED AFTER specific routes
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