import { useState } from "react";
import { getProducts, removeProduct, updateAvailability } from "../../api";
import { Product } from "../../Utilities/Interfaces.ts";
import { useLoaderData } from "react-router";
import { Paper } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import BackHandIcon from "@mui/icons-material/BackHand";

export function loader(): Promise<Product[]> {
  return getProducts();
}

export default function AdminParent() {
  const [isAvailable, setIsAvailable] = useState(true);

  const removedProductData = function (id: string) {
    console.log(removedProductData);

    return removeProduct(id);
  };

  const toggleAvailablitity = (id: string, isAvailable: boolean) => {
    setIsAvailable(!isAvailable);
    console.log("Click");

    return updateAvailability(id, isAvailable);
  };

  const products = useLoaderData() as Product[];
  const displayedProducts = products.filter(
    (product) => product.isDeleted !== true
  );
  const productElements = displayedProducts.map((product) => (
    <Paper elevation={2} key={product._id}>
      <img className="admin-paper" src={product.image} alt={product.name} />
      <ul>
        <li>{product.name}</li>
        <li>{product.shortDesc}</li>
        <li>{product.price}</li>
        <li>{product.quantity}</li>
      </ul>
      <EditIcon onClick={() => console.log("Edit")} />
      <DeleteForeverIcon onClick={() => removedProductData(product._id)} />
      <BackHandIcon
        sx={{ padding: "1rem" }}
        onClick={() => toggleAvailablitity(product._id, isAvailable)}
      />
    </Paper>
  ));

  return <div>{productElements}</div>;
}
