import { CartContextValue, CartProduct, Props, Product } from "./Interfaces";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext<CartContextValue>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  emptyCart: () => {},
});

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  // hämta kundvagnsdata från LocalStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

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
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };


  const removeFromCart = (productId: string) => {

    const index = cart.findIndex((product) => product._id=== productId);

    if (index !== -1) {
        // skapa en kopia av kundvagnen
        const updateCart = [...cart];
        // minska kvantiteten för den valda produkten med 1
        updateCart[index].quantity -= 1;

        // om kvantiteten blir noll, ta bort produkten helt
        if (updateCart[index].quantity === 0) {
            updateCart.splice(index, 1);
        }
        setCart(updateCart);
        localStorage.setItem("cart", JSON.stringify(updateCart));
    }
  };
  
  const emptyCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
