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

    // PROMOTIONAL PRODUCTS (for banner)
    await Product.create({
      name: 'Nothing Phone 3',
      description: 'Latest flagship with transparent design and Glyph interface.',
      price: 649.99,
      category: phones._id,
      image: 'https://cdn.sanity.io/images/gtd4w1cq/production/4ef2af4fc4259cb398efe107002fca5355159f73-4096x2305.jpg?auto=format',
      salesCount: 50,
      isPromotional: true
    });

    await Product.create({
      name: 'HP Work Laptop',
      description: 'Professional laptop with powerful performance for work and creativity.',
      price: 899.99,
      category: laptops._id,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfO1PaUILEwirYsl1wJK2l89Tfz0fSyDlfg&s',
      salesCount: 120,
      isPromotional: true
    });

    await Product.create({
      name: 'Asus ROG Laptop',
      description: 'Gaming powerhouse with RGB lighting and high-performance graphics.',
      price: 1299.99,
      category: laptops._id,
      image: 'https://computermania.com.bd/wp-content/uploads/2025/01/Asus-ROG-Strix-6-7.jpg',
      salesCount: 85,
      isPromotional: true
    });

    await Product.create({
      name: 'UGREEN USB-C Cable',
      description: 'Premium fast charging cable with durable braided design.',
      price: 19.99,
      category: accessories._id,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCeqBp9rI29fQkM_MROiTJVirlCUNbhF0AQ&s',
      salesCount: 200,
      isPromotional: true
    });

    await Product.create({
      name: 'Nothing Phone 2',
      description: 'Mid-range innovation with unique design and smooth performance.',
      price: 449.99,
      category: phones._id,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKRgY4VUMQ5l543ib3UHI-YHvkq_kcvWNSQ&s',
      salesCount: 75,
      isPromotional: true
    });

    // REGULAR PRODUCTS (not promotional)
    await Product.create({
      name: 'Samsung Galaxy S21 Ultra',
      description: 'Reliable Android smartphone with great camera.',
      price: 599.99,
      category: phones._id,
      image: 'https://images.samsung.com/is/image/samsung/p6pim/bd/sm-g998bzkgbkd/gallery/bd-galaxy-s21-ultra-5g-g988-sm-g998bzkgbkd-456285816?$624_624_PNG$',
      salesCount: 45
    });

    await Product.create({
      name: 'Apple iPhone 14 Pro Max',
      description: 'Premium iOS experience with advanced features.',
      price: 999.99,
      category: phones._id,
      image: 'https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111846_sp875-sp876-iphone14-pro-promax.png',
      salesCount: 30
    });

    await Product.create({
      name: 'Dell Inspiron 14 5410 Core i5 Silver Laptop',
      description: 'Affordable laptop for everyday computing needs.',
      price: 549.99,
      category: laptops._id,
      image: 'https://www.ryans.com/storage/products/main/dell-inspiron-14-5410-intel-core-i5-1135g7-14-11639202545.webp',
      salesCount: 60
    });

    await Product.create({
      name: 'Logitech G PRO X SUPERLIGHT Wireless Gaming Mouse',
      description: 'Ergonomic wireless mouse for comfortable computing.',
      price: 25.99,
      category: accessories._id,
      image: 'https://www.ultratech.com.bd/image/cache/2021/12/Logitech-G-PRO-X-Mouse-1-500x500.jpg',
      salesCount: 150
    });

    await Product.create({
      name: 'Beats Fit Pro True Wireless Earbuds',
      description: 'Premium wireless headphones with noise cancellation.',
      price: 129.99,
      category: accessories._id,
      image: 'https://gadgetnmusic.com/wp-content/uploads/2023/10/Beats-Fit-Pro-True-Wireless-Earbuds-7.jpg',
      salesCount: 90
    });

    console.log('✅ Seed complete with promotional and regular products');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seedData();