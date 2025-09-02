import React, { useState, useEffect, useRef } from 'react';
import chatbotService from '../../services/chatbotService';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Chatbot knowledge base and resources
    const chatbotKnowledge = {
        greetings: {
            patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
            responses: [
                'Hello! Welcome to কিনবা? E-Shop! How can I help you today? 🛒',
                'Hi there! I\'m your shopping assistant. What would you like to know? 🎯',
                'Hey! Welcome to Kinba! How can I make your shopping experience better? ✨'
            ]
        },
        help: {
            patterns: ['help', 'support', 'assist', 'what can you do'],
            responses: [
                'I can help you with:\n• Product information 🛍️\n• Order tracking 📦\n• Discount codes 🎫\n• Shopping cart help 🛒\n• Payment methods 💳\n• Shipping info 🚚\n• Return policies 🔄\n\nWhat would you like to know?'
            ]
        },
        products: {
            patterns: ['products', 'items', 'goods', 'what do you sell', 'catalog'],
            responses: [
                'We offer a wide range of products:\n\n🎧 Electronics: Headphones, Smart Watches\n💻 Accessories: Laptop Stands, Wireless Mice\n☕ Home & Living: Coffee Mugs, Phone Stands\n\nAll products come with quality guarantees and fast shipping!'
            ]
        },
        cart: {
            patterns: ['cart', 'shopping cart', 'add to cart', 'remove from cart'],
            responses: [
                '🛒 Shopping Cart Features:\n\n• Add products with one click\n• Update quantities easily\n• Remove items instantly\n• Real-time total calculation\n• Secure checkout process\n\nVisit the Cart page to manage your items!'
            ]
        },
        discounts: {
            patterns: ['discount', 'coupon', 'promo', 'save money', 'offers'],
            responses: [
                '🎫 Current Discount Offers:\n\n• WELCOME20: 20% off (min $50)\n• SAVE10: 10% off (min $30)\n• FREESHIP: Free shipping (min $100)\n\nVisit the Discounts page to apply these codes!'
            ]
        },
        orders: {
            patterns: ['order', 'tracking', 'delivery', 'shipping', 'when will i get'],
            responses: [
                '📦 Order & Delivery Info:\n\n• Real-time order tracking\n• Multiple delivery options\n• Estimated delivery times\n• SMS/Email notifications\n• Order status updates\n\nCheck your order status in the Orders section!'
            ]
        },
        payment: {
            patterns: ['payment', 'pay', 'credit card', 'debit card', 'cash on delivery'],
            responses: [
                '💳 Payment Methods:\n\n• Credit/Debit Cards\n• Digital Wallets\n• Bank Transfers\n• Cash on Delivery\n• EMI Options Available\n\nAll payments are secure and encrypted!'
            ]
        },
        returns: {
            patterns: ['return', 'refund', 'exchange', 'not satisfied', 'wrong item'],
            responses: [
                '🔄 Return & Refund Policy:\n\n• 30-day return window\n• Easy return process\n• Full refund guarantee\n• Free return shipping\n• Exchange options available\n\nContact support for assistance!'
            ]
        },
        contact: {
            patterns: ['contact', 'support', 'customer service', 'phone', 'email'],
            responses: [
                '📞 Contact Information:\n\n• Customer Support: 24/7\n• Email: support@kinba.com\n• Live Chat: Available now\n• Phone: 1-800-KINBA-ES\n• Response Time: < 2 hours'
            ]
        },
        website: {
            patterns: ['website', 'site', 'online', 'web'],
            responses: [
                '🌐 Website Features:\n\n• Mobile responsive design\n• Fast loading pages\n• Secure shopping\n• Easy navigation\n• Multiple payment options\n• Real-time inventory\n\nShop anytime, anywhere!'
            ]
        }
    };

    // Initialize chatbot with welcome message
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            addBotMessage('Hello! I\'m your Kinba shopping assistant. How can I help you today? 🛒\n\nType "help" to see what I can do!');
        }
    }, [isOpen, messages.length]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const addBotMessage = (text) => {
        setMessages(prev => [...prev, { text, isBot: true, timestamp: new Date() }]);
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { text, isBot: false, timestamp: new Date() }]);
    };

    const findResponse = (userInput) => {
        // Use the enhanced chatbot service
        const context = chatbotService.getConversationContext();
        return chatbotService.generateResponse(userInput, context);
    };

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        const userMessage = inputMessage.trim();
        addUserMessage(userMessage);
        setInputMessage('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const botResponse = findResponse(userMessage);
            addBotMessage(botResponse);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const toggleChatbot = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            inputRef.current?.focus();
        }
    };

    const quickActions = [
        { text: '🛍️ Products', action: 'Tell me about your products' },
        { text: '🎫 Discounts', action: 'What discounts do you offer?' },
        { text: '📦 Orders', action: 'How do I track my order?' },
        { text: '🛒 Cart Help', action: 'Help with shopping cart' },
        { text: '💳 Payment', action: 'What payment methods do you accept?' },
        { text: '🔄 Returns', action: 'What is your return policy?' },
        { text: '🔧 Support', action: 'I have a technical issue' },
        { text: '📚 Help', action: 'What can you help me with?' }
    ];

    const handleQuickAction = (action) => {
        addUserMessage(action);
        setIsTyping(true);
        
        setTimeout(() => {
            const botResponse = findResponse(action);
            addBotMessage(botResponse);
            setIsTyping(false);
        }, 800);
    };

    return (
        <>
            {/* Chatbot Toggle Button */}
            <div className="chatbot-toggle" onClick={toggleChatbot}>
                {isOpen ? '✕' : '💬'}
            </div>

            {/* Chatbot Interface */}
            {isOpen && (
                <div className="chatbot-container">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <span className="bengali-text">কিনবা</span> Assistant
                        </div>
                        <div className="chatbot-subtitle">Your Shopping Helper</div>
                    </div>

                    {/* Messages Area */}
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.isBot ? 'bot' : 'user'}`}>
                                <div className="message-content">
                                    {message.isBot && <div className="bot-avatar">🤖</div>}
                                    <div className="message-text">
                                        {message.text.split('\n').map((line, i) => (
                                            <div key={i}>{line}</div>
                                        ))}
                                    </div>
                                    {!message.isBot && <div className="user-avatar">👤</div>}
                                </div>
                                <div className="message-time">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))}
                        
                        {isTyping && (
                            <div className="message bot">
                                <div className="message-content">
                                    <div className="bot-avatar">🤖</div>
                                    <div className="typing-indicator">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="quick-actions">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className="quick-action-btn"
                                onClick={() => handleQuickAction(action.action)}
                            >
                                {action.text}
                            </button>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="chatbot-input">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Type your message here..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="chatbot-input-field"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="chatbot-send-btn"
                            disabled={!inputMessage.trim()}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
