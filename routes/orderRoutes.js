const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

router.post("/order", async (req, res) => {
  const { subscriberInfo, deliveryInfo, productId } = req.body;

  try {
    const product = Product.findById(productId).lean();

    if (!product) {
      return res.status(400).send({ message: "Failed to create product" });
    }

    const order = new Order({
      subscriberInfo,
      deliveryInfo,
      product: productId
    });
    
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
