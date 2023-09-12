/* eslint-disable react-refresh/only-export-components */

import { useLoaderData } from "react-router-dom"
import { getProducts } from "../../api.ts"
import { Paper } from "@mui/material"

interface Product {
  _id: string,
  name: string,
  image: string,
  shortDesc:  string,
  description: string,
  price: number,
  quantity: number,
  isAvailable: boolean
}


export function loader(): Promise<Product[]> {
  return getProducts()
}


export default function AllProducts() {
  const products = useLoaderData() as Product[]

  const productsElements = products.map(product => (
    <Paper elevation={2} key={product._id}>
      <h3>{product.name}</h3>
      <img src={product.image} alt={product.name}></img>
    </Paper>
  ))

  return (
    <div>
        {productsElements}
    </div>
  )
}
