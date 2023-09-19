import { ReactNode} from "react";

export interface Product {
  _id: string;
  name: string;
  image: string;
  shortDesc: string;
  description: string;
  price: number;
  quantity: number;
  isDeleted: boolean;
  isAvailable: boolean;
}

export interface EditedProduct {
  name: string;
  image: string;
  shortDesc: string;
  description: string;
  price: number;
  quantity: number;
}

export interface AddProduct {
  productName: string;
  image: string;
  shortDesc: string;
  description: string;
  price: number;
  quantity: number;
  isDeleted: boolean;
  isAvailable: boolean;
}

export interface Orders {
  _id: string;
  name: string,
  orderNumber: string,
  paymentMethod: string,
  email: string,
  phone: number,
  adress: string,
  cart: [
    {
      productId: string,
      quantity: number
    }
  ],
  isSent: boolean,
  delivery: string,
  isDeleted: boolean,
}


export interface CartProduct extends Product{
  quantity: number;
}

export interface CartContextValue{
  cart: CartProduct[],
  addToCart: (product: Product) => void;
  removeFromCart : (productId: string) => void;
}

export interface Props {
  children: ReactNode;
}

export interface BreadcrumbsProps{
  activeStep: 1|2|3;
}