const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
})

module.exports = mongoose.model("product", ProductSchema,)
