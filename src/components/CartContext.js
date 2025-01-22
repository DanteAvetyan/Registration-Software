import React, { createContext, useState, useContext } from 'react';

// Create context
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Function to add items to the cart
    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    // Function to remove items from the cart (optional)
    const removeFromCart = (item) => {
        setCart(cart.filter((cartItem) => cartItem !== item));
    };

    // Function to clear the cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
