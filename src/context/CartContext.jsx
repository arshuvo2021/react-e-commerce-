// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Initialize cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  console.log('cart',cart)

  // Add a product to the cart
  const addToCart = (product) => {
    console.log('cart product', product);
    const alreadyInCart = cart.find(item => item.id === product.id);
    if (alreadyInCart) {
      // Update quantity if already in cart
      setCart(prev => prev.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      return;
    }
    setCart(prev => [...prev, { ...product, quantity: 1 }]);
  };

  // Update quantity of a product in the cart
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Remove a product from the cart by ID
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Clear the cart
  const clearCart = () => {
    setCart([]);
  };

  // Calculate total cart price
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
