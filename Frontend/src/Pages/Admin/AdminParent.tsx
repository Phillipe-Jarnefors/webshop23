import { Link, Outlet } from "react-router-dom";

export default function AdminParent() {
  return (
    <div> 
    <Link to="./products">
      <button>Products</button>
    </Link>
    <Link to="./orders">
      <button>Orders</button>
    </Link>
    <Link to="..">
      <button>Go Back</button>
    </Link>
    <Outlet />
  </div>
  );
}
