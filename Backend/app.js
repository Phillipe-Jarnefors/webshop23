require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

var productsRouter = require("./routes/products");
var ordersRouter = require("./routes/orders");
var usersRouter = require("./routes/users");

var app = express();

async function init() {
  try {
    const options = { useNewUrlParser: true, useUnifiedTopology: true };

    const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@lischanwebshop.kmzytku.mongodb.net/products?retryWrites=true&w=majority`;
    await mongoose.connect(uri, options);

    console.log("Ansluten till databasen");
  } catch (error) {
    console.error("Fel att starta: ", error);
  }
}

init();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")))

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);

module.exports = app;
