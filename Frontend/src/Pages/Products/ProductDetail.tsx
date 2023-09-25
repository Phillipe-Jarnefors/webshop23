import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Paper, Typography, Avatar, Container } from "@mui/material";
import { getProductById } from "../../api.ts";
import { Product } from "../../Utilities/Interfaces.ts";
import { useContext } from "react";
import { CartContext } from "../../Utilities/CartContext";
import Button from "@mui/material/Button";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import SnackbarAddProduct from "./SnackbarAddProduct";

export default function ProductDetail() {
  const { addToCart } = useContext(CartContext);

  const { productId } = useParams<{ productId?: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  useEffect(() => {
    if (productId) {
      // hämta detaljerad produktinformation från API baserat på productId
      const fetchData = async () => {
        try {
          const selectedProduct = await getProductById(productId);
          setProduct(selectedProduct || null);
        } catch (error) {
          console.error("Ett fel uppstod vid hämtning av produkten:", error);
        }
      };

      fetchData();
    }
  }, [productId]);

  return (
    <>
      <Container>
        {product ? (
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography variant="h2" sx={{ color: "primary.main", my: 2 }}>
              {product.name}
            </Typography>
            <Avatar
              variant="rounded"
              alt={product.name}
              src={product.image}
              style={{ width: 300, height: 320 }}
            />
            <Typography variant="h6" sx={{ mt: 3 }}>
              {product.description}
            </Typography>
            <Typography variant="h3" sx={{ mt: 3, color: "black" }}>
              Pris: {product.price} kr
            </Typography>
            <Button
              variant="contained"
              endIcon={<CartIcon />}
              onClick={() => {
                addToCart(product);
                setSnackbarOpen(true);
              }}
            >
              Lägg till
            </Button>
          </Paper>
        ) : (
          <Typography variant="h2">Produkt hittades inte</Typography>
        )}
      </Container>
      <SnackbarAddProduct open={snackbarOpen} onClose={handleSnackbarClose} />
    </>
  );
}
