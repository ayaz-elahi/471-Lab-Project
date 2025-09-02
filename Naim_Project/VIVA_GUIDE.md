# 🎓 VIVA PREPARATION GUIDE

## 🚚 ORDER STATUS SYSTEM

### Database Schema
- **Order Model**: user, orderNumber, items, totalAmount, currentStatus, statusHistory
- **Status Flow**: Pending → Confirmed → Processing → Shipped → Out for Delivery → Delivered
- **Auto-generation**: Order numbers like KINBA123456789

### Key Features
- Real-time tracking by order number
- Complete status history with timestamps
- Estimated delivery calculation (7 days)
- Demo progress simulation

### API Endpoints
- POST /api/orders - Create order
- GET /api/orders - Get user orders
- GET /api/orders/number/:orderNumber - Track order
- PUT /api/orders/:id/status - Update status

---

## 🎫 DISCOUNT COUPON SYSTEM

### Database Schema
- **Discount Model**: code, value, type, minPurchase, validUntil, usageLimit, usedCount
- **Types**: percentage, fixed, shipping
- **Validation**: expiration, minimum purchase, usage limits

### Available Coupons
- SAVE10: 10% OFF (Min. $50)
- SAVE20: 20% OFF (Min. $100)
- SAVE50: 50% OFF (Min. $200)

### API Endpoints
- GET /api/discounts - Get active discounts
- POST /api/discounts/apply - Apply coupon

---

## 🔧 TECHNICAL IMPLEMENTATION

### Backend
- Node.js + Express.js + MongoDB
- JWT authentication
- MVC architecture pattern

### Frontend
- React.js with hooks
- Service layer for API calls
- Responsive CSS design

---

## 📊 VIVA QUESTIONS

### Order Status
1. **How are order numbers unique?** Timestamp + random number generation
2. **Status workflow?** Predefined progression with history logging
3. **Handle cancellation?** Add 'Cancelled' status, update inventory

### Discount System
1. **Prevent abuse?** Usage limits, validation, tracking
2. **Multiple coupons?** Currently one per order, can implement priority system
3. **Seasonal discounts?** Use validFrom/validUntil dates

### Architecture
1. **Why MongoDB?** Flexible schema, JSON documents, scalability
2. **Scaling?** Caching, indexing, load balancing, microservices
3. **Security?** JWT, validation, authorization, secure endpoints

---

## 🚀 KEY FEATURES

- Real-time order tracking
- Interactive discount interface
- Bengali language support
- Demo simulation modes
- Comprehensive error handling
- Responsive design

---

## 📚 TECHNOLOGIES

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Frontend**: React.js, CSS3, JavaScript
- **Auth**: JWT tokens
- **Pattern**: MVC, RESTful APIs

