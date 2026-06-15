import { createContext, useState } from "react";

export const CartContext =
  createContext();

function CartProvider({ children }) {

  const [cartItems, setCartItems] =
    useState([]);

  // ADD TO CART

  const addToCart = (item) => {

    setCartItems([...cartItems, item]);

  };

  return (

    <CartContext.Provider
      value={{
        cartItems,
        addToCart
      }}
    >

      {children}

    </CartContext.Provider>

  );

}

export default CartProvider;