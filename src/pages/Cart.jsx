import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, cartTotal, updateQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearCart = async () => {
    try {
      setIsLoading(true);
      await clearCart();
      setShowClearConfirm(false);
    } catch (err) {
      setError('Failed to clear cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      setIsLoading(true);
      await updateQuantity(itemId, newQuantity);
    } catch (err) {
      setError('Failed to update quantity. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-2 py-3">
            <h1 className="text-lg font-bold text-gray-900">Your Shopping Cart</h1>
          </div>
        </header>

        <main className="container mx-auto px-2 py-4">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-2 text-sm text-gray-500">
              Start adding some amazing products to your cart.
            </p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-2 py-3">
          <h1 className="text-lg font-bold text-gray-900">
            Your Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-2 py-4">
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2">
          {cart.map((item) => (
            <div 
              key={item.id}
              className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 m-3 overflow-hidden"
            >
              {/* Image Container */}
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100">
                <div className="relative h-0 pb-[100%]">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              {/* Product Info Container */}
              <div className="p-4 bg-gradient-to-b from-white to-gray-50">
                {/* Category & Rating */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[14px] font-semibold text-blue-600 truncate max-w-[60%] hover:text-blue-700 transition-colors">
                    {item.category}
                  </span>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <span className="text-yellow-400 text-[14px]">★</span>
                    <span className="text-[14px] text-gray-700 ml-1 font-medium">{item.rating}</span>
                  </div>
                </div>

                {/* Product Name */}
                <h2 className="text-[16px] font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h2>

                {/* Price and Quantity Controls */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[18px] font-bold text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="text-[14px] bg-white text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors shadow-sm active:scale-95 transform duration-100"
                      disabled={isLoading}
                    >
                      -
                    </button>
                    <span className="text-[14px] font-semibold min-w-[24px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="text-[14px] bg-white text-gray-900 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-colors shadow-sm active:scale-95 transform duration-100"
                      disabled={isLoading}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="w-full text-[14px] bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md font-medium"
                  disabled={isLoading}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-medium text-gray-700">Total:</span>
              <span className="text-[24px] font-bold text-blue-600">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowClearConfirm(true)}
                className="text-[14px] bg-red-500 text-white px-6 py-2.5 rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md font-medium flex items-center gap-2"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="text-[14px] bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm hover:shadow-md font-medium flex items-center gap-2"
              >
                Checkout
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <h3 className="text-[18px] font-semibold text-gray-900 mb-3">Clear Shopping Cart</h3>
            <p className="text-[14px] text-gray-600 mb-6">Are you sure you want to clear your cart? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="text-[14px] px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                className="text-[14px] text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Clearing...' : 'Clear Cart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
