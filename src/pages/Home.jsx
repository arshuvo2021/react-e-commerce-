import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [productList, setProductList] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const localProducts = localStorage.getItem('productList');
    if (localProducts) {
      setProductList(JSON.parse(localProducts));
    }
  }, []);

  if (!productList.length) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>No products available</div>
        <Link 
          to="/add-product" 
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#000',
            color: '#fff',
            textDecoration: 'none'
          }}
        >
          Add Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Products</h1>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        {productList.map((product) => (
          <div 
            key={product.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
              border: '1px solid #ddd',
              padding: '10px'
            }}
          >
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ 
                width: '100%', 
                height: '150px',
                objectFit: 'cover',
                marginBottom: '10px'
              }} 
            />
            <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{product.name}</div>
            <div style={{ 
              fontSize: '14px', 
              color: '#666',
              marginBottom: '10px',
              height: '40px',
              overflow: 'hidden'
            }}>
              {product.description}
            </div>
            <div style={{ 
              fontWeight: 'bold',
              marginBottom: '10px'
            }}>
              ${product.price}
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link 
                to={`/product/${product.id}`}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#eee',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                View
              </Link>
              <button 
                onClick={() => addToCart(product)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#000',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
