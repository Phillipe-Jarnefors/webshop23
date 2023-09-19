import { useContext } from "react";
import { CartContext } from "../../Utilities/CartContext";
import { useNavigate } from "react-router-dom";
import { Product } from "../../Utilities/Interfaces.ts";
import Button from "@mui/material/Button";
// import CartIcon from "@mui/icons-material/AddShoppingCart";
// import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
// import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";

function Cart() {
  const { addToCart, removeFromCart, cart } = useContext(CartContext);

  const navigate = useNavigate();

  const goHome = () => {
    console.log("klick på card!");
    navigate(`/`);
  };
  const goToPersInfo = () => {
    console.log("klick på card!");
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
    console.log("klick på card!");
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
        {/* Lägg till */}
      </AddShoppingCartOutlinedIcon>

      <RemoveShoppingCartOutlinedIcon
        sx={{ marginBottom: "10px", fontSize: "32px" }}
        onClick={() => handleRemoveClick(product)}
      >
        {/* Ta bort */}
      </RemoveShoppingCartOutlinedIcon>
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

            <Button
              variant="contained"
              // endIcon={<CartIcon />}
              sx={{ marginTop: "20px" }}
              onClick={() => goToPersInfo()}
            >
              GÅ TILL KASSAN
            </Button>
            {/* <button onClick={goToPersInfo}>GÅ TILL KASSAN</button> */}
          </Container>
        )}
      </div>
    </>
  );
}

export default Cart;
