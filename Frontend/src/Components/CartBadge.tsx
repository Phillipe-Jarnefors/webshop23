import Badge from '@mui/material/Badge';
import CartIcon from '@mui/icons-material/ShoppingCart';

interface Props {
    cartLength: number
}

export default function CartBadge(props: Props) {
  return (
    <Badge badgeContent={props.cartLength} color="primary">
      <CartIcon color="action" />
    </Badge>
  );
}