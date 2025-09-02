import React, { useEffect, useState } from 'react';
import cartService from '../../services/cartService';
import orderService from '../../services/orderService';
import './Cart.css';

const Cart = () => {
    const [cart, setCart] = useState({ 
        items: [], 
        total: 0, 
        subtotal: 0,
        discount: null,
        savings: 0,
        finalTotal: 0
    });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        loadCart();
        loadProducts();
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            const response = await cartService.getCart();
            setCart(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            setError('Failed to load cart');
            setCart({ items: [], total: 0 });
        } finally {
            setLoading(false);
        }
    };

    const loadProducts = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/products');
            const productsData = await response.json();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
            // Fallback to demo products if API fails
            setProducts([
                { _id: '1', name: 'Wireless Headphones', price: 89.99, image: '🎧' },
                { _id: '2', name: 'Smart Watch', price: 199.99, image: '⌚' },
                { _id: '3', name: 'Laptop Stand', price: 49.99, image: '💻' },
                { _id: '4', name: 'Coffee Mug', price: 19.99, image: '☕' }
            ]);
        }
    };

    const handleUpdate = async (productId, quantity) => {
        try {
            const response = await cartService.updateCartItem(productId, quantity);
            setCart(response.data);
        } catch (error) {
            console.error('Error updating cart:', error);
            setError('Failed to update cart');
        }
    };

    const handleAddToCart = async (product) => {
        console.log('🛒 Cart Component: handleAddToCart called with product:', product);
        try {
            console.log('🛒 Cart Component: Calling cartService.addToCart...');
            const response = await cartService.addToCart(product._id, 1, product.price);
            console.log('🛒 Cart Component: Success response:', response.data);
            setCart(response.data);
            setError(null);
            console.log('🛒 Cart Component: Cart updated successfully');
        } catch (error) {
            console.error('🛒 Cart Component: Error adding to cart:', error);
            setError('Failed to add item to cart');
        }
    };

    const handlePlaceOrder = async () => {
        if (cart.items.length === 0) {
            setError('Cart is empty. Please add items before placing an order.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            const orderData = {
                items: cart.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price || 29.99
                })),
                totalAmount: calculateTotal(),
                shippingAddress: {
                    street: '123 Demo Street',
                    city: 'Demo City',
                    state: 'Demo State',
                    zipCode: '12345',
                    country: 'Demo Country'
                },
                paymentMethod: 'Credit Card'
            };

            console.log('Placing order with data:', orderData);
            
            const response = await orderService.createOrder(orderData);
            console.log('Order created successfully:', response.data);
            
            setOrderPlaced(true);
            
            // Clear cart after successful order
            setCart({ items: [], total: 0 });
            
            // Show success message with order number
            setTimeout(() => {
                alert(`🎉 Order placed successfully!\nOrder Number: ${response.data.orderNumber}\n\nYou can track your order in the Orders section.`);
                setOrderPlaced(false);
            }, 1000);
            
        } catch (error) {
            console.error('Error placing order:', error);
            setError(`Failed to place order: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotal = () => {
        return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (loading) {
        return (
            <div className="cart-loading">
                <div className="spinner"></div>
                <p>Loading your shopping cart...</p>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>
                <span className="bengali-text">কিনবা</span>
                <span className="question-mark">?</span> Shopping Cart
            </h2>
            
            {error && <div className="error-message">{error}</div>}
            
            {orderPlaced && (
                <div className="success-message">
                    🎉 Order placed successfully! Redirecting to order tracking...
                </div>
            )}
            
            {cart.items && cart.items.length > 0 ? (
                <>
                    <div className="cart-items">
                        {cart.items.map((item, index) => {
                            // Find the product details for this cart item
                            const product = products.find(p => p._id === item.productId) || 
                                         products.find(p => p._id === item.productId.toString()) ||
                                         { name: `Product ${item.productId}`, image: '📦', price: item.price };
                            
                            return (
                                <div key={index} className="cart-item">
                                    <div className="item-image">
                                        <div className="product-emoji">{product.image || '📦'}</div>
                                    </div>
                                    <div className="item-details">
                                        <h4>{product.name || `Product ${item.productId}`}</h4>
                                        <p className="item-price">${item.price || 29.99}</p>
                                        <p className="item-description">{product.description || 'Product description'}</p>
                                    </div>
                                    <div className="item-actions">
                                        <div className="quantity-controls">
                                            <button 
                                                className="btn btn-quantity"
                                                onClick={() => handleUpdate(item.productId, Math.max(1, item.quantity - 1))}
                                                disabled={item.quantity <= 1}
                                            >
                                                ➖
                                            </button>
                                            <span className="quantity-display">{item.quantity}</span>
                                            <button 
                                                className="btn btn-quantity"
                                                onClick={() => handleUpdate(item.productId, item.quantity + 1)}
                                            >
                                                ➕
                                            </button>
                                        </div>
                                        <div className="item-total">
                                            <span>Total: ${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <button 
                                            className="btn btn-remove"
                                            onClick={() => handleUpdate(item.productId, 0)}
                                        >
                                            🗑️ Remove
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="cart-summary">
                        <div className="summary-row">
                            <span>Subtotal:</span>
                            <span>${cart.subtotal ? cart.subtotal.toFixed(2) : calculateTotal().toFixed(2)}</span>
                        </div>
                        {cart.discount && (
                            <div className="summary-row discount-row">
                                <span>Discount ({cart.discount.code}):</span>
                                <span className="discount-amount">-${cart.savings.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row total-row">
                            <span>Total:</span>
                            <span>${cart.finalTotal ? cart.finalTotal.toFixed(2) : calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="cart-total">
                        <h3>Total: ${cart.finalTotal ? cart.finalTotal.toFixed(2) : calculateTotal().toFixed(2)}</h3>
                        {cart.discount && (
                            <div className="discount-info">
                                <span className="discount-badge">
                                    🎫 {cart.discount.code} Applied!
                                </span>
                                <span className="savings-text">
                                    You saved ${cart.savings.toFixed(2)}!
                                </span>
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                            <button className="btn btn-success" onClick={handlePlaceOrder}>
                                🛒 Place Order
                            </button>
                            <button className="btn btn-secondary">
                                💳 Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="empty-cart">
                    <h3>
                        <span className="bengali-text">কিনবা</span>
                        <span className="question-mark">?</span> Cart is Empty
                    </h3>
                    <p>Add some amazing products to get started!</p>
                    
                    <div className="demo-products">
                        {products.map((product) => (
                            <div key={product._id} className="demo-product">
                                <div className="product-emoji-large">{product.image}</div>
                                <h4>{product.name}</h4>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">${product.price}</p>
                                <button 
                                    className="btn btn-primary"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    ➕ Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
