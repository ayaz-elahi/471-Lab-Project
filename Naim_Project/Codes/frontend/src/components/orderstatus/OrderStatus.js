import React, { useState, useEffect } from 'react';
import orderService from '../../services/orderService';
import './OrderStatus.css';

const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderNumber, setOrderNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchMode, setSearchMode] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const response = await orderService.getOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error loading orders:', error);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const searchOrder = async () => {
        if (!orderNumber.trim()) {
            setError('Please enter an order number');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await orderService.getOrderByNumber(orderNumber);
            setSelectedOrder(response.data);
            setSearchMode(true);
        } catch (error) {
            console.error('Error searching order:', error);
            setError('Order not found');
            setSelectedOrder(null);
        } finally {
            setLoading(false);
        }
    };

    const simulateProgress = async (orderId) => {
        try {
            const response = await orderService.simulateOrderProgress(orderId);
            setSelectedOrder(response.data);
            // Update the order in the orders list
            setOrders(orders.map(order => 
                order._id === orderId ? response.data : order
            ));
        } catch (error) {
            console.error('Error simulating progress:', error);
            setError('Failed to update order status');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': '#ff9800',
            'Confirmed': '#2196f3',
            'Processing': '#9c27b0',
            'Shipped': '#3f51b5',
            'Out for Delivery': '#ff5722',
            'Delivered': '#4caf50',
            'Cancelled': '#f44336'
        };
        return colors[status] || '#757575';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'Pending': '⏳',
            'Confirmed': '✅',
            'Processing': '⚙️',
            'Shipped': '📦',
            'Out for Delivery': '🚚',
            'Delivered': '🎉',
            'Cancelled': '❌'
        };
        return icons[status] || '❓';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    if (loading) {
        return (
            <div className="order-status-loading">
                <div className="spinner"></div>
                <p>Loading order information...</p>
            </div>
        );
    }

    return (
        <div className="order-status-container">
            <h2>
                <span className="bengali-text">কিনবা</span>
                <span className="question-mark">?</span> Order Status
            </h2>

            {error && <div className="error-message">{error}</div>}

            {/* Search Section */}
            <div className="search-section">
                <h3>🔍 Track Your Order</h3>
                <div className="search-form">
                    <input
                        type="text"
                        placeholder="Enter order number (e.g., KINBA123456789)"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
                        className="order-number-input"
                    />
                    <button onClick={searchOrder} className="btn btn-primary">
                        🔍 Track Order
                    </button>
                </div>
            </div>

            {/* Order Details */}
            {selectedOrder && (
                <div className="order-details">
                    <div className="order-header">
                        <h3>Order #{selectedOrder.orderNumber}</h3>
                        <div className="order-meta">
                            <span>Placed: {formatDate(selectedOrder.createdAt)}</span>
                            {selectedOrder.estimatedDelivery && (
                                <span>Estimated Delivery: {formatDate(selectedOrder.estimatedDelivery)}</span>
                            )}
                        </div>
                    </div>

                    <div className="current-status">
                        <div 
                            className="status-badge"
                            style={{ backgroundColor: getStatusColor(selectedOrder.currentStatus) }}
                        >
                            {getStatusIcon(selectedOrder.currentStatus)} {selectedOrder.currentStatus}
                        </div>
                    </div>

                    {/* Status Timeline */}
                    <div className="status-timeline">
                        <h4>📋 Status History</h4>
                        <div className="timeline">
                            {selectedOrder.statusHistory.map((status, index) => (
                                <div key={index} className="timeline-item">
                                    <div className="timeline-icon" style={{ backgroundColor: getStatusColor(status.status) }}>
                                        {getStatusIcon(status.status)}
                                    </div>
                                    <div className="timeline-content">
                                        <h5>{status.status}</h5>
                                        <p>{status.message}</p>
                                        <small>{formatDate(status.timestamp)}</small>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="order-items">
                        <h4>📦 Order Items</h4>
                        <div className="items-list">
                            {selectedOrder.items.map((item, index) => (
                                <div key={index} className="order-item">
                                    <div className="item-info">
                                        <h5>{item.productId || `Product ${item.productId}`}</h5>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: ${item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="order-total">
                            <strong>Total: ${selectedOrder.totalAmount}</strong>
                        </div>
                    </div>

                    {/* Demo Progress Button */}
                    <div className="demo-actions">
                        <button 
                            onClick={() => simulateProgress(selectedOrder._id)}
                            className="btn btn-secondary"
                            disabled={selectedOrder.currentStatus === 'Delivered'}
                        >
                            🚀 Simulate Progress
                        </button>
                        <p className="demo-note">💡 Click to simulate order progress (demo feature)</p>
                    </div>
                </div>
            )}

            {/* Recent Orders */}
            {!searchMode && orders.length > 0 && (
                <div className="recent-orders">
                    <h3>📋 Recent Orders</h3>
                    <div className="orders-grid">
                        {orders.slice(0, 5).map((order) => (
                            <div 
                                key={order._id} 
                                className="order-card"
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div className="order-card-header">
                                    <h4>#{order.orderNumber}</h4>
                                    <div 
                                        className="status-indicator"
                                        style={{ backgroundColor: getStatusColor(order.currentStatus) }}
                                    >
                                        {getStatusIcon(order.currentStatus)}
                                    </div>
                                </div>
                                <p>Total: ${order.totalAmount}</p>
                                <small>{formatDate(order.createdAt)}</small>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No Orders Message */}
            {!searchMode && orders.length === 0 && !selectedOrder && (
                <div className="no-orders">
                    <h3>📭 No Orders Found</h3>
                    <p>You haven't placed any orders yet. Start shopping to see your order status here!</p>
                </div>
            )}
        </div>
    );
};

export default OrderStatus;
