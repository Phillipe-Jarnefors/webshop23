var express = require("express");
var router = express.Router();
const ProductModel = require("../models/products-model");

//=== PRODUCTS ===

router.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  if (products) {
    res.status(200).json(products);
  } else {
    res.status(404).json({ message: "Products not found." });
    console.log("Det finns inga produkter");
  }
});

// ===== PRODUCT BY ID  =====

router.get("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(401).json({ message: "Produkten hittades inte" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Ett fel uppstod vid hämtning av produkten" });
    console.error("Det finns inga produkter:", error);
  }
});

//=== ADD PRODUCT ===

router.post("/products/add", async (req, res) => {
  try {
    // Create a new Product document based on the request body
    const newProduct = new ProductModel(req.body);

    // Save the newProduct document to the database
    await newProduct.save();

    res.status(201).json(newProduct); // Respond with the saved product
  } catch (error) {
    console.error("Error saving the product to the database:", error);
    res.status(500).json({ error: "Error saving the product to the database" });
  }
});

// ===== SOFT-DELETE PRODUCT ======

router.put("/products/delete/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updateFields = req.body;

    const product = await ProductModel.findByIdAndUpdate(productId, {
      $set: { isDeleted: updateFields.isDeleted },
    });

    if (!product) {
      return res.status(404).json({ message: "No product found" });
    }

    res.status(200).json({ message: "Updated product isDeleted" });
  } catch (error) {
    console.error("Error when updating: ", error);
    res.status(500).json({ message: "Error when updating the product" });
  }
});

// ===== UPDATE PRODUCT =====

router.put("/products/update/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Produkten hittades inte" });
    }

    // uppdatera produktens uppgifter
    product.name = name;
    product.description = description;

    // spara uppdateringar i databasen
    await product.save();

    res.status(200).json({ message: "Produkten har uppdaterats" });
  } catch (error) {
    console.error("Ett fel uppstod vid uppdateringen av produkten:", error);
    res
      .sendStatus(500)
      .json({ message: "Ett fel uppstod vid uppdateringen av produkten" });
  }
});
module.exports = router;
