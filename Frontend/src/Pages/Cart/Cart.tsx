import { useContext } from "react";
import { CartContext } from "../../Utilities/CartContext";
import { useNavigate } from "react-router-dom";
import { Product } from "../../Utilities/Interfaces.ts";
import Button from "@mui/material/Button";
import CartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

function Cart() {
  const { addToCart } = useContext(CartContext);
  const { removeFromCart } = useContext(CartContext);

  const { cart } = useContext(CartContext);
  console.log(cart);
  const navigate = useNavigate();

  const goHome = () => {
    console.log("klick på card!");
    navigate(`/`);
  };
  const goToPersInfo = () => {
    console.log("klick på card!");
    navigate(`/userinfo`);
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
      />
      <ListItemText
        primary={`${product.name}`}
        secondary={`${product.quantity} st á ${product.price} kr`}
      />
      <Button
        variant="contained"
        endIcon={<CartIcon />}
        sx={{ marginBottom: "10px" }}
        onClick={() => addToCart(product)}
      >
        Lägg till
      </Button>

      <Button
        variant="outlined"
        endIcon={<DeleteIcon />}
        sx={{ marginBottom: "10px" }}
        onClick={() => handleRemoveClick(product)}
      >
        Ta bort
      </Button>
    </ListItem>
  ));

  return (
    <>
      <div>
        <button onClick={goHome}>TILL BUTIKEN</button>
      </div>

      <div>
        {cart.length === 0 ? (
          <h2>Din kundvagn är tom</h2>
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
                backgroundColor: "#DDA15E",
                width: { sm: "100%", md: "65%" },
              }}
            >
              <List>{cartElements}</List>
              <Typography
                variant="h3"
                sx={{ mx: 4, textAlign: "right", color: "primary.main", m: 2 }}
              >
                Total: {calculateTotalPrice()} kr
              </Typography>
              <button onClick={goToPersInfo}>GÅ TILL KASSAN</button>
            </Paper>
          </Container>
        )}
      </div>
    </>
  );
}

export default Cart;
