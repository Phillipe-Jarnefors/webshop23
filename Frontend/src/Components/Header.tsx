import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <Link to="/admin">
        <button>Admin</button>
      </Link>
      <Link to="/cart">
        <button>Cart</button>
      </Link>
    </div>
  );
}
