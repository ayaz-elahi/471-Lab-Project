import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ p }) {
  const navigate = useNavigate();
  const img = p.image && p.image.length ? p.image : 'https://via.placeholder.com/300x200?text=No+Image';

  const handleCardClick = () => {
    navigate(`/product/${p._id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      style={{ 
        border: '1px solid #ddd', 
        padding: 12, 
        borderRadius: 6,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        backgroundColor: 'white'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <img src={img} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
      </div>
      <h4 style={{ margin: '10px 0 6px' }}>{p.name}</h4>
      <div style={{ color: '#555', fontSize: 14 }}>{p.description}</div>
      <div style={{ marginTop: 8, fontWeight: 'bold' }}>${Number(p.price).toFixed(2)}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: '#666' }}>{p.category ? p.category.name : ''}</div>
      {p.salesCount > 0 && (
        <div style={{ marginTop: 4, fontSize: 11, color: '#28a745' }}>
          {p.salesCount} sold
        </div>
      )}
    </div>
  );
}