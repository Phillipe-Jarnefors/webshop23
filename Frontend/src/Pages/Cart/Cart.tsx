import { useContext } from "react";
import { CartContext } from "../../Utilities/CartContext";

function Cart() {
  const { cart } = useContext(CartContext);
  console.log(cart);
  return (
    <div>
      <h2>CART:</h2>
      {cart.map((product, index) => (
        <div key={index}>
          <p>
            {product.quantity} st {product.name} á {product.price} $
          </p>
        </div>
      ))}
    </div>
  );
}

export default Cart;
