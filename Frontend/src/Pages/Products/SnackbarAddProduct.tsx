import { Snackbar } from "@mui/material";
import { SnackbarProps } from "../../Utilities/Interfaces";

export default function SnackbarAddProduct({ open, onClose }: SnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={1500}
      onClose={onClose}
      message={"Produkten har lagts i kundvagnen"}
    />
  );
}
