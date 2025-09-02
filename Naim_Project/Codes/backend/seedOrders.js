require('dotenv').config();
const mongoose = require('mongoose');
const Order = require('./models/Order');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB for seeding orders'))
  .catch((err) => console.error('MongoDB connection error:', err));

const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `KINBA${timestamp}${random}`;
};

const demoOrders = [
  {
    orderNumber: generateOrderNumber(),
    user: '507f1f77bcf86cd799439011',
    items: [
      {
        productId: '507f1f77bcf86cd799439012',
        quantity: 2,
        price: 89.99
      },
      {
        productId: '507f1f77bcf86cd799439013',
        quantity: 1,
        price: 199.99
      }
    ],
    totalAmount: 379.97,
    currentStatus: 'Pending',
    statusHistory: [
      {
        status: 'Pending',
        message: 'Order placed successfully'
      }
    ],
    shippingAddress: {
      street: '123 Demo Street',
      city: 'Demo City',
      state: 'Demo State',
      zipCode: '12345',
      country: 'Demo Country'
    },
    paymentMethod: 'Credit Card',
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  {
    orderNumber: generateOrderNumber(),
    user: '507f1f77bcf86cd799439011',
    items: [
      {
        productId: '507f1f77bcf86cd799439014',
        quantity: 1,
        price: 49.99
      }
    ],
    totalAmount: 49.99,
    currentStatus: 'Confirmed',
    statusHistory: [
      {
        status: 'Pending',
        message: 'Order placed successfully'
      },
      {
        status: 'Confirmed',
        message: 'Order confirmed and payment received'
      }
    ],
    shippingAddress: {
      street: '456 Test Avenue',
      city: 'Test City',
      state: 'Test State',
      zipCode: '54321',
      country: 'Test Country'
    },
    paymentMethod: 'PayPal',
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  },
  {
    orderNumber: generateOrderNumber(),
    user: '507f1f77bcf86cd799439011',
    items: [
      {
        productId: '507f1f77bcf86cd799439015',
        quantity: 3,
        price: 19.99
      }
    ],
    totalAmount: 59.97,
    currentStatus: 'Shipped',
    statusHistory: [
      {
        status: 'Pending',
        message: 'Order placed successfully'
      },
      {
        status: 'Confirmed',
        message: 'Order confirmed and payment received'
      },
      {
        status: 'Processing',
        message: 'Order is being processed'
      },
      {
        status: 'Shipped',
        message: 'Order has been shipped'
      }
    ],
    shippingAddress: {
      street: '789 Sample Road',
      city: 'Sample City',
      state: 'Sample State',
      zipCode: '67890',
      country: 'Sample Country'
    },
    paymentMethod: 'Credit Card',
    estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  },
  {
    orderNumber: generateOrderNumber(),
    user: '507f1f77bcf86cd799439011',
    items: [
      {
        productId: '507f1f77bcf86cd799439016',
        quantity: 1,
        price: 299.99
      }
    ],
    totalAmount: 299.99,
    currentStatus: 'Out for Delivery',
    statusHistory: [
      {
        status: 'Pending',
        message: 'Order placed successfully'
      },
      {
        status: 'Confirmed',
        message: 'Order confirmed and payment received'
      },
      {
        status: 'Processing',
        message: 'Order is being processed'
      },
      {
        status: 'Shipped',
        message: 'Order has been shipped'
      },
      {
        status: 'Out for Delivery',
        message: 'Order is out for delivery'
      }
    ],
    shippingAddress: {
      street: '321 Delivery Lane',
      city: 'Delivery City',
      state: 'Delivery State',
      zipCode: '11111',
      country: 'Delivery Country'
    },
    paymentMethod: 'Credit Card',
    estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
  },
  {
    orderNumber: generateOrderNumber(),
    user: '507f1f77bcf86cd799439011',
    items: [
      {
        productId: '507f1f77bcf86cd799439017',
        quantity: 2,
        price: 149.99
      },
      {
        productId: '507f1f77bcf86cd799439018',
        quantity: 1,
        price: 79.99
      }
    ],
    totalAmount: 379.97,
    currentStatus: 'Delivered',
    statusHistory: [
      {
        status: 'Pending',
        message: 'Order placed successfully'
      },
      {
        status: 'Confirmed',
        message: 'Order confirmed and payment received'
      },
      {
        status: 'Processing',
        message: 'Order is being processed'
      },
      {
        status: 'Shipped',
        message: 'Order has been shipped'
      },
      {
        status: 'Out for Delivery',
        message: 'Order is out for delivery'
      },
      {
        status: 'Delivered',
        message: 'Order has been delivered successfully'
      }
    ],
    shippingAddress: {
      street: '654 Completed Street',
      city: 'Completed City',
      state: 'Completed State',
      zipCode: '22222',
      country: 'Completed Country'
    },
    paymentMethod: 'PayPal',
    estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    actualDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

const seedOrders = async () => {
  try {
    // Clear existing orders
    await Order.deleteMany({});
    console.log('Cleared existing orders');

    // Insert demo orders
    await Order.insertMany(demoOrders);
    console.log('Demo orders seeded successfully');

    // Display seeded data
    const orders = await Order.find({});
    console.log('Seeded orders:', orders.map(o => ({ 
      orderNumber: o.orderNumber, 
      status: o.currentStatus,
      total: o.totalAmount 
    })));

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding orders:', error);
    mongoose.connection.close();
  }
};

// Run the seeding
seedOrders();
