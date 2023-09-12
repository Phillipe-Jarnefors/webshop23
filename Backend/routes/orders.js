var express = require("express");
var router = express.Router();
const OrderModel = require("../models/orders-model");

//=== PRODUCTS ===

router.get("/orders", async (req, res) => {
  const orders = await OrderModel.find();
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "Orders not found." });
    console.log("Det finns inga orders");
  }
});

//=== ADD PRODUCT ===

router.post("/orders/add", async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body);

    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error saving the product to the database:", error);
    res.status(500).json({ error: "Error saving the product to the database" });
  }
});

// ===== UPDATE PRODUCT =====

router.put("/orders/update/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const {
      name,
      orderNumber,
      paymentMethod,
      email,
      phone,
      adress,
      isSent,
      delivery,
    } = req.body;

    const order = await OrderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Ordern hittades inte" });
    }

    order.name = name;
    order.orderNumber = orderNumber;
    order.paymentMethod = paymentMethod;
    order.email = email;
    order.phone = phone;
    order.adress = adress;
    order.isSent = isSent;
    order.delivery = delivery;

    await order.save();

    res.status(200).json({ message: "Ordern har uppdaterats" });
  } catch (error) {
    console.error("Ett fel uppstod vid uppdateringen av ordern:", error);
    res
      .sendStatus(500)
      .json({ message: "Ett fel uppstod vid uppdateringen av produkten" });
  }
});

module.exports = router;
