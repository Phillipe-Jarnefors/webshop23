import { Button, Container, Typography } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminParent() {
  const location = useLocation();

  return (
    <Container sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", my: "2rem"}}>
      <Typography
                variant="h2"
                component="div"
                sx={{ flexGrow: 1, color: "black", cursor: "pointer" }}
            >
                Dashboard
      </Typography>
      <Container
        className="admin-buttons-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          margin: "10px auto",
        }}
      >
        <Link to="/products">
          <Button
            variant={
              location.pathname.includes("..") ? "outlined" : "contained"
            }
            size="large"
          >
            Shop
          </Button>
        </Link>
        <Link to="./products">
          <Button
            variant={
              location.pathname.includes("/products") ? "outlined" : "contained"
            }
            size="large"
          >
            Products
          </Button>
        </Link>
        <Link to="./orders">
          <Button
            variant={
              location.pathname.includes("/orders") ? "outlined" : "contained"
            }
            size="large"
          >
            Orders
          </Button>
        </Link>
      </Container>
      <Outlet />
    </Container>
  );
}
