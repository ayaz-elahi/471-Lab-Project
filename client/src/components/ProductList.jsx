import React from 'react';
import ProductCard from './ProductCard';

export default function ProductList({ products = [] }) {
  if (!products || products.length === 0) return <div>No products found.</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
      {products.map(p => <ProductCard key={p._id} p={p} />)}
    </div>
  );
}
