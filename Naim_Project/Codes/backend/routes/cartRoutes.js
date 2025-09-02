const express = require('express');
const router = express.Router();
const cartController = require('../ controllers/cartController');

// Middleware to simulate user authentication (for demo purposes)
const authMiddleware = (req, res, next) => {
  req.user = { id: '507f1f77bcf86cd799439011' }; // Demo user ID
  next();
};

// Cart routes
router.get('/', authMiddleware, cartController.getCart);
router.post('/add', authMiddleware, cartController.addToCart);
router.put('/update', authMiddleware, cartController.updateCartItem);

module.exports = router;
