const express = require('express');
const router = express.Router();
const orderController = require('../ controllers/orderController');

// Middleware to simulate user authentication (for demo purposes)
const authMiddleware = (req, res, next) => {
  req.user = { id: '507f1f77bcf86cd799439011' }; // Demo user ID
  next();
};

// Order routes
router.post('/create', authMiddleware, orderController.createOrder);
router.get('/', authMiddleware, orderController.getOrders);
router.get('/:orderId', authMiddleware, orderController.getOrderById);
router.get('/number/:orderNumber', orderController.getOrderByNumber);
router.put('/:orderId/status', authMiddleware, orderController.updateOrderStatus);
router.post('/:orderId/simulate-progress', authMiddleware, orderController.simulateOrderProgress);

module.exports = router;
