import React from "react";
import { getProducts, removeProduct } from "../../api";
import { Product } from "../../Utilities/Interfaces.ts";
import { useLoaderData } from "react-router";
import { Paper } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

export function loader(): Promise<Product[]> {
  return getProducts();
}

export default function AdminParent() {
  const removedProductData = function (id: string) {
    console.log(removedProductData);

    return removeProduct(id);
  };

  const products = useLoaderData() as Product[];
  const productElements = products.map((product) => (
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
    </Paper>
  ));

  return <div>{productElements}</div>;
}
