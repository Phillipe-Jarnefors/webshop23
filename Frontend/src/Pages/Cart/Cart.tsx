import { useContext } from "react";
import { CartContext } from "../../Utilities/CartContext";
import { useNavigate } from "react-router-dom";
import { Product } from "../../Utilities/Interfaces.ts";
import Button from "@mui/material/Button";
import {
  Avatar,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Stack,
} from "@mui/material";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

function Cart() {
  const { addToCart, removeFromCart, emptyCart, cart } = useContext(CartContext);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/products`);
  };

  const empty = () => {
    emptyCart();
    localStorage.removeItem("cart");
  }
  
  const goToPersInfo = () => {
    navigate(`/userinfo`);

    const totalPrice = calculateTotalPrice();
    localStorage.setItem("totalPrice", totalPrice.toString());
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleRemoveClick = (product: Product) => {
    removeFromCart(product._id);
  };

  const handleCardClick = (product: Product) => {
    navigate(`/products/productdetail/${product._id}`);
  };

  const cartElements = cart.map((product, index) => (
    <ListItem
      key={index}
      sx={{
        borderBottom: 1,
        display: "flex",
        flexFlow: "row wrap",
        gap: "1rem",
        my: 2,
      }}
    >
      <Avatar
        variant={"rounded"}
        alt={product.name}
        src={product.image}
        style={{ height: 100, width: 100 }}
        onClick={() => handleCardClick(product)}
      />
      <ListItemText
        primary={`${product.name}`}
        secondary={`${product.quantity} st á ${product.price} kr`}
      />
      <AddShoppingCartOutlinedIcon
        sx={{ marginBottom: "10px", fontSize: "32px" }}
        onClick={() => addToCart(product)}
      >
      </AddShoppingCartOutlinedIcon>

      <RemoveShoppingCartOutlinedIcon
        sx={{ marginBottom: "10px", fontSize: "32px" }}
        onClick={() => handleRemoveClick(product)}
      >
      </RemoveShoppingCartOutlinedIcon>
    </ListItem>
  ));

  return (
    <>
      <div>
        {cart.length === 0 ? (
          <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "sm",
            paddingTop: "40px",
          }}
          >
            <Typography
            variant="h2"
            sx={{ mx: 4, textAlign: "center", m: 2 }}
            >Your cart is empty
            </Typography>
            <Button variant="contained" onClick={goBack}>
              Back
            </Button>
          </Container>
        ) : (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "sm",
            }}
          >
            <Typography
              variant="h2"
              sx={{ mx: 4, textAlign: "center", color: "primary.main", m: 2 }}
            >
              Cart
            </Typography>
            <Paper
              elevation={2}
              sx={{
                backgroundColor: "#eee7e1",
                // backgroundColor: "#DDA15E",
                width: { sm: "100%", md: "70%" },
              }}
            >
              <List>{cartElements}</List>
              <Typography
                variant="h3"
                sx={{ mx: 4, textAlign: "right", color: "primary.main", m: 2 }}
              >
                Total: {calculateTotalPrice()} kr
              </Typography>
            </Paper>

            <Stack direction="row" 
                  spacing={2}
                  sx={{ marginTop: "20px" }}>

            <Button
              variant="outlined"
              onClick={() => empty()}
            >
              EMPTY CART
            </Button>

            <Button
              variant="contained"
              onClick={() => goToPersInfo()}
            >
              CHECKOUT
            </Button>

            </Stack>
          </Container>
        )}
      </div>
    </>
  );
}

export default Cart;
