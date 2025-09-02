const express = require('express');
const router = express.Router();
const wishlistController = require('../ controllers/wishlistController');

// Middleware to simulate user authentication (for demo purposes)
const authMiddleware = (req, res, next) => {
  req.user = { id: '507f1f77bcf86cd799439011' }; // Demo user ID
  next();
};

// Wishlist routes
router.post('/add', authMiddleware, wishlistController.addToWishlist);

module.exports = router;
