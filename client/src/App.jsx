import React, { useEffect, useState } from 'react';
import { getCategories, getProducts } from './services/api';
import CategoryList from './components/CategoryList';
import ProductList from './components/ProductList';
import TrendingProduct from './components/TrendingProduct';
import './App.css';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (e) {
        console.error('Failed to load categories', e);
      }
    })();
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  async function fetchProducts(categoryId = null) {
    setLoading(true);
    try {
      const prods = await getProducts(categoryId);
      setProducts(prods);
    } catch (e) {
      console.error('Failed to load products', e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <aside style={{ width: 260, padding: 20, borderRight: '1px solid #eee' }}>
        <h3>Categories</h3>
        <button onClick={() => setSelectedCategory(null)} style={{ marginBottom: 8 }}>
          All Products
        </button>
        <CategoryList categories={categories} onSelect={setSelectedCategory} selectedId={selectedCategory} />
      </aside>

      <main style={{ flex: 1, padding: 20 }}>
        <TrendingProduct />   {/* 🔥 NEW */}
        <h2>Product Catalog</h2>
        {selectedCategory && <div style={{ marginBottom: 12 }}>Filtered by category id: {selectedCategory}</div>}
        {loading ? <div>Loading products...</div> : <ProductList products={products} />}
      </main>
    </div>
  );
}
