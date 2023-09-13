import { ReactNode} from "react";

export interface Product {
  _id: string;
  name: string;
  image: string;
  shortDesc: string;
  description: string;
  price: number;
  quantity: number;
  isAvailable: boolean;
  isDeleted: boolean;
}

export interface CartProduct extends Product{
  quantity: number;
}

export interface CartContextValue{
  cart: CartProduct[],
  addToCart: (product: Product) => void;
}

export interface Props {
  children: ReactNode;
}