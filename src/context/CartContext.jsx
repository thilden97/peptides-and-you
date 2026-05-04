import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((product, variant) => {
    setItems(prev => {
      const key = `${product.id}-${variant.label}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, {
        key,
        productId: product.id,
        name: product.name,
        image: product.image,
        variantLabel: variant.label,
        price: variant.price,
        quantity: 1,
      }];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems(prev => prev.filter(i => i.key !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    if (quantity < 1) {
      setItems(prev => prev.filter(i => i.key !== key));
      return;
    }
    setItems(prev => prev.map(i => i.key === key ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + (i.price * i.quantity), 0), [items]);

  const value = useMemo(() => ({
    items, isCartOpen, setIsCartOpen,
    addItem, removeItem, updateQuantity, clearCart,
    totalItems, totalPrice,
  }), [items, isCartOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
