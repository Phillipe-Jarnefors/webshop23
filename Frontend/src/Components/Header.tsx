import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Container } from "@mui/system";

export default function Header() {
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
                sx={{ flexGrow: 1, color: "black" }}
              >
                Marsvinsbutiken
              </Typography>
              <Link to="/admin">
                <Button
                  variant="contained"
                  sx={{
                    color: "black",
                    fontWeight: "700",
                    background: "#dda15e",
                    m: 1,
                  }}
                >
                  Admin
                </Button>
              </Link>
              <Link to="/cart">
                <Button
                  variant="contained"
                  endIcon={<ShoppingCartIcon />}
                  sx={{
                    color: "black",
                    fontWeight: "700",
                    background: "#dda15e",
                    m: 1,
                  }}
                >
                  Cart
                </Button>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </>
  );
}
