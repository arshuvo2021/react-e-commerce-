import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Import axios for making API requests
import { useCart } from '../context/CartContext'; // Import the useCart hook from context

const Home = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error handling
  const { addToCart } = useCart();  // Extract addToCart from context

  useEffect(() => {
    // Fetch products from Fake Store API
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProductList(response.data);  // Update state with fetched products
        setLoading(false);  // Set loading to false when products are loaded
      })
      .catch((err) => {
        setError('Failed to load products');  // Handle error
        setLoading(false);  // Set loading to false on error
      });
  }, []);

  // Show loading or error state if fetching products
  if (loading) return <div className="text-center p-8">Loading products...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🛒 Welcome to React E-Commerce</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productList.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div className="w-full h-56 overflow-hidden mb-4 relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold mb-1">{product.title}</h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            <p className="text-lg font-bold text-blue-600 mb-4">${product.price}</p>
            <button
              onClick={() => addToCart(product)}  // Add product to cart on click
              className="block bg-green-600 text-white text-center py-2 rounded-lg hover:bg-green-700 transition"
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
        ))}
      </div>
    </div>
  );
};

export default Home;
