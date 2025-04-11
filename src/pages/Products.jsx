import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products.json';

const Products = () => {
  const [productList, setProductList] = useState(products);
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-2 py-3">
          <h1 className="text-lg font-bold text-gray-900">All Products</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-2 py-4">
        {/* Filter Section */}
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-gray-700">
                Showing {productList.length} products
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          {productList.map((product) => (
            <div 
              key={product.id}
              className="group bg-white rounded-sm shadow-sm hover:shadow transition-all duration-300"
            >
              {/* Image Container */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-sm bg-gray-100">
                <div className="relative h-0 pb-[100%]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay with Quick Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-white text-gray-900 px-2 py-0.5 rounded-full text-[8px] font-medium hover:bg-gray-100"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Info Container */}
              <div className="p-1.5">
                {/* Category & Rating */}
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-medium text-blue-600 truncate max-w-[60%]">
                    {product.category}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-[8px]">★</span>
                    <span className="text-[8px] text-gray-600 ml-0.5">{product.rating}</span>
                  </div>
                </div>

                {/* Product Name */}
                <Link to={`/product/${product.id}`}>
                  <h2 className="text-[10px] font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-1 my-0.5">
                    {product.name}
                  </h2>
                </Link>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="text-[8px] bg-blue-600 text-white px-1.5 py-0.5 rounded hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products; 