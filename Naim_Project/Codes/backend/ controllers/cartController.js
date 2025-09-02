const Cart = require('../models/Cart');
const Discount = require('../models/Discount');

// Helper function to calculate discount
const calculateDiscount = async (subtotal) => {
    try {
        // Get all active discounts
        const discounts = await Discount.find({ 
            isActive: true,
            validUntil: { $gt: new Date() }
        }).sort({ value: -1 }); // Sort by highest discount first

        let bestDiscount = null;
        let maxSavings = 0;

        for (const discount of discounts) {
            if (subtotal >= discount.minPurchase) {
                let savings = 0;
                if (discount.type === 'percentage') {
                    savings = subtotal * (discount.value / 100);
                    if (discount.maxDiscount) {
                        savings = Math.min(savings, discount.maxDiscount);
                    }
                } else if (discount.type === 'fixed') {
                    savings = discount.value;
                }

                if (savings > maxSavings) {
                    maxSavings = savings;
                    bestDiscount = discount;
                }
            }
        }

        return {
            discount: bestDiscount,
            savings: maxSavings,
            finalTotal: Math.max(0, subtotal - maxSavings)
        };
    } catch (error) {
        console.error('Error calculating discount:', error);
        return { discount: null, savings: 0, finalTotal: subtotal };
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(200).json({ 
                items: [], 
                total: 0, 
                subtotal: 0,
                discount: null,
                savings: 0,
                finalTotal: 0
            });
        }

        // Calculate subtotal
        const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        // Calculate discount
        const discountInfo = await calculateDiscount(subtotal);

        // Prepare response with discount information
        const cartResponse = {
            ...cart.toObject(),
            subtotal: subtotal,
            discount: discountInfo.discount ? {
                code: discountInfo.discount.code,
                value: discountInfo.discount.value,
                type: discountInfo.discount.type,
                savings: discountInfo.savings
            } : null,
            savings: discountInfo.savings,
            finalTotal: discountInfo.finalTotal
        };

        res.status(200).json(cartResponse);
    } catch (err) {
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
};

exports.addToCart = async (req, res) => {
    const { productId, quantity, price } = req.body;
    try {
        // If no price provided, use a default price
        const itemPrice = price || 29.99;
        
        // Create proper cart item object
        const cartItem = {
            productId: productId,
            quantity: quantity || 1,
            price: itemPrice
        };
        
        const cart = await Cart.findOneAndUpdate(
            { user: req.user.id },
            { 
                $push: { items: cartItem },
                $inc: { total: itemPrice * (quantity || 1) }
            },
            { new: true, upsert: true }
        );
        
        // Calculate subtotal and discount for the updated cart
        const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discountInfo = await calculateDiscount(subtotal);
        
        // Prepare response with discount information
        const cartResponse = {
            ...cart.toObject(),
            subtotal: subtotal,
            discount: discountInfo.discount ? {
                code: discountInfo.discount.code,
                value: discountInfo.discount.value,
                type: discountInfo.discount.type,
                savings: discountInfo.savings
            } : null,
            savings: discountInfo.savings,
            finalTotal: discountInfo.finalTotal
        };
        
        res.status(200).json(cartResponse);
    } catch (err) {
        console.error('Cart error:', err);
        res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
};

exports.updateCartItem = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        let cart;
        
        if (quantity <= 0) {
            // Remove item from cart
            cart = await Cart.findOneAndUpdate(
                { user: req.user.id },
                { 
                    $pull: { items: { productId: productId } }
                },
                { new: true }
            );
        } else {
            // Update quantity
            cart = await Cart.findOneAndUpdate(
                { user: req.user.id, "items.productId": productId },
                { $set: { "items.$.quantity": quantity } },
                { new: true }
            );
        }
        
        // Recalculate total after update
        if (cart && cart.items.length > 0) {
            const newTotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
            cart = await Cart.findByIdAndUpdate(
                cart._id,
                { total: newTotal },
                { new: true }
            );
        } else {
            // Cart is empty, set total to 0
            cart = await Cart.findByIdAndUpdate(
                cart._id,
                { total: 0 },
                { new: true }
            );
        }
        
        // Calculate subtotal and discount for the updated cart
        const subtotal = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discountInfo = await calculateDiscount(subtotal);
        
        // Prepare response with discount information
        const cartResponse = {
            ...cart.toObject(),
            subtotal: subtotal,
            discount: discountInfo.discount ? {
                code: discountInfo.discount.code,
                value: discountInfo.discount.value,
                type: discountInfo.discount.type,
                savings: discountInfo.savings
            } : null,
            savings: discountInfo.savings,
            finalTotal: discountInfo.finalTotal
        };
        
        res.status(200).json(cartResponse);
    } catch (err) {
        console.error('Cart update error:', err);
        res.status(500).json({ message: "Error updating cart item", error: err.message });
    }
};
