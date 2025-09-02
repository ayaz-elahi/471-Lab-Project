const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;
    
    console.log('Creating order with data:', { items, totalAmount, shippingAddress, paymentMethod });
    
    try {
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "Order must contain at least one item" });
        }
        
        if (!totalAmount || totalAmount <= 0) {
            return res.status(400).json({ message: "Invalid total amount" });
        }
        
        const order = new Order({
            user: req.user.id,
            items,
            totalAmount,
            shippingAddress,
            paymentMethod,
            estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
        });
        
        console.log('Saving order:', order);
        
        await order.save();
        
        console.log('Order created successfully:', order.orderNumber);
        
        res.status(201).json(order);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ message: "Error creating order", error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id })
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findOne({ 
            _id: req.params.orderId, 
            user: req.user.id 
        });
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Error fetching order", error: err.message });
    }
};

exports.getOrderByNumber = async (req, res) => {
    try {
        const order = await Order.findOne({ 
            orderNumber: req.params.orderNumber 
        });
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Error fetching order", error: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const { status, message } = req.body;
    try {
        const order = await Order.findById(req.params.orderId);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        // Update current status
        order.currentStatus = status;
        
        // Add to status history
        order.statusHistory.push({
            status,
            message: message || `Order status updated to ${status}`
        });
        
        // Set actual delivery date if status is 'Delivered'
        if (status === 'Delivered') {
            order.actualDelivery = new Date();
        }
        
        await order.save();
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Error updating order status", error: err.message });
    }
};

// Demo function to simulate order status progression
exports.simulateOrderProgress = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        
        const statuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
        const messages = [
            'Order placed successfully',
            'Order confirmed and payment received',
            'Order is being processed',
            'Order has been shipped',
            'Order is out for delivery',
            'Order has been delivered successfully'
        ];
        
        const currentIndex = statuses.indexOf(order.currentStatus);
        const nextIndex = Math.min(currentIndex + 1, statuses.length - 1);
        
        order.currentStatus = statuses[nextIndex];
        order.statusHistory.push({
            status: statuses[nextIndex],
            message: messages[nextIndex]
        });
        
        if (statuses[nextIndex] === 'Delivered') {
            order.actualDelivery = new Date();
        }
        
        await order.save();
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: "Error simulating order progress", error: err.message });
    }
};
