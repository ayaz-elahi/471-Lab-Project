import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPromotionalProducts } from '../services/api';

export default function PromotionalBanner() {
  const [promotionalProducts, setPromotionalProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const products = await getPromotionalProducts();
        setPromotionalProducts(products);
      } catch (err) {
        console.error('Error loading promotional products:', err);
        setPromotionalProducts([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleBannerClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return (
      <div style={{
        height: '200px',
        backgroundColor: '#f8f9fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        Loading promotional banners...
      </div>
    );
  }

  if (promotionalProducts.length === 0) {
    return null; // Don't show banner if no promotional products
  }

  return (
    <div style={{
      height: '200px',
      display: 'flex',
      overflow: 'hidden',
      backgroundColor: '#f8f9fa',
      borderBottom: '2px solid #e9ecef'
    }}>
      {promotionalProducts.slice(0, 5).map((product, index) => (
        <div
          key={product._id}
          onClick={() => handleBannerClick(product._id)}
          style={{
            flex: 1,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${product.image || 'https://via.placeholder.com/400x200?text=No+Image'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
            position: 'relative',
            transition: 'transform 0.3s ease',
            borderRight: index < Math.min(promotionalProducts.length - 1, 4) ? '1px solid #fff' : 'none'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            color: 'white',
            padding: '20px 15px 15px',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 5px', fontSize: '16px', fontWeight: 'bold' }}>
              {product.name}
            </h3>
            <p style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: '#ffd700' }}>
              ${Number(product.price).toFixed(2)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}