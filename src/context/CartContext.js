import { createContext, useMemo, useState } from 'react';

export const CartContext = createContext();

const defaultOrderDetails = {
  name: 'Piyush Chauhan',
  phone: '+91 98765 43210',
  address: '221B Residency Lane, Sector 18, Noida',
  instructions: 'Call on arrival. Deliver to the main gate.',
  paymentMethod: 'cod',
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState(defaultOrderDetails);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      }

      return [...prevCart, { ...item, qty: 1 }];
    });
  };

  const updateQuantity = (itemId, nextQty) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === itemId ? { ...item, qty: Math.max(0, nextQty) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateOrderDetails = (key, value) => {
    setOrderDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const itemCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotal,
        itemCount,
        orderDetails,
        updateOrderDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
