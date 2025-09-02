import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cart from './components/cart/Cart';
import DiscountCoupons from './components/DiscountCoupons/DiscountCoupons';
import OrderStatus from './components/orderstatus/OrderStatus';
import Footer from './components/Footer/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <div className="logo-container">
              <h1 className="logo">
                <span className="bengali-text">কিনবা</span>
                <span className="question-mark">?</span>
                <span className="cart-icon">🛒</span>
              </h1>
            </div>
            <ul className="nav-links">
              <li><Link to="/">🏠 Home</Link></li>
              <li><Link to="/cart">🛒 Cart</Link></li>
              <li><Link to="/discounts">🎫 Discounts</Link></li>
              <li><Link to="/orders">📦 Orders</Link></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/discounts" element={<DiscountCoupons />} />
              <Route path="/orders" element={<OrderStatus />} />
            </Routes>
          </div>
        </main>

        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home fade-in">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-logo">
          <h1 className="hero-title">
            <span className="bengali-text">কিনবা</span>
            <span className="question-mark">?</span>
          </h1>
          <div className="hero-subtitle">E-Shop</div>
        </div>
        <p>Your ultimate destination for seamless online shopping with amazing discounts and a modern shopping experience.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/cart" className="btn btn-primary">
            🛒 Start Shopping
          </Link>
          <Link to="/discounts" className="btn btn-secondary">
            🎫 View Discounts
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats">
        <div className="stat-card">
          <div className="stat-number">1000+</div>
          <div className="stat-label">Happy Customers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">Product Categories</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Customer Support</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">Free</div>
          <div className="stat-label">Shipping</div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="feature-card slide-up">
          <h3>🛒 Smart Shopping Cart</h3>
          <p>Manage your shopping cart with ease. Add, remove, and update quantities with real-time calculations and a beautiful interface.</p>
          <Link to="/cart" className="btn btn-primary">Explore Cart</Link>
        </div>
        
        <div className="feature-card slide-up">
          <h3>🎫 Discount Coupons</h3>
          <p>Save big with our exclusive discount coupons. Apply multiple codes and watch your savings grow with instant calculations.</p>
          <Link to="/discounts" className="btn btn-secondary">View Discounts</Link>
        </div>
        
        <div className="feature-card slide-up">
          <h3>📦 Order Tracking</h3>
          <p>Track your orders in real-time with our advanced order status system. Get updates from placement to delivery.</p>
          <Link to="/orders" className="btn btn-success">Track Orders</Link>
        </div>
        
        <div className="feature-card slide-up">
          <h3>⚡ Fast & Secure</h3>
          <p>Built with modern technologies for lightning-fast performance and secure transactions. Your data is always protected.</p>
          <Link to="/cart" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="hero" style={{ marginTop: '3rem' }}>
        <h2>Ready to Start Shopping?</h2>
        <p>Join thousands of satisfied customers and discover amazing deals today!</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/cart" className="btn btn-primary">
            🛒 Browse Products
          </Link>
          <Link to="/discounts" className="btn btn-secondary">
            🎫 Get Discounts
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
