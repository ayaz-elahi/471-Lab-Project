# Backend - E-commerce API

This is the backend API for the e-commerce application built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/your_database
   PORT=5001
   NODE_ENV=development
   ```

3. Start the server:
   ```bash
   npm start          # Production
   npm run dev        # Development with nodemon
   ```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove item from cart

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status

### Discounts
- `GET /api/discount` - Get available discounts
- `POST /api/discount/apply` - Apply discount code

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/add` - Add item to wishlist
- `DELETE /api/wishlist/remove/:id` - Remove item from wishlist

## Database Models

- **Product**: Name, price, description, image, category, stock
- **User**: Username, email, name, role
- **Cart**: User ID, items array, total amount
- **Order**: User ID, items, status, tracking, delivery info
- **Discount**: Code, value, type, restrictions, validity
- **Wishlist**: User ID, products array

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment variable management
- **nodemon**: Development server (dev dependency)
