import { Button } from "@mui/material";
import { Link, Outlet} from "react-router-dom";

export default function AdminParent() {

 

  return (
    <>
      <div
        className="admin-buttons-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          margin: "15px",
        }}
      >
        <Link to="..">
          <Button variant="contained" size="large">
            Shop
          </Button>
        </Link>
        <Link to="./products">
          <Button variant="contained" size="large">
            Proucts
          </Button>
        </Link>
        <Link to="./orders">
          <Button variant="contained" size="large">
            Orders
          </Button>
        </Link>
      </div>
      <Outlet />
    </>
  );
}
