// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // Adjust the path as necessary

// POST endpoint for creating a product
router.post("/product", async (req, res) => {
  try {
    const shirt = req.body.shirtId;
    const symbols = req.body.droppedSymbols.map(symbol => {
      return {symbolId: symbol._id, position: symbol.position}
    })
    const textOnPlate = req.body.textOnPlate;
    const dateOnPlate = req.body.dateOnPlate;
    const price = req.body.price;

    console.log({
      shirt,
      symbols,
      textOnPlate,
      dateOnPlate,
      price
    });

    const product = new Product({
      shirt,
      symbols,
      textOnPlate,
      dateOnPlate,
      price
    });
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET endpoint to fetch all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET endpoint to fetch a product by id
router.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
