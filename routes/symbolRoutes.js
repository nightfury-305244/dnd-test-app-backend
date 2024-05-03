const express = require('express');
const router = express.Router();
const Symbol = require('../models/Symbol');

router.post('/symbol', async (req, res) => {
  try {
    const symbol = new Symbol(req.body);
    await symbol.save();
    res.status(201).send(symbol);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/symbols', async (req, res) => {
  try {
    const symbols = await Symbol.find({});
    res.send(symbols);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/symbol/:id', async (req, res) => {
  try {
    const symbol = await Symbol.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!symbol) {
      return res.status(404).send();
    }
    res.send(symbol);
  } catch (error) {
    res.status(400).send(error);
  }
});

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
