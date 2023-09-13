/* eslint-disable react-refresh/only-export-components */

import { getProducts } from "../../api.ts";
import { Avatar, Typography, Button, Container, Paper } from "@mui/material";
import { Box } from "@mui/system";
import { useLoaderData, Link } from "react-router-dom";
import { Product } from "../../utilities/Interfaces.ts";
import { useContext } from "react";
import { CartContext } from "../../Utilities/CartContext.tsx";
import CartIcon from "@mui/icons-material/AddShoppingCart";

export function loader(): Promise<Product[]> {
  return getProducts();
}

export default function AllProducts() {
  const { addToCart } = useContext(CartContext);
  const products = useLoaderData() as Product[];

  const productsElements = products.map((product) => (
    <Paper
      elevation={2}
      key={product._id}
      sx={{ minWidth: 210, width: { md: 340 } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 1,
        }}
      >
        <Typography
          variant="h2"
          sx={{ mx: 4, textAlign: "center", color: "primary.main", m: 2 }}
        >
          {product.name}
        </Typography>
        <Avatar
          variant={"rounded"}
          alt={product.name}
          src={product.image}
          style={{ width: 200, height: 200 }}
        />
        <Typography sx={{ mt: 2 }}>{product.shortDesc}</Typography>
        <Typography>
          {product.price} {" kr"}
        </Typography>
        <Link to="/products/productdetail"></Link>
        <Button
          variant="contained"
          endIcon={<CartIcon />}
          onClick={() => addToCart(product)}
        >
          Lägg till
        </Button>
      </Box>
    </Paper>
  ));

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-around",
          gap: 4,
        }}
      >
        {productsElements}
      </Box>
    </Container>
  );
}
