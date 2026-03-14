import { useReducer, useEffect } from "react";
import CartReducer from "./CartReducer";
import type { CartItem, CartProviderProps } from "../Typescript/interface";
import CartContext from "./CreateCart";

const getInitialCart = (): CartItem[] => {
  const storedCart = localStorage.getItem("cart");

  if (!storedCart) return [];

  try {
    return JSON.parse(storedCart) as CartItem[];
  } catch {
    return [];
  }
};

const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, dispatch] = useReducer(CartReducer, [], getInitialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
