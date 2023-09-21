import { Button, Container } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function AdminParent() {
  const location = useLocation();

  return (
    <>
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
        <Link to="..">
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
    </>
  );
}
