const mongoose = require("mongoose")

const ProductsSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

module.exports = mongoose.model("products", ProductsSchema)
