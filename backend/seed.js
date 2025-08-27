require('dotenv').config();
const connectDB = require('./config/db');
const Category = require('./models/Category');
const Product = require('./models/Product');

async function seedData() {
  try {
    await connectDB();
    await Category.deleteMany({});
    await Product.deleteMany({});

    const electronics = await Category.create({ name: 'Electronics' });
    const phones = await Category.create({ name: 'Phones', parent: electronics._id });
    const laptops = await Category.create({ name: 'Laptops', parent: electronics._id });
    const accessories = await Category.create({ name: 'Accessories', parent: electronics._id });

await Product.create({
  name: 'Nothing Phone 3',
  description: 'A simple smartphone for calls, texts and light apps.',
  price: 649.99,
  category: phones._id,
  image: 'https://cdn.sanity.io/images/gtd4w1cq/production/4ef2af4fc4259cb398efe107002fca5355159f73-4096x2305.jpg?auto=format',
  salesCount: 50
});

await Product.create({
  name: 'Nothing Phone 2',
  description: 'A simple smartphone for calls, texts and light apps.',
  price: 649.99,
  category: phones._id,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKRgY4VUMQ5l543ib3UHI-YHvkq_kcvWNSQ&s',
  salesCount: 45
});

await Product.create({
  name: 'HP Work Laptop',
  description: 'Lightweight laptop for study and office work.',
  price: 599.99,
  category: laptops._id,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfO1PaUILEwirYsl1wJK2l89Tfz0fSyDlfg&s',
  salesCount: 120
});

await Product.create({
  name: 'Asus ROG Laptop',
  description: 'Lightweight laptop for study and office work.',
  price: 599.99,
  category: laptops._id,
  image: 'https://computermania.com.bd/wp-content/uploads/2025/01/Asus-ROG-Strix-6-7.jpg',
  salesCount: 120
});

await Product.create({
  name: 'UGREEN USB-C Cable',
  description: 'Fast charging cable.',
  price: 9.99,
  category: accessories._id,
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCeqBp9rI29fQkM_MROiTJVirlCUNbhF0AQ&s',
  salesCount: 80
});
    console.log('✅ Seed complete');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedData();