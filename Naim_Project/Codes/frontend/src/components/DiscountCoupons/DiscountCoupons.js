import React, { useState } from 'react';
import discountService from '../../services/discountService';
import './DiscountCoupons.css';

const DiscountCoupons = () => {
    const [couponCode, setCouponCode] = useState('');
    const [cartTotal, setCartTotal] = useState(100);
    const [discountedTotal, setDiscountedTotal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setError('Please enter a coupon code');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setSuccess(null);
            
            const response = await discountService.applyDiscount(couponCode, cartTotal);
            setDiscountedTotal(response.data.discountedTotal);
            setSuccess('🎉 Coupon applied successfully!');
        } catch (error) {
            console.error('Error applying coupon:', error);
            setError(error.response?.data?.message || 'Failed to apply coupon');
            setDiscountedTotal(null);
        } finally {
            setLoading(false);
        }
    };

    const handleCartTotalChange = (e) => {
        const value = parseFloat(e.target.value) || 0;
        setCartTotal(value);
        setDiscountedTotal(null);
        setError(null);
        setSuccess(null);
    };

    const handleCouponClick = (code) => {
        setCouponCode(code);
    };

    return (
        <div className="discount-container">
            <h2>
                <span className="bengali-text">কিনবা</span>
                <span className="question-mark">?</span> Discount Coupons
            </h2>
            
            {/* Demo Cart Total Section */}
            <div className="demo-section">
                <h3>💰 Demo Cart Total</h3>
                <input
                    type="number"
                    value={cartTotal}
                    onChange={handleCartTotalChange}
                    placeholder="Enter cart total"
                    className="cart-total-input"
                />
            </div>

            {/* Coupon Application Section */}
            <div className="coupon-section">
                <h3>🎯 Apply Coupon</h3>
                <div className="coupon-input-group">
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="coupon-input"
                        disabled={loading}
                    />
                    <button 
                        onClick={handleApplyCoupon}
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? '🔄 Applying...' : '🎫 Apply Coupon'}
                    </button>
                </div>

                {error && <div className="error-message">❌ {error}</div>}
                {success && <div className="success-message">✅ {success}</div>}

                {discountedTotal && (
                    <div className="discount-result">
                        <div className="original-total">
                            <span>Original Total:</span>
                            <span>${cartTotal}</span>
                        </div>
                        <div className="discounted-total">
                            <span>Discounted Total:</span>
                            <span>${discountedTotal.toFixed(2)}</span>
                        </div>
                        <div className="savings">
                            <span>💰 You Save:</span>
                            <span>${(cartTotal - discountedTotal).toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Available Coupons Section */}
            <div className="demo-coupons">
                <h3>🎁 Available Coupons</h3>
                <p>Click on any coupon to automatically fill the code field:</p>
                
                <div className="coupon-cards">
                    <div className="coupon-card" onClick={() => handleCouponClick('SAVE10')}>
                        <div className="coupon-code">SAVE10</div>
                        <div className="coupon-value">10% OFF</div>
                        <div className="coupon-min">Min. $50</div>
                    </div>
                    
                    <div className="coupon-card" onClick={() => handleCouponClick('SAVE20')}>
                        <div className="coupon-code">SAVE20</div>
                        <div className="coupon-value">20% OFF</div>
                        <div className="coupon-min">Min. $100</div>
                    </div>
                    
                    <div className="coupon-card" onClick={() => handleCouponClick('SAVE50')}>
                        <div className="coupon-code">SAVE50</div>
                        <div className="coupon-value">50% OFF</div>
                        <div className="coupon-min">Min. $200</div>
                    </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                    <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>💡 How to use:</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ padding: '0.5rem 0', color: '#7f8c8d' }}>
                            • Set your cart total above
                        </li>
                        <li style={{ padding: '0.5rem 0', color: '#7f8c8d' }}>
                            • Click on a coupon card or enter code manually
                        </li>
                        <li style={{ padding: '0.5rem 0', color: '#7f8c8d' }}>
                            • Click "Apply Coupon" to see your savings
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DiscountCoupons;
