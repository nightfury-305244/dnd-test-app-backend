const mongoose = require('mongoose');

const shirtSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const Shirt = mongoose.model('Shirt', shirtSchema);

module.exports = Shirt;
