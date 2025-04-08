import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();  // Extracting product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the product details from the Fake Store API
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load product details');
        setLoading(false);
      });
  }, [id]);  // Fetch product details whenever the id changes

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">{product.title}</h1>
      <div className="flex gap-8">
      <img
  src={product.image}
  alt={product.title}
  className="w-1/2 h-auto object-cover rounded-lg mb-4 mx-auto"
/>

        <div className="flex-1">
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
          {/* Add functionality to add to cart here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
