const express = require('express');
const router = express.Router();
const discountController = require('../ controllers/discountController');

// Discount routes
router.get('/', discountController.getDiscounts);
router.post('/apply', discountController.applyDiscount);

module.exports = router;
