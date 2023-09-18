import { addNewProduct, getProducts, removeProduct, updateAvailability } from "../../api";
import { AddProduct, Product } from "../../Utilities/Interfaces.ts";
import { useLoaderData } from "react-router";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import BackHandIcon from "@mui/icons-material/BackHand";
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';



export async function loader(): Promise<Product[]> {
  return await getProducts();
}

const label = { inputProps: { 'aria-label': 'Switch demo',  } };

export default function AdminProducts() {
  const products = useLoaderData() as Product[];

  const [productAvailability, setProductAvailability] = useState<{ [key: string]: boolean }>({});
  const [data, setData] = useState<Product[]>(products)
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


  useEffect(() => {

    const initialProductAvailability = products.reduce((acc, product) => {
      return { ...acc, [product._id]: product.isAvailable };
    }, {});
    setProductAvailability(initialProductAvailability);
  }, [products]);

 console.log(productAvailability)

  function handleChange(e: React.FormEvent) {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if (type === "checkbox") {
      setFormProduct((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setFormProduct((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  }

  const sendNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = await addNewProduct(formProduct);
    if (newProduct) {
      setData((prevData) => [newProduct, ...prevData]);
    }
  }

  const removedProductData = async (id: string) => {
    console.log(removedProductData);
    return await removeProduct(id);
  };

  
  const toggleAvailability = async (id: string) => {
    try {
      const newAvailability = !productAvailability[id];

      setProductAvailability((prevState) => ({
        ...prevState,
        [id]: newAvailability,
      }));

      await updateAvailability(id, newAvailability);
    } catch (error) {
      console.error("Error when updating availability: ", error);
      
    }
  };

  const displayedProducts = data.filter(
    (product) => product.isDeleted !== true
  );

  const productElements = displayedProducts.map((product) => (
    <Paper
      elevation={2}
      key={product._id}
      sx={{ minWidth: 210, width: { md: 340 },}}
    >
   
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
          m: 1,
          bgcolor: productAvailability[product._id] ? "gray" : "beige"
        }}
      >
        <Typography
          variant="h2"
          sx={{ mx: 4, textAlign: "center", color: "Black", m: 2, 
          textDecoration: productAvailability[product._id] ? "line-through" : "none"}}
        >
          {product.name}
          <br />
          {productAvailability[product._id] ? "Sold Out" : "Available"}
        </Typography>
        <Avatar
          variant={"rounded"}
          alt={product.name}
          src={product.image}
          style={{ width: 200, height: 200,}}
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
        onClick={() => toggleAvailability(product._id)}
      />
      </Box>
    </Paper>
  ));



  return (
    <div>
      <div >
      <form style={{display: "flex", alignItems: "center", justifyContent: "center"}} onSubmit={sendNewProduct}>
        <fieldset style={{display: "flex", flexDirection: "column"}}>
          <legend>Create new product</legend>
          <TextField sx={{ mt: 2 }} onChange={handleChange} id="outlined-basic" name="productName" type="text" label="Name" variant="outlined"required/>
          <TextField sx={{ mt: 2 }} onChange={handleChange} id="outlined-basic" name="image" type="text" label="Image URL" variant="outlined"/>
          <TextField sx={{ mt: 2 }} onChange={handleChange} id="outlined-basic" name="price" type="number" label="Price" variant="outlined"/>
          <TextField sx={{ mt: 2 }} onChange={handleChange} id="outlined-basic" name="quantity" type="number" label="Quantity st" variant="outlined"/>
          <textarea style={{ marginTop : "10px" }} onChange={handleChange} name="shortDesc" placeholder="Short Description" />
          <textarea style={{ marginTop : "10px", marginBottom: "10px"}} onChange={handleChange} name="description"  placeholder="Description" />
          <label htmlFor="isAvailable">Available</label>
          <Switch {...label} type="checkbox" name="isAvailable" defaultChecked />
          <Stack direction="row" spacing={2}>
            <Button type="submit" variant="contained" color="success">
              Create Product
            </Button>
          </Stack>
        </fieldset>
      </form>
      </div>
      <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap", margin: "15px"}}>
        {productElements}
      </div>
    </div>);
}
