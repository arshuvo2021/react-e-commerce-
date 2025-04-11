import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, cartTotal, updateQuantity } = useCart();
  const [showAll, setShowAll] = useState(false);
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
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
            Your Shopping Cart
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
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Your Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
        </h2>

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

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-6 py-8 sm:px-8">
            {/* First row of items */}
            <div className="flex space-x-8 overflow-x-auto mb-8">
              {cart.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-[300px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[180px] object-cover rounded-t-lg"
                  />
                  <div className="flex flex-col p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">{item.description}</p>
                    <div className="mt-6 flex justify-between items-center gap-1">
                      <p className="text-indigo-600 font-bold text-lg">${item.price}</p>
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-1.5 py-0.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                          disabled={isLoading}
                        >
                          -
                        </button>
                        <span className="text-sm font-medium min-w-[16px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-1.5 py-0.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                          disabled={isLoading}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex items-center px-2 py-0.5 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                        disabled={isLoading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional items row - shown when "View More" is clicked */}
            {showAll && cart.length > 4 && (
              <div className="flex space-x-8 overflow-x-auto mt-8">
                {cart.slice(4).map((item) => (
                  <div
                    key={item.id}
                    className="flex-none w-[300px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-[180px] object-cover rounded-t-lg"
                    />
                    <div className="flex flex-col p-6">
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 mt-3 line-clamp-2">{item.description}</p>
                      <div className="mt-6 flex justify-between items-center gap-1">
                        <p className="text-indigo-600 font-bold text-lg">${item.price}</p>
                        <div className="flex items-center gap-0.5">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-1.5 py-0.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                            disabled={isLoading}
                          >
                            -
                          </button>
                          <span className="text-sm font-medium min-w-[16px] text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-1.5 py-0.5 text-sm rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                            disabled={isLoading}
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="inline-flex items-center px-2 py-0.5 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
                          disabled={isLoading}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!showAll && cart.length > 4 && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowAll(true)}
                  className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                  disabled={isLoading}
                >
                  View More
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-50 px-4 py-5 sm:px-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-xl font-bold text-gray-900">
                Total: <span className="text-indigo-600">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={isLoading}
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Clear Cart</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to clear your cart? This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? 'Clearing...' : 'Clear Cart'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;
