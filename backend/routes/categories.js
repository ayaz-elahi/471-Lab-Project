// backend/routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// create category
router.post('/', async (req, res) => {
  try {
    const { name, parent } = req.body;
    const cat = new Category({ name, parent: parent || null });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get flat list
router.get('/', async (req, res) => {
  try {
    const cats = await Category.find().sort({ name: 1 });
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get hierarchical tree
router.get('/tree', async (req, res) => {
  try {
    const cats = await Category.find().lean();
    const map = {};
    cats.forEach(c => (map[c._id] = { ...c, children: [] }));
    const roots = [];
    cats.forEach(c => {
      if (c.parent) {
        if (map[c.parent]) map[c.parent].children.push(map[c._id]);
      } else {
        roots.push(map[c._id]);
      }
    });
    res.json(roots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get single
router.get('/:id', async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);
    if (!cat) return res.status(404).json({ error: 'Category not found' });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
