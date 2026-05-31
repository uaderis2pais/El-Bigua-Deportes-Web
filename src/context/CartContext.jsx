import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackEvent } from '../utils/analytics';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    trackEvent('add_to_cart', {
      currency: 'ARS',
      value: product.price || 0,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price || 0,
          quantity: 1
        }
      ]
    });

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
