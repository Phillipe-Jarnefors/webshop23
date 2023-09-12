const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
<<<<<<< HEAD
  image: { type: String, required: true },
=======
  image: { type: String },
>>>>>>> FEsetupData
  shortDesc: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  isAvailable: { type: Boolean, required: true },
<<<<<<< HEAD
});

module.exports = mongoose.model("product", ProductSchema);
=======
})

module.exports = mongoose.model("product", ProductSchema)
>>>>>>> FEsetupData
