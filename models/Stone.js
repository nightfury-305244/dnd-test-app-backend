const mongoose = require("mongoose");

const stoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  alt: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  url: {
    frontUrl: {
      type: String,
      required: true,
    },
    leftUrl: {
      type: String,
    },
    rightUrl: {
      type: String,
    },
    backUrl: {
      type: String,
    },
  },
});

const Shirt = mongoose.model("Stone", stoneSchema);

module.exports = Shirt;
