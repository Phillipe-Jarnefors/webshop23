/* eslint-disable react-refresh/only-export-components */

import { useNavigate } from "react-router"
import { Link } from 'react-router-dom';


import { getProducts } from "../../api.ts"
import { Avatar, Typography } from "@mui/material"
import { Container } from "@mui/material"
import { Box } from "@mui/system"
import { useLoaderData } from "react-router-dom";
import { Paper } from "@mui/material";
import { Product } from "../../Utilities/Interfaces.ts";


export function loader(): Promise<Product[]> {
  return getProducts();
}

export default function AllProducts() {
  const products = useLoaderData() as Product[];


  const navigate = useNavigate();
  
  const handleCardClick = (product: Product) => {
    console.log("klick på card!");
    
    // navigera till sidan Card.tsx när man klickar på ett kort (card)
    navigate(`/products/productdetail/${product._id}`);
}

  const productsElements = products.map(product => (
    <Paper elevation={2} key={product._id} sx={{ minWidth: 210, width: { md: 340 } }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center",  m: 1 }}>
        <Typography variant="h2" sx={{ mx: 4, textAlign: "center", color: "primary.main", m: 2 }}>{product.name}</Typography>
        <Avatar variant={"rounded"} alt={product.name} src={product.image}  onClick={() => handleCardClick(product)} style={{ width: 200, height: 200 }} />
        <Typography sx={{ mt: 2 }}>{product.shortDesc}</Typography>
        <Typography>{product.price} {" kr"}</Typography>
        <Link to="/products/productdetail"></Link>
      </Box>
      </Paper>
  ));


  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-around", gap: 4 }}>
        {productsElements}
      </Box>
    </Container>
  )
}
