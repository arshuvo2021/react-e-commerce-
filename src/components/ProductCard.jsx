// src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Import the Cart context

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();  // Get the addToCart function from context

  const handleAddToCart = () => {
    addToCart(product);  // Call the addToCart function when the button is clicked
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
      <p className="text-lg font-bold text-blue-600 mb-4">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
      <Link
        to={`/product/${product.id}`}
        className="block bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition mt-2"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
