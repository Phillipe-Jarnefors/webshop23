const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  name: { type: String, required: true },
  orderNumber: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  adress: { type: String, required: true },
  //cart: { type: mongoose.Types.ObjectId, ref: "products" },
  isSent: { type: Boolean, required: true },
  delivery: { type: String, required: true },
});

module.exports = mongoose.model("order", OrderSchema);
