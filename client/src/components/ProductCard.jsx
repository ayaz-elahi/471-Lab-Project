import React from 'react';

export default function ProductCard({ p }) {
  const img = p.image && p.image.length ? p.image : 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 6 }}>
      <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={img} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
      </div>
      <h4 style={{ margin: '10px 0 6px' }}>{p.name}</h4>
      <div style={{ color: '#555', fontSize: 14 }}>{p.description}</div>
      <div style={{ marginTop: 8, fontWeight: 'bold' }}>${Number(p.price).toFixed(2)}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: '#666' }}>{p.category ? p.category.name : ''}</div>
    </div>
  );
}
