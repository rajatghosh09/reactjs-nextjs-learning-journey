import type { CartItem } from "../interface";

export type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "INCREASE"; payload: number } 
  | { type: "DECREASE"; payload: number } 
  | { type: "CLEAR_CART" };
