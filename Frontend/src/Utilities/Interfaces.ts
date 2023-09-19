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
}

export interface SwishPaymentFormProps {
  onSubmitSwish: (swishInfo: { phoneNumber: string; amount: string }) => void;
}

export interface CardPaymentFormProps {
  onSubmitCard: (
    cardInfo: {
      cardNumber: string;
      cardDate: string;
      cvv: string;
    },
    amount: string
  ) => void;
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
