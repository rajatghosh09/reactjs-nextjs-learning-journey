import type { CartItem } from "../Typescript/interface";
import type { CartAction } from "../Typescript/type/cart";


export const totalItem = (cart: CartItem[]): number => {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
};

export const totalPrice = (cart: CartItem[]): number => {
  return cart.reduce(
    (total, item) => total + item.quantity * Number(item.price),
    0
  );
};


const CartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.find(
        item => item.id === action.payload.id
      );

      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, action.payload];
    }

    case "REMOVE_FROM_CART":
      return state.filter(item => item.id !== action.payload);

    case "INCREASE":
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

export default CartReducer;
