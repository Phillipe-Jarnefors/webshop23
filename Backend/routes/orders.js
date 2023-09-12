var express = require("express");
var router = express.Router();
const OrderModel = require("../models/orders-model");

//=== ORDERS ===

router.get("/orders", async (req, res) => {
  const orders = await OrderModel.find();
  if (orders) {
    res.status(200).json(orders);
  } else {
    res.status(404).json({ message: "Orders not found." });
    console.log("Det finns inga orders");
  }
});

//=== ADD ORDERS ===

router.post("/orders/add", async (req, res) => {
  try {
    const newOrder = new OrderModel(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error saving the order to the database:", error);
    res.status(500).json({ error: "Error saving the order to the database" });
  }
});

// ===== SOFT DELETE ORDER =====

router.put("/orders/delete/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const updateFields = req.body;

    const order = await OrderModel.findByIdAndUpdate(orderId, {
      $set: { isDeleted: updateFields.isDeleted },
    });

    if (!order) {
      return res.status(404).json({ message: "Ordern hittades inte" });
    }

    res.status(200).json({ message: "Ordern har uppdaterats" });
  } catch (error) {
    console.error("Ett fel uppstod vid uppdateringen av ordern:", error);
    res
      .status(500)
      .json({ message: "Ett fel uppstod vid uppdateringen av produkten" });
  }
});

// ===== UPDATE ORDERS =====


router.put("/orders/update/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const updateFields = req.body;

    const order = await OrderModel.findByIdAndUpdate(orderId, {
      $set: { isSent: updateFields.isSent },
    });

    if (!order) {
      return res.status(404).json({ message: "Ordern hittades inte" });
    }

    res.status(200).json({ message: "Ordern har uppdaterats" });
  } catch (error) {
    console.error("Ett fel uppstod vid uppdateringen av ordern:", error);
    res
      .status(500)
      .json({ message: "Ett fel uppstod vid uppdateringen av produkten" });
  }
});

module.exports = router;
