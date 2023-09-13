import { CartContextValue, CartProduct, Props, Product } from "./Interfaces";
import { createContext, useState } from "react";

export const CartContext = createContext<CartContextValue>({
  cart: [],
  addToCart: () => {},
});

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const addToCart = (product: Product) => {
    const productInCart = cart.find(
      (cartProduct) => cartProduct._id === product._id
    );
    if (productInCart) {
      const updatedCart = cart.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + 1 };
        } else {
          return cartProduct;
        }
      });
      setCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
