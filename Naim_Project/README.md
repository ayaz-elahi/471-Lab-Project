# কিনবা? (Kinba?) E-Shop

A modern, full-stack e-commerce application built with React, Node.js, Express, and MongoDB, featuring an intelligent AI chatbot assistant.

## 🌟 Features

### 🛍️ Core E-Shop Features
- **Smart Shopping Cart**: Add, remove, and manage products with real-time calculations
- **Discount Coupons**: Apply multiple discount codes with instant savings
- **Order Tracking**: Real-time order status updates with timeline visualization
- **Bengali Branding**: Unique "কিনবা?" branding with cultural elements

### 🤖 AI Chatbot Assistant
- **Intelligent Responses**: Context-aware conversations using advanced pattern matching
- **Quick Actions**: One-click access to common queries and support topics
- **Product Information**: Detailed product catalog and pricing information
- **Order Support**: Help with tracking, delivery, and order management
- **Payment Guidance**: Information about payment methods and security
- **Technical Support**: Troubleshooting and issue resolution
- **24/7 Availability**: Always-on customer support assistance

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful glass-like interface elements
- **Responsive Layout**: Mobile-first design for all devices
- **Smooth Animations**: CSS animations and transitions
- **Dark Mode Support**: Automatic theme detection and support

## 🚀 Tech Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing and navigation
- **CSS3**: Advanced styling with gradients, animations, and responsive design
- **Axios**: HTTP client for API communication

### Backend
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database with Mongoose ODM
- **RESTful API**: Clean, structured API endpoints

### AI & Services
- **Pattern Matching**: Intelligent response generation
- **Context Awareness**: Conversation memory and user preference tracking
- **Local Storage**: Persistent user preferences and settings
- **Support Ticket System**: Automated issue tracking and prioritization

## 📁 Project Structure

```
KInba/
├── Codes/
│   ├── backend/
│   │   ├── controllers/          # API controllers
│   │   ├── models/              # Database schemas
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── server.js            # Main server file
│   │   └── seedDatabase.js      # Database seeding
│   └── frontend/
│       ├── src/
│       │   ├── components/      # React components
│       │   │   ├── Cart/        # Shopping cart
│       │   │   ├── Chatbot/     # AI chatbot
│       │   │   ├── DiscountCoupons/ # Discount management
│       │   │   └── OrderStatus/ # Order tracking
│       │   ├── services/        # API services
│       │   │   ├── cartService.js
│       │   │   ├── chatbotService.js
│       │   │   ├── orderService.js
│       │   │   └── discountService.js
│       │   └── App.js           # Main application
│       └── public/              # Static assets
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd KInba
   ```

2. **Backend Setup**
   ```bash
   cd Codes/backend
   npm install
   cp .env.example .env  # Create environment file
   # Edit .env with your MongoDB URI and port
   npm run seed          # Seed the database
   npm start             # Start backend server
   ```

3. **Frontend Setup**
   ```bash
   cd Codes/frontend
   npm install
   npm start             # Start React development server
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 🤖 Chatbot Features

### Core Capabilities
- **Natural Language Processing**: Understands various ways users phrase questions
- **Context Awareness**: Remembers conversation history and user preferences
- **Quick Actions**: Pre-built buttons for common queries
- **Real-time Responses**: Instant answers with typing indicators

### Supported Topics
- **Products**: Catalog information, pricing, categories
- **Orders**: Tracking, delivery, status updates
- **Cart**: Management, features, troubleshooting
- **Discounts**: Available codes, usage, restrictions
- **Payment**: Methods, security, options
- **Returns**: Policy, process, support
- **Technical Support**: Issues, troubleshooting, contact

### Quick Actions
- 🛍️ Products - Browse catalog and get product info
- 🎫 Discounts - View available discount codes
- 📦 Orders - Track orders and delivery
- 🛒 Cart Help - Shopping cart assistance
- 💳 Payment - Payment method information
- 🔄 Returns - Return policy and process
- 🔧 Support - Technical issue resolution
- 📚 Help - General assistance and guidance

## 📡 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status

### Discounts
- `GET /api/discount` - Get available discounts
- `POST /api/discount/apply` - Apply discount code

## 🗄️ Database Schema

### Products
- Name, price, description, image, category, stock status

### Users
- Username, email, name, role, preferences

### Cart
- User ID, items array, total amount

### Orders
- User ID, items, status, tracking, delivery info

### Discounts
- Code, value, type, restrictions, validity

## 🎯 Chatbot Intelligence

### Pattern Recognition
- **Exact Matches**: Direct keyword matching
- **Partial Matches**: Fuzzy matching for similar queries
- **Context Analysis**: Understanding conversation flow
- **Intent Detection**: Identifying user goals

### Response Generation
- **Dynamic Content**: Time-aware greetings and responses
- **Personalization**: User preference tracking
- **Resource Links**: Directing users to relevant pages
- **Fallback Handling**: Graceful handling of unknown queries

### User Experience
- **Typing Indicators**: Realistic conversation simulation
- **Quick Actions**: One-click access to common needs
- **Conversation History**: Persistent chat memory
- **Responsive Design**: Mobile-optimized interface

## 🔧 Configuration

### Environment Variables
```env
MONGO_URI=mongodb://localhost:27017/kinba_eshop
PORT=5001
NODE_ENV=development
```

### Chatbot Settings
- **Response Delay**: Configurable typing simulation
- **Context Memory**: Adjustable conversation history length
- **Quick Actions**: Customizable action buttons
- **Fallback Responses**: Configurable default messages

## 🚀 Deployment

### Backend Deployment
```bash
npm run build
npm start
```

### Frontend Deployment
```bash
npm run build
# Deploy build folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

- **Email**: support@kinba.com
- **Phone**: 1-800-KINBA-ES
- **Live Chat**: Available via the chatbot
- **Documentation**: Check the README and code comments

## 🔮 Future Enhancements

- **Machine Learning**: Advanced NLP and response generation
- **Voice Integration**: Speech-to-text and text-to-speech
- **Multi-language Support**: Bengali and other languages
- **Integration APIs**: Connect with external services
- **Analytics Dashboard**: Chatbot performance metrics
- **Custom Training**: User-specific response customization

---

**Built with ❤️ for the কিনবা? community**
