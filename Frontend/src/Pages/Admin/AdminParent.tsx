
import { addNewProduct, getProducts, removeProduct, updateAvailability } from "../../api";
import { AddProduct, Product } from "../../Utilities/Interfaces.ts";
import { useLoaderData } from "react-router";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import BackHandIcon from "@mui/icons-material/BackHand";
import { useEffect, useState } from "react";



export async function loader(): Promise<Product[]> {
  return await getProducts();
}

export default function AdminParent() {

  const [isAvailable, setIsAvailable] = useState(true);
  const [formProduct, setFormProduct] = useState<AddProduct>({
      productName: "",
      image: "",
      shortDesc: "",
      description: "",
      price: 0,
      quantity: 0,
      isDeleted: false,
      isAvailable: true
  })

  function handleChange(e: React.FormEvent)   {
    const { name, value } = e.target as HTMLInputElement

    setFormProduct(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  function sendNewProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    addNewProduct(formProduct)
  }

  const products = useLoaderData() as Product[];



  const displayedProducts = products.filter(
    (product) => product.isDeleted !== true
  );
  
  const removedProductData = async (id: string) => {
    console.log(removedProductData);
    return await removeProduct(id);
  };

  const toggleAvailablitity = async (id: string, isAvailable: boolean) => {
    setIsAvailable(!isAvailable);
    return await updateAvailability(id, isAvailable);
  };


  const productElements = displayedProducts.map((product) => (
    <Paper
      elevation={2}
      key={product._id}
      sx={{ minWidth: 210, width: { md: 340 }, bgcolor: product.isAvailable ? "blue" : "red"}}
    >
   
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 1,
        }}
      >
        <Typography
          variant="h2"
          sx={{ mx: 4, textAlign: "center", color: "primary.main", m: 2 }}
        >
          {product.name}
        </Typography>
        <Avatar
          variant={"rounded"}
          alt={product.name}
          src={product.image}
          style={{ width: 200, height: 200 }}
        />
        <Typography sx={{ mt: 2 }}>{product.shortDesc}</Typography>
        <Typography>
          {product.price} {" kr"}
          {product.quantity} {" st"}
        </Typography>
        <Link to="/products/productdetail"></Link>
        <EditIcon onClick={() => console.log("Edit")} />
        <DeleteForeverIcon onClick={() => removedProductData(product._id)} />
        <BackHandIcon
        sx={{ padding: "1rem" }}
        onClick={() => toggleAvailablitity(product._id, isAvailable)}
      />
      </Box>
    </Paper>

  ));



  return (
    <div>
      <Link to="..">Go back</Link>
      <form onSubmit={sendNewProduct}>
        <fieldset>
          <legend>Create new product</legend>
          <input onChange={handleChange} name="name" type="text" placeholder="Name" />
          <input onChange={handleChange} name="image" type="text" placeholder="Image-url" />
          <textarea onChange={handleChange} name="shortDesc" placeholder="Short Description" />
          <textarea onChange={handleChange} name="description"  placeholder="Description" />
          <input onChange={handleChange} name="price" type="number" placeholder="Price" />
          <input onChange={handleChange} name="quantity" type="number" placeholder="Quantity" />
          <label htmlFor="isAvailable">Available</label>
          <input onChange={handleChange} name="isAvailable" type="checkbox"  />
          <button type="submit">Create</button>
        </fieldset>
      </form>
      {productElements}
    </div>);
}


    ///
  //   <Paper elevation={2} key={product._id}>
  //   <img className="admin-paper" src={product.image} alt={product.name} />
  //   <ul>
  //     <li>{product.name}</li>
  //     <li>{product.shortDesc}</li>
  //     <li>{product.price}</li>
  //     <li>{product.quantity}</li>
  //   </ul>
  //   <EditIcon onClick={() => console.log("Edit")} />
  //   <DeleteForeverIcon onClick={() => removedProductData(product._id)} />
  // </Paper>