var express = require("express")
var router = express.Router()
const ProductSchema = require("../models/products-model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
})

router.post("/add", async (req, res) => {
  try {
    // Create a new Product document based on the request body
    const newProduct = new ProductSchema({
      name: req.body.name,
      description: req.body.description,
      
    });

    // Save the newProduct document to the database
    await newProduct.save();

    res.status(201).json(newProduct); // Respond with the saved product
  } catch (error) {
    console.error("Error saving the product to the database:", error);
    res.status(500).json({ error: "Error saving the product to the database" });
  }
});

module.exports = router;


