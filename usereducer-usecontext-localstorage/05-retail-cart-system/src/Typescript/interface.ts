import type { ReactNode } from "react";
import type { CartAction } from "./type/cart";

export interface Menu {
  id: number;
  name: string;
  description: string;
  price: number;
  img: string;
  category: string;
  rating?: number;
}

export interface MenuCardProps {
  item: Menu;
}

export interface MenuListProps {
  menu: Menu[];
}


export interface Category {
  label: string;
  value: string;
}


export interface CartItem {
  id: number;
  name: string;
  price: number;
  img: string;
  quantity: number;
}


export interface CartContextType {
  cart: CartItem[];
  dispatch: React.Dispatch<CartAction>;
}

export interface CartProviderProps {
  children: ReactNode;
}