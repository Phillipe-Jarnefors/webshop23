import React from 'react'
import { useNavigate, Link } from "react-router-dom";


export default function ShippingMethod() {

  const navigate = useNavigate();

  const goHome = () => {
      console.log("klick på card!");
      // navigerar till butiken när man klickar "Till butiken-knappen"
      navigate(`/`);
    }

    const goToCheckout = () => {
      console.log("klick på card!");
      // navigerar till Checkout när man klickar "Till butiken-knappen"
      navigate(`/checkout`);
    }
  return (
    <>
    <div>

        <div>
        <button onClick={goHome}>TILL BUTIKEN</button>
        </div>

        <div>
        <h2>ShippingMethod</h2>
        </div>

        <div>
        <button onClick={goToCheckout}>GODKÄNN</button>
        </div>



    </div>
    </>
  )
}
