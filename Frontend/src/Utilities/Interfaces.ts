import { ReactNode } from "react";

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
  name: string;
  orderNumber: string;
  paymentMethod: string;
  email: string;
  phone: number;
  adress: string;
  zip: string;
  totalPrice: string;
  cart: [
    {
      productId: string;
      quantity: number;
    }
  ];
  isSent: boolean;
  delivery: string;
  isDeleted: boolean;
}

export interface CreateOrderTemplate {
  deliveryPrice: string;
  name: string;
  email: string;
  phone: string;
  adress: string;
  zip: string;
  totalPrice: string;
  cart: {
    productId: string;
    quantity: string;
  }[];
  isSent: boolean;
  delivery: string;
  isDeleted: boolean;
}

export interface SwishPaymentFormProps {
  onSubmitSwish: (swishInfo: { 
    phoneNumber: string; 
    amount: string;
    shippingCost: string;
   }) => void;
}

export interface CardPaymentFormProps {
  onSubmitCard: (
    cardInfo: {
      cardNumber: string;
      cardDate: string;
      cvv: string;
    },
    amount: string,
    shippingCost: string,
  ) => void;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface CartContextValue {
  cart: CartProduct[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  emptyCart: () => void,
}

export interface Props {
  children: ReactNode;
}

export interface BreadcrumbsProps {
  activeStep: 1 | 2 | 3;
}


export interface SnackbarProps{
  open: boolean,
  onClose: ()=>void
}