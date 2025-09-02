// Chatbot Service for handling advanced interactions and external resources

class ChatbotService {
    constructor() {
        this.conversationHistory = [];
        this.userPreferences = {};
        this.supportTickets = [];
    }

    // Enhanced response generation with context awareness
    generateResponse(userInput, context = {}) {
        const input = userInput.toLowerCase().trim();
        
        // Store conversation for context
        this.conversationHistory.push({
            user: userInput,
            timestamp: new Date(),
            context
        });

        // Check for specific patterns and provide contextual responses
        if (this.isGreeting(input)) {
            return this.getGreetingResponse(context);
        }

        if (this.isProductQuery(input)) {
            return this.getProductResponse(input, context);
        }

        if (this.isOrderQuery(input)) {
            return this.getOrderResponse(input, context);
        }

        if (this.isTechnicalIssue(input)) {
            return this.getTechnicalResponse(input, context);
        }

        if (this.isPaymentQuery(input)) {
            return this.getPaymentResponse(input, context);
        }

        // Default fallback
        return this.getFallbackResponse(input);
    }

    // Greeting detection and response
    isGreeting(input) {
        const greetings = ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'sup', 'yo'];
        return greetings.some(greeting => input.includes(greeting));
    }

    getGreetingResponse(context) {
        const timeOfDay = new Date().getHours();
        let timeGreeting = '';
        
        if (timeOfDay < 12) timeGreeting = 'Good morning';
        else if (timeOfDay < 17) timeGreeting = 'Good afternoon';
        else timeGreeting = 'Good evening';

        const responses = [
            `${timeGreeting}! Welcome to কিনবা? E-Shop! I'm your AI shopping assistant. How can I help you today? 🛒`,
            `${timeGreeting}! I'm here to make your shopping experience amazing. What would you like to know? ✨`,
            `${timeGreeting}! Ready to help you find the best deals and products. What can I assist you with? 🎯`
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Product query detection and response
    isProductQuery(input) {
        const productKeywords = ['product', 'item', 'goods', 'sell', 'catalog', 'available', 'price', 'cost'];
        return productKeywords.some(keyword => input.includes(keyword));
    }

    getProductResponse(input, context) {
        // Check if user is asking about specific categories
        if (input.includes('electronics') || input.includes('headphone') || input.includes('watch')) {
            return `🎧 Electronics Collection:\n\n• Wireless Bluetooth Headphones - $89.99\n• Smart Fitness Watch - $199.99\n• Phone Stand - $15.99\n\nAll electronics come with 1-year warranty and free shipping!`;
        }

        if (input.includes('accessory') || input.includes('laptop') || input.includes('mouse')) {
            return `💻 Accessories Collection:\n\n• Laptop Stand - $49.99\n• Wireless Mouse - $29.99\n• Phone Stand - $15.99\n\nPerfect for your workspace setup!`;
        }

        if (input.includes('home') || input.includes('coffee') || input.includes('mug')) {
            return `☕ Home & Living:\n\n• Coffee Mug Set - $19.99\n• Phone Stand - $15.99\n\nAdd comfort to your daily routine!`;
        }

        return `🛍️ Our Product Categories:\n\n🎧 Electronics: Headphones, Smart Watches\n💻 Accessories: Laptop Stands, Wireless Mice\n☕ Home & Living: Coffee Mugs, Phone Stands\n\nAll products are quality-tested and come with our satisfaction guarantee!`;
    }

    // Order query detection and response
    isOrderQuery(input) {
        const orderKeywords = ['order', 'track', 'delivery', 'shipping', 'when', 'status', 'arrive'];
        return orderKeywords.some(keyword => input.includes(keyword));
    }

    getOrderResponse(input, context) {
        if (input.includes('track') || input.includes('status')) {
            return `📦 Order Tracking:\n\n• Real-time status updates\n• SMS & Email notifications\n• Estimated delivery times\n• Live tracking map\n\nVisit the Orders page to track your specific order!`;
        }

        if (input.includes('delivery') || input.includes('shipping')) {
            return `🚚 Delivery Information:\n\n• Standard: 3-5 business days\n• Express: 1-2 business days\n• Free shipping on orders over $100\n• Real-time tracking updates\n• Multiple delivery options available`;
        }

        return `📦 Order & Delivery:\n\n• Easy order placement\n• Multiple payment options\n• Secure checkout process\n• Real-time tracking\n• 30-day return policy\n\nNeed help with a specific order?`;
    }

    // Technical issue detection and response
    isTechnicalIssue(input) {
        const technicalKeywords = ['error', 'problem', 'issue', 'broken', 'not working', 'bug', 'glitch'];
        return technicalKeywords.some(keyword => input.includes(keyword));
    }

    getTechnicalResponse(input, context) {
        return `🔧 Technical Support:\n\n• Clear browser cache and cookies\n• Try a different browser\n• Check your internet connection\n• Disable browser extensions\n\nIf the issue persists, our support team is available 24/7:\n📧 support@kinba.com\n📞 1-800-KINBA-ES`;
    }

    // Payment query detection and response
    isPaymentQuery(input) {
        const paymentKeywords = ['payment', 'pay', 'credit', 'debit', 'cash', 'wallet', 'transfer'];
        return paymentKeywords.some(keyword => input.includes(keyword));
    }

    getPaymentResponse(input, context) {
        return `💳 Payment Options:\n\n• Credit/Debit Cards (Visa, MasterCard, Amex)\n• Digital Wallets (PayPal, Apple Pay, Google Pay)\n• Bank Transfers\n• Cash on Delivery\n• EMI Options (3, 6, 12 months)\n\nAll payments are encrypted and secure!`;
    }

    // Fallback response for unrecognized queries
    getFallbackResponse(input) {
        const fallbacks = [
            `I'm not sure I understand "${input}". Could you rephrase that? 🤔`,
            `That's an interesting question! I'm still learning. Try asking about:\n• Products and catalog\n• Orders and tracking\n• Payment methods\n• Discount codes\n• Return policies`,
            `I didn't catch that. Let me help you better - try asking "help" to see what I can assist with! 📚`,
            `That's beyond my current knowledge. Our human support team would be happy to help:\n📧 support@kinba.com\n📞 1-800-KINBA-ES`
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // Get conversation context
    getConversationContext() {
        if (this.conversationHistory.length === 0) return {};

        const recentMessages = this.conversationHistory.slice(-5);
        const context = {
            recentTopics: [],
            userMood: 'neutral',
            preferredCategories: [],
            lastQuery: ''
        };

        // Analyze recent conversation
        recentMessages.forEach(msg => {
            if (msg.user) {
                context.lastQuery = msg.user;
                
                // Detect product preferences
                if (msg.user.includes('electronics') || msg.user.includes('headphone')) {
                    context.preferredCategories.push('electronics');
                }
                if (msg.user.includes('accessory') || msg.user.includes('laptop')) {
                    context.preferredCategories.push('accessories');
                }
            }
        });

        return context;
    }

    // Store user preferences
    setUserPreference(key, value) {
        this.userPreferences[key] = value;
        localStorage.setItem('chatbotPreferences', JSON.stringify(this.userPreferences));
    }

    // Get user preferences
    getUserPreferences() {
        const stored = localStorage.getItem('chatbotPreferences');
        if (stored) {
            this.userPreferences = JSON.parse(stored);
        }
        return this.userPreferences;
    }

    // Create support ticket
    createSupportTicket(issue, userEmail = '') {
        const ticket = {
            id: 'TICKET-' + Date.now(),
            issue,
            userEmail,
            status: 'open',
            createdAt: new Date(),
            priority: this.assessPriority(issue)
        };

        this.supportTickets.push(ticket);
        return ticket;
    }

    // Assess ticket priority
    assessPriority(issue) {
        const urgentKeywords = ['urgent', 'critical', 'broken', 'not working', 'error'];
        const highKeywords = ['important', 'need help', 'problem', 'issue'];
        
        if (urgentKeywords.some(keyword => issue.toLowerCase().includes(keyword))) {
            return 'high';
        } else if (highKeywords.some(keyword => issue.toLowerCase().includes(keyword))) {
            return 'medium';
        }
        return 'low';
    }

    // Get helpful resources based on query
    getResources(query) {
        const resources = {
            'products': [
                { title: 'Product Catalog', url: '/cart', description: 'Browse all available products' },
                { title: 'Product Reviews', url: '/reviews', description: 'Read customer reviews' }
            ],
            'orders': [
                { title: 'Order Tracking', url: '/orders', description: 'Track your order status' },
                { title: 'Order History', url: '/orders', description: 'View past orders' }
            ],
            'support': [
                { title: 'Help Center', url: '/help', description: 'Comprehensive help articles' },
                { title: 'Contact Support', url: '/contact', description: 'Get in touch with our team' }
            ]
        };

        const queryLower = query.toLowerCase();
        for (const [category, resourceList] of Object.entries(resources)) {
            if (queryLower.includes(category)) {
                return resourceList;
            }
        }

        return [];
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
        return 'Conversation history cleared! Starting fresh. 🆕';
    }

    // Get conversation statistics
    getStats() {
        return {
            totalMessages: this.conversationHistory.length,
            userMessages: this.conversationHistory.filter(msg => msg.user).length,
            botMessages: this.conversationHistory.filter(msg => !msg.user).length,
            sessionDuration: this.conversationHistory.length > 0 ? 
                new Date() - this.conversationHistory[0].timestamp : 0
        };
    }
}

export default new ChatbotService();
