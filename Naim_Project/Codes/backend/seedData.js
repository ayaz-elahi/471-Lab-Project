require('dotenv').config();
const mongoose = require('mongoose');
const Discount = require('./models/Discount');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch((err) => console.error('MongoDB connection error:', err));

const demoDiscounts = [
  {
    code: 'SAVE10',
    value: 10,
    type: 'percentage',
    minPurchase: 50,
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    isActive: true,
    usageLimit: 100
  },
  {
    code: 'SAVE20',
    value: 20,
    type: 'percentage',
    minPurchase: 100,
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    isActive: true,
    usageLimit: 50
  },
  {
    code: 'SAVE50',
    value: 50,
    type: 'percentage',
    minPurchase: 200,
    validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
    isActive: true,
    usageLimit: 10
  }
];

const seedDiscounts = async () => {
  try {
    // Clear existing discounts
    await Discount.deleteMany({});
    console.log('Cleared existing discounts');

    // Insert demo discounts
    await Discount.insertMany(demoDiscounts);
    console.log('Demo discounts seeded successfully');

    // Display seeded data
    const discounts = await Discount.find({});
    console.log('Seeded discounts:', discounts.map(d => ({ code: d.code, value: d.value })));

    mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
  }
};

// Run the seeding
seedDiscounts();
