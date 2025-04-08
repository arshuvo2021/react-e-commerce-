// src/pages/Cart.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <main className="max-w-screen-lg mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
        <p className="text-gray-600">Your cart is empty.</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
          >
            <div className="flex items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-xl font-bold mb-4 sm:mb-0">
          Total: ${cartTotal.toFixed(2)}
        </p>
        <div className="space-x-4">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Checkout
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Cart;
