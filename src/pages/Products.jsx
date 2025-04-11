import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Products = () => {
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
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            Our Products
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No products available</h3>
            <p className="mt-2 text-sm text-gray-500">
              Check back later for our amazing products.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl mb-8">Products</h1>
      <div className="flex flex-wrap gap-6">
        {productList.map((product) => (
          <div
            key={product.id}
            className="w-[250px] border rounded p-4 flex flex-col"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <div className="h-[200px] mb-4 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <h2 className="text-base mb-2">{product.name}</h2>
            <p className="text-xl font-bold mb-4">${product.price}</p>
            <div className="mt-auto flex gap-2">
              <Link
                to={`/product/${product.id}`}
                className="flex-1 text-center py-2 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                View
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="flex-1 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
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

export default Products; 