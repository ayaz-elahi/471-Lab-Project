import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      Loading product details...
    </div>
  );

  if (error) return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <p style={{ color: 'red' }}>{error}</p>
      <button onClick={() => navigate('/')} style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Back to Home
      </button>
    </div>
  );

  if (!product) return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      Product not found
      <br />
      <button onClick={() => navigate('/')} style={{
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        Back to Home
      </button>
    </div>
  );

  const img = product.image && product.image.length 
    ? product.image 
    : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Navigation */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => navigate('/')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← Back to Products
        </button>
      </div>

      {/* Product Detail Content */}
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Product Image */}
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '500px' }}>
          <img 
            src={img} 
            alt={product.name}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}
          />
        </div>

        {/* Product Information */}
        <div style={{ flex: '1', minWidth: '300px' }}>
          <h1 style={{ 
            margin: '0 0 16px', 
            fontSize: '32px', 
            color: '#333',
            fontWeight: 'bold'
          }}>
            {product.name}
          </h1>

          <div style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: '#28a745',
            marginBottom: '20px'
          }}>
            ${Number(product.price).toFixed(2)}
          </div>

          {product.category && (
            <div style={{ 
              marginBottom: '20px',
              padding: '8px 12px',
              backgroundColor: '#e9ecef',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: '14px',
              color: '#495057'
            }}>
              Category: {product.category.name}
            </div>
          )}

          {product.salesCount > 0 && (
            <div style={{ 
              marginBottom: '20px',
              fontSize: '14px',
              color: '#6c757d'
            }}>
              {product.salesCount} sold
            </div>
          )}

          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '18px', color: '#333' }}>
              Description
            </h3>
            <p style={{ 
              lineHeight: '1.6', 
              color: '#555',
              fontSize: '16px',
              margin: '0'
            }}>
              {product.description || 'No description available.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              flex: 1
            }}>
              Add to Cart
            </button>
            <button style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              flex: 1
            }}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Additional Product Info */}
      <div style={{ 
        marginTop: '40px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', color: '#333' }}>
          Product Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <strong>Product ID:</strong> {product._id}
          </div>
          <div>
            <strong>Category:</strong> {product.category ? product.category.name : 'Uncategorized'}
          </div>
          <div>
            <strong>Added:</strong> {new Date(product.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Sales:</strong> {product.salesCount} units sold
          </div>
        </div>
      </div>
    </div>
  );
}