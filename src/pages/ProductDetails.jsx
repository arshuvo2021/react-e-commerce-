import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Details (ID: {id})</h1>
      {/* Here you can later fetch product data by ID and display it */}
      <p>Product details will go here.</p>
    </div>
  );
};

export default ProductDetails;
