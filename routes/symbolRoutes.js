const express = require('express');
const router = express.Router();
const Symbol = require('../models/Symbol');
const symbolController = require("../controllers/symbolController");
const symbolUpload = require('../middleware/symbolUpload');

router.post('/symbol', symbolUpload, symbolController.createSymbol);

router.get('/symbols', symbolController.getSymbols);

router.delete('/symbol/:id', async (req, res) => {
  try {
    const symbol = await Symbol.findByIdAndDelete(req.params.id);
    if (!symbol) {
      return res.status(404).send();
    }
    res.send(symbol);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
