const Stone = require("../models/Stone");

exports.createStone = async (req, res) => {
  try {
    const { name, description, alt, price } = req.body;

    const url = {
      frontUrl: req.files["frontImage"] ? req.files["frontImage"][0].path : "",
      leftUrl: req.files["leftImage"] ? req.files["leftImage"][0].path : "",
      rightUrl: req.files["rightImage"] ? req.files["rightImage"][0].path : "",
      backUrl: req.files["backImage"] ? req.files["backImage"][0].path : "",
    };

    const newStone = new Stone({
      name,
      description,
      alt,
      price,
      url,
    });

    const savedStone = await newStone.save();

    res.status(201).json(savedStone);
  } catch (error) {
    console.error("Error creating stone:", error);
    res
      .status(500)
      .json({ message: "Error creating the stone", error: error.message });
  }
};

exports.getStones = async (req, res) => {
  try {
    const stones = await Stone.find({});
    res.json(stones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStone = async (req, res) => {
  try {
    const stone = await Stone.findById(req.params.id);
    if (!stone) {
      return res.status(404).json({ error: "Stone not found" });
    }
    res.json(stone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeStone = async (req, res) => {
  try {
    const deletedStone = await Stone.findByIdAndDelete(req.params.id);
    if (!deletedStone) {
      return res.status(404).json({ error: "Stone not found" });
    }
    res.json(deletedStone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
