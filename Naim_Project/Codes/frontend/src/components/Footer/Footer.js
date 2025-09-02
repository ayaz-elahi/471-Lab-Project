import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>
                            <span className="bengali-text">কিনবা</span>
                            <span className="question-mark">?</span> E-Shop
                        </h3>
                        <p>Your ultimate destination for seamless online shopping with amazing discounts and a modern shopping experience.</p>
                        <div className="social-links">
                            <a href="#" className="social-link">📘</a>
                            <a href="#" className="social-link">🐦</a>
                            <a href="#" className="social-link">📷</a>
                            <a href="#" className="social-link">💼</a>
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/">🏠 Home</a></li>
                            <li><a href="/cart">🛒 Shopping Cart</a></li>
                            <li><a href="/discounts">🎫 Discounts</a></li>
                            <li><a href="/orders">📦 Order Tracking</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Customer Service</h4>
                        <ul>
                            <li><a href="#">📞 Contact Us</a></li>
                            <li><a href="#">❓ FAQ</a></li>
                            <li><a href="#">📋 Terms & Conditions</a></li>
                            <li><a href="#">🔒 Privacy Policy</a></li>
                        </ul>
                    </div>
                    
                    <div className="footer-section">
                        <h4>Newsletter</h4>
                        <p>Subscribe to get updates on new products and special offers!</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Enter your email" className="newsletter-input" />
                            <button className="btn btn-primary">Subscribe</button>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>&copy; 2024 <span className="bengali-text">কিনবা</span><span className="question-mark">?</span> E-Shop. All rights reserved. Made with ❤️ for amazing shopping experiences.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
