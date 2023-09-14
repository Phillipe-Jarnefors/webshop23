import { useContext } from "react";
import { CartContext } from "../../Utilities/CartContext";
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
  const { cart } = useContext(CartContext);
  console.log(cart);

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
    </ListItem>
  ));

  return (
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
          Total:
        </Typography>
      </Paper>
    </Container>
  );
}

export default Cart;
