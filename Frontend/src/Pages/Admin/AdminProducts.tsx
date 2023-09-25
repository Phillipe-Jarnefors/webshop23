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
import { Paper, Box, Typography, Avatar, Container } from "@mui/material";
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
  const isEditProductValid = () => {
    return (
      editedProduct.name.trim() !== "" &&
      editedProduct.image.trim() !== "" &&
      editedProduct.shortDesc.trim() !== "" &&
      editedProduct.description.trim() !== "" &&
      editedProduct.price > 0 &&
      editedProduct.quantity > 0
    );
  };

  const isCreatedProductValid = () => {
    return (
      formProduct.productName.trim() !== "" &&
      formProduct.image.trim() !== "" &&
      formProduct.description.trim() !== "" &&
      formProduct.shortDesc.trim() !== "" &&
      formProduct.quantity !== 0 &&
      formProduct.isAvailable === true
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
      setData((prevState) => [...prevState, newProduct]);
      setProductAvailability((prevState) => ({
        ...prevState,
        [newProduct._id]: newProduct.isAvailable,
      }));
    }
  };

  // Soft Delete Product
  const removedProductData = async (id: string) => {
    try {
      await removeProduct(id);
      // Update the component state to remove the deleted product
      setData((prevData) => prevData.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error when removing product: ", error);
    }
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
      className="product-card"
      elevation={2}
      key={product._id}
      sx={{
        width: { md: 340 },
        boxShadow: "none",
        backgroundColor: "transparent ",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          m: 1,
          bgcolor: productAvailability[product._id] ? "#dda15e" : "lightgray",
          padding: "10px",
          paddingBottom: "px",
          borderRadius: "10px",
          boxShadow: "5",
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
        <Typography sx={{ mt: 2, fontWeight: "bold" }}>
          {product.shortDesc}
        </Typography>
        <Typography>
          {product.price} {" kr"}
        </Typography>
        <Typography>
          {product.quantity} {" st"}
        </Typography>
        <Link to="/products/productdetail"></Link>
        <section
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            cursor: "pointer",
          }}
          className="product-edit-icons"
        >
          <EditIcon
            sx={{ padding: "5px", cursor: "pointer" }}
            onClick={() => handleEditClick(product)}
          />
          <DeleteForeverIcon
            sx={{ padding: "5px", cursor: "pointer" }}
            onClick={() => removedProductData(product._id)}
          />
          <BackHandIcon
            sx={{ padding: "5px" }}
            onClick={() => toggleAvailability(product._id)}
          />
        </section>
        {showEditForm === product._id && (
          <div className="edit-product-form">
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                paddingBottom: "10px",
              }}
              onSubmit={(e) => handleSaveClick(e, product._id)}
            >
              <TextField
                size="small"
                sx={{ mt: 1 }}
                onChange={handleEdit}
                label="Name"
                name="name"
                type="text"
              />
              <TextField
                size="small"
                sx={{ mt: 1 }}
                onChange={handleEdit}
                label="URL"
                name="image"
                type="text"
              />
              <TextField
                size="small"
                sx={{ mt: 2 }}
                id="outlined-multiline-flexible"
                label="Short Description"
                onChange={handleEdit}
                name="shortDesc"
                multiline
                maxRows={4}
              />

              <TextField
                size="small"
                sx={{ mt: 2 }}
                id="outlined-multiline-flexible"
                label="Description"
                onChange={handleEdit}
                name="description"
                multiline
                maxRows={4}
              />

              <TextField
                size="small"
                sx={{ mt: 1 }}
                onChange={handleEdit}
                label="Price"
                name="price"
                type="number"
              />
              <TextField
                size="small"
                sx={{ mt: 1 }}
                onChange={handleEdit}
                label="QT"
                name="quantity"
                type="number"
              />
              <Button
                sx={{ mt: 1 }}
                type="submit"
                variant="contained"
                color="success"
                disabled={!isEditProductValid()}
              >
                Save
              </Button>
            </form>
          </div>
        )}
      </Box>
    </Paper>
  ));

  return (
    <Container className="admin-container">
      <div className="create-product-wrapper">
        <form
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onSubmit={sendNewProduct}
        >
          <fieldset
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <legend style={{ fontFamily: "Roboto , sans-serif" }}>
              Create new product
            </legend>
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

            <TextField
              sx={{ mt: 2 }}
              id="outlined-multiline-flexible"
              label="Description"
              onChange={handleChange}
              name="description"
              multiline
              maxRows={4}
            />

            <TextField
              sx={{ mt: 2, mb: 2 }}
              id="outlined-multiline-flexible"
              label="Short Description"
              onChange={handleChange}
              name="shortDesc"
              multiline
              maxRows={4}
            />

            <label
              style={{ fontFamily: "Roboto, sans-serif" }}
              htmlFor="isAvailable"
            >
              Available
            </label>
            <Switch {...label} type="checkbox" name="isAvailable" />
            <Stack direction="row" spacing={2}>
              <Button
                type="submit"
                variant="contained"
                color="success"
                disabled={!isCreatedProductValid()}
              >
                Create Product
              </Button>
            </Stack>
          </fieldset>
        </form>
      </div>
      <div
        className="product-wrapper"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          margin: "15px",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {productElements}
      </div>
    </Container>
  );
}
