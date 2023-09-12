import React from 'react'
import { useParams } from 'react-router-dom';

// import  Button  from "@mui/material/Button";
// import CartIcon from "@mui/icons-material/AddShoppingCart";

export default function ProductDetail() {

    const { productId } = useParams();


  return (
    <div>
        
      <h2>Product Detail</h2>
      <p>Product ID: {productId}</p>


      {/* produktinformation */}
  

        {/* <Button 
            variant="contained" 
            endIcon={<CartIcon />} 
            onClick={() => addToCart(product)}
        >  
            Lägg till
        </Button> */}
    </div>
  )
}
