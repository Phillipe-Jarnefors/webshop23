import React from 'react'
import { useNavigate, Link } from "react-router-dom";



export default function PersonalInformation() {

    const navigate = useNavigate();

    const goHome = () => {
        console.log("klick på card!");
        // navigerar till butiken när man klickar "Till butiken-knappen"
        navigate(`/`);
      }

      const goToShipping = () => {
        console.log("klick på card!");
        // navigerar till ShippingMethod när man klickar "Till butiken-knappen"
        navigate(`/shippingmethod`);
      }



  return (
    <>
    <div>

        <div>
        <button onClick={goHome}>TILL BUTIKEN</button>
        </div>

        <div>
        <h2>Personuppgifter</h2>
        </div>

        <div>
        <button onClick={goToShipping}>GODKÄNN</button>
        </div>



    </div>
    </>
  )
}
