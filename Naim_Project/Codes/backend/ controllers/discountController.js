const Discount = require('../models/Discount');

exports.getDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find({ 
            isActive: true,
            validUntil: { $gt: new Date() }
        }).select('code value type minPurchase -_id');
        
        res.status(200).json(discounts);
    } catch (err) {
        console.error('Error fetching discounts:', err);
        res.status(500).json({ 
            message: "Error fetching discounts", 
            error: err.message 
        });
    }
};

exports.applyDiscount = async (req, res) => {
    const { couponCode, cartTotal } = req.body;
    
    try {
        // Validate input
        if (!couponCode || !cartTotal) {
            return res.status(400).json({ 
                message: 'Coupon code and cart total are required' 
            });
        }

        // Find the discount
        const discount = await Discount.findOne({ 
            code: couponCode.toUpperCase(),
            isActive: true 
        });

        if (!discount) {
            return res.status(404).json({ 
                message: 'Coupon not found or inactive' 
            });
        }

        // Check if coupon is still valid
        if (new Date() > discount.validUntil) {
            return res.status(400).json({ 
                message: 'Coupon has expired' 
            });
        }

        // Check minimum purchase requirement
        if (cartTotal < discount.minPurchase) {
            return res.status(400).json({ 
                message: `Minimum purchase of $${discount.minPurchase} required for this coupon` 
            });
        }

        // Check usage limit
        if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
            return res.status(400).json({ 
                message: 'Coupon usage limit reached' 
            });
        }

        // Calculate discount
        let discountedTotal;
        if (discount.type === 'percentage') {
            const discountAmount = cartTotal * (discount.value / 100);
            discountedTotal = cartTotal - discountAmount;
        } else {
            discountedTotal = cartTotal - discount.value;
        }

        // Ensure discounted total doesn't go below 0
        discountedTotal = Math.max(0, discountedTotal);

        // Update usage count
        await Discount.findByIdAndUpdate(discount._id, {
            $inc: { usedCount: 1 }
        });

        res.status(200).json({ 
            discountedTotal,
            discountApplied: discount.value,
            discountType: discount.type,
            message: 'Coupon applied successfully'
        });
    } catch (err) {
        console.error('Error applying discount:', err);
        res.status(500).json({ 
            message: "Error applying discount", 
            error: err.message 
        });
    }
};
