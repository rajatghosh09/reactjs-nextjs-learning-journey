import { createContext } from "react";
import type { CartContextType } from "../Typescript/interface";

const CartContext = createContext<CartContextType | null>(null);
export default CartContext