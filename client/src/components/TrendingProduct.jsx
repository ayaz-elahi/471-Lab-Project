import React, { useEffect, useState } from 'react';
import { getTrendingProduct } from '../services/api';
import ProductCard from './ProductCard';

export default function TrendingProduct() {
  const [products, setProducts] = useState([]); // state is always an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const productsArray = await getTrendingProduct(); // api.js already ensures array
        console.log('Trending products:', productsArray);
        setProducts(productsArray);
      } catch (err) {
        console.error('Error loading trending products:', err);
        setProducts([]); // fallback to empty array
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading trending products...</div>;
  if (products.length === 0) return <div>No trending product available</div>;

  return (
    <div style={{ marginBottom: 30 }}>
      <h2 style={{ marginBottom: 10 }}>🔥 Trending Products</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        maxWidth: 1000
      }}>
        {products.map((p) => (
          <div key={p._id} style={{ maxWidth: 300 }}>
            <ProductCard p={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
