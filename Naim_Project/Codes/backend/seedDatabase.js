require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Order = require('./models/Order');
const Discount = require('./models/Discount');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected for seeding'))
.catch((err) => console.error('MongoDB connection error:', err));

// Sample products data
const products = [
    {
        name: 'Wireless Bluetooth Headphones',
        price: 89.99,
        description: 'High-quality wireless headphones with noise cancellation',
        image: '🎧',
        category: 'Electronics',
        inStock: true
    },
    {
        name: 'Smart Fitness Watch',
        price: 199.99,
        description: 'Advanced fitness tracking with heart rate monitor',
        image: '⌚',
        category: 'Electronics',
        inStock: true
    },
    {
        name: 'Laptop Stand',
        price: 49.99,
        description: 'Adjustable aluminum laptop stand for ergonomic setup',
        image: '💻',
        category: 'Accessories',
        inStock: true
    },
    {
        name: 'Coffee Mug Set',
        price: 19.99,
        description: 'Ceramic coffee mugs with beautiful design',
        image: '☕',
        category: 'Home',
        inStock: true
    },
    {
        name: 'Wireless Mouse',
        price: 29.99,
        description: 'Ergonomic wireless mouse with precision tracking',
        image: '🖱️',
        category: 'Accessories',
        inStock: true
    },
    {
        name: 'Phone Stand',
        price: 15.99,
        description: 'Adjustable phone stand for desk or bedside',
        image: '📱',
        category: 'Accessories',
        inStock: true
    }
];

// Sample user data
const users = [
    {
        _id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
        username: 'demo_user',
        email: 'demo@kinba.com',
        name: 'Demo User'
    }
];

// Sample discount coupons
const discounts = [
    {
        code: 'WELCOME20',
        value: 20,
        type: 'percentage',
        minPurchase: 50,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: true,
        usageLimit: 100,
        usedCount: 0
    },
    {
        code: 'SAVE10',
        value: 10,
        type: 'percentage',
        minPurchase: 30,
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
        isActive: true,
        usageLimit: 200,
        usedCount: 0
    },
    {
        code: 'FREESHIP',
        value: 0,
        type: 'shipping',
        minPurchase: 100,
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
        isActive: true,
        usageLimit: 50,
        usedCount: 0
    }
];

// Sample cart data
const carts = [
    {
        user: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
        items: [
            {
                productId: '1',
                quantity: 2,
                price: 89.99
            },
            {
                productId: '3',
                quantity: 1,
                price: 49.99
            }
        ],
        total: 229.97
    }
];

// Sample orders data
const orders = [
    {
        user: new mongoose.Types.ObjectId('507f1f77bcf86cd799439011'),
        orderNumber: 'KINBA123456',
        items: [
            {
                productId: '1',
                quantity: 1,
                price: 89.99
            },
            {
                productId: '2',
                quantity: 1,
                price: 199.99
            }
        ],
        totalAmount: 289.98,
        currentStatus: 'Delivered',
        statusHistory: [
            {
                status: 'Pending',
                message: 'Order placed successfully',
                timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
            },
            {
                status: 'Confirmed',
                message: 'Order confirmed and processing',
                timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) // 6 days ago
            },
            {
                status: 'Shipped',
                message: 'Order shipped via express delivery',
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
            },
            {
                status: 'Delivered',
                message: 'Order delivered successfully',
                timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) // 4 days ago
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
        estimatedDelivery: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        actualDelivery: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    }
];

// Function to seed the database
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');
        
        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});
        await Cart.deleteMany({});
        await Order.deleteMany({});
        await Discount.deleteMany({});
        
        console.log('🧹 Cleared existing data');
        
        // Insert products
        const createdProducts = await Product.insertMany(products);
        console.log(`✅ Created ${createdProducts.length} products`);
        
        // Insert users
        const createdUsers = await User.insertMany(users);
        console.log(`✅ Created ${createdUsers.length} users`);
        
        // Insert discounts
        const createdDiscounts = await Discount.insertMany(discounts);
        console.log(`✅ Created ${createdDiscounts.length} discount coupons`);
        
        // Insert carts
        const createdCarts = await Cart.insertMany(carts);
        console.log(`✅ Created ${createdCarts.length} carts`);
        
        // Insert orders
        const createdOrders = await Order.insertMany(orders);
        console.log(`✅ Created ${createdOrders.length} orders`);
        
        console.log('🎉 Database seeding completed successfully!');
        console.log('\n📊 Database Summary:');
        console.log(`   Products: ${createdProducts.length}`);
        console.log(`   Users: ${createdUsers.length}`);
        console.log(`   Discounts: ${createdDiscounts.length}`);
        console.log(`   Carts: ${createdCarts.length}`);
        console.log(`   Orders: ${createdOrders.length}`);
        
        // Display sample data
        console.log('\n🛍️ Sample Products:');
        createdProducts.forEach(product => {
            console.log(`   ${product.image} ${product.name} - $${product.price}`);
        });
        
        console.log('\n🎫 Available Discount Codes:');
        createdDiscounts.forEach(discount => {
            console.log(`   ${discount.code} - ${discount.value}${discount.type === 'percentage' ? '%' : ' off shipping'}`);
        });
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('🔌 Database connection closed');
    }
};

// Run the seeding
seedDatabase();
