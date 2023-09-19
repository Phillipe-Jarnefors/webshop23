import {
  addNewProduct,
  getProducts,
  removeProduct,
  updateAvailability,
  updateProduct,
} from "../../api";
import {
  AddProduct,
  EditedProduct,
  Product,
} from "../../Utilities/Interfaces.ts";
import { useLoaderData } from "react-router";
import { Paper, Box, Typography, Avatar } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import BackHandIcon from "@mui/icons-material/BackHand";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export async function loader(): Promise<Product[]> {
  return await getProducts();
}

const label = { inputProps: { "aria-label": "Switch demo" } };

export default function AdminProducts() {
  const products = useLoaderData() as Product[];

  const initialProductAvailability = products.reduce((acc, product) => {
    return { ...acc, [product._id]: product.isAvailable };
  }, {});

  const [productAvailability, setProductAvailability] = useState<{
    [key: string]: boolean;
  }>(initialProductAvailability);
  const [data, setData] = useState<Product[]>(products);
  const [showEditForm, setShowEditForm] = useState<string>("");
  const [editedProduct, setEditedProduct] = useState<EditedProduct>({
    name: "",
    image: "",
    shortDesc: "",
    description: "",
    price: 0,
    quantity: 0,
  });
  const [formProduct, setFormProduct] = useState<AddProduct>({
    productName: "",
    image: "",
    shortDesc: "",
    description: "",
    price: 0,
    quantity: 0,
    isAvailable: true,
    isDeleted: false,
  });

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

  // Edit button
  const handleEditClick = (product: Product) => {
    if (showEditForm === product._id) {
      setShowEditForm("");
      setEditedProduct({
        name: "",
        image: "",
        shortDesc: "",
        description: "",
        price: 0,
        quantity: 0,
      });
    } else {
      setShowEditForm(product._id);
    }
  };

  // Edit Product Listener
  function handleEdit(e: React.FormEvent) {
    const { name, value } = e.target as HTMLInputElement;

    setEditedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Save The Edited Product
  const handleSaveClick = async (
    _e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    await updateProduct(editedProduct, id);
    setShowEditForm("");
  };

  //Check Input Validation
  const isFormValid = () => {
    return (
      editedProduct.name.trim() !== "" &&
      editedProduct.image.trim() !== "" &&
      editedProduct.shortDesc.trim() !== "" &&
      editedProduct.description.trim() !== "" &&
      editedProduct.price > 0 &&
      editedProduct.quantity > 0
    );
  };

  // Send New Created Product
  const sendNewProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProduct = await addNewProduct(formProduct);
    if (newProduct) {
      setFormProduct({
        productName: "",
        image: "",
        shortDesc: "",
        description: "",
        price: 0,
        quantity: 0,
        isAvailable: true,
        isDeleted: false,
      });
      setData((prevData) => [...prevData, newProduct]);
      setProductAvailability((prevState) => ({
        ...prevState,
        [newProduct._id]: newProduct.isAvailable,
      }));
    }
  };

  // Soft Delete Product
  const removedProductData = async (id: string) => {
    console.log(removedProductData);
    return await removeProduct(id);
  };

  //Toggle if the Product is available or not
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
      sx={{ minWidth: 210, width: { md: 340 } }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 1,
          bgcolor: productAvailability[product._id] ? "beige" : "gray",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mx: 4,
            textAlign: "center",
            color: "Black",
            m: 2,
            textDecoration: productAvailability[product._id]
              ? "none"
              : "line-through",
          }}
        >
          {product.name}
          <br />
          {productAvailability[product._id] ? "Available" : "Sold Out"}
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
        <EditIcon onClick={() => handleEditClick(product)} />
        {showEditForm === product._id && (
          <div>
            <form onSubmit={(e) => handleSaveClick(e, product._id)}>
              <TextField
                onChange={handleEdit}
                label="Name"
                name="name"
                type="text"
              />
              <TextField
                onChange={handleEdit}
                label="URL"
                name="image"
                type="text"
              />
              <textarea
                onChange={handleEdit}
                name="shortDesc"
                placeholder="Short Description"
              />
              <textarea
                onChange={handleEdit}
                name="description"
                placeholder="Description"
              />
              <TextField
                onChange={handleEdit}
                label="price"
                name="price"
                type="number"
              />
              <TextField
                onChange={handleEdit}
                label="QT"
                name="quantity"
                type="number"
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={!isFormValid()}
              >
                Save
              </Button>
            </form>
          </div>
        )}
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
      <div>
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onSubmit={sendNewProduct}
        >
          <fieldset style={{ display: "flex", flexDirection: "column" }}>
            <legend>Create new product</legend>
            <TextField
              sx={{ mt: 2 }}
              onChange={handleChange}
              id="outlined-basic"
              name="productName"
              type="text"
              label="Name"
              variant="outlined"
              required
            />
            <TextField
              sx={{ mt: 2 }}
              onChange={handleChange}
              id="outlined-basic"
              name="image"
              type="text"
              label="Image URL"
              variant="outlined"
            />
            <TextField
              sx={{ mt: 2 }}
              onChange={handleChange}
              id="outlined-basic"
              name="price"
              type="number"
              label="Price"
              variant="outlined"
            />
            <TextField
              sx={{ mt: 2 }}
              onChange={handleChange}
              id="outlined-basic"
              name="quantity"
              type="number"
              label="Quantity st"
              variant="outlined"
            />
            <textarea
              style={{ marginTop: "10px" }}
              onChange={handleChange}
              name="shortDesc"
              placeholder="Short Description"
            />
            <textarea
              style={{ marginTop: "10px", marginBottom: "10px" }}
              onChange={handleChange}
              name="description"
              placeholder="Description"
            />
            <label htmlFor="isAvailable">Available</label>
            <Switch {...label} type="checkbox" name="isAvailable" />
            <Stack direction="row" spacing={2}>
              <Button type="submit" variant="contained" color="success">
                Create Product
              </Button>
            </Stack>
          </fieldset>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "15px",
        }}
      >
        {productElements}
      </div>
    </div>
  );
}
