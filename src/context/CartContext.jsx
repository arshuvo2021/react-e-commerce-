// src/context/CartContext.jsx
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);  // Adds the product to the cart
  };

  // Remove a product from the cart by ID
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));  // Removes the item with matching ID
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);  // Empties the cart
  };

  // Calculate total cart price
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
