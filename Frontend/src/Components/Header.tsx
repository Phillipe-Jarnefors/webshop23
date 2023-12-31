import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import { useContext } from "react";
import CartBadge from "../Components/CartBadge";
import { CartContext } from "../Utilities/CartContext";
import AdminBadge from "./AdminBadge";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            sx={{ background: "linear-gradient(to right, #dda15e, #bc6c25)" }}
          >
            <Toolbar>
              <Typography
                variant="h2"
                component="div"
                sx={{ flexGrow: 1, color: "black", cursor: "pointer" }}
                onClick={() => navigate(`/products`)}
              >
                Marsvinsbutiken
              </Typography>
              <Link to="/admin">
                <AdminBadge />
              </Link>
              <Link to="/cart">
                <CartBadge
                  cartLength={cart.reduce(
                    (total, product) => total + product.quantity,
                    0
                  )}
                />
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </>
  );
}
