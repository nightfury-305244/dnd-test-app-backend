const Symbol = require("../models/Symbol");

exports.createSymbol = async (req, res) => {
  try {
    const { name, alt, price, type } = req.body;

    const url = req.files["image"] ? req.files["image"][0].path : "";

    const newSymbol = new Symbol({
      name,
      alt,
      price,
      type,
      url,
    });

    const savedSymbol = await newSymbol.save();

    res.status(201).json(savedSymbol);
  } catch (error) {
    console.error("Error creating symbol:", error);
    res
      .status(500)
      .json({ message: "Error creating the symbol", error: error.message });
  }
};

exports.getSymbols = async (req, res) => {
  try {
    const symbols = await Symbol.find({});
    res.send(symbols);
  } catch (error) {
    res.status(500).send(error);
  }
};
