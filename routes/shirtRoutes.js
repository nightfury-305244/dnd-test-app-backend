const express = require('express');
const router = express.Router();
const Shirt = require('../models/Shirt');

router.post('/shirt', async (req, res) => {
  try {
    const newShirt = await Shirt.create(req.body);
    res.status(201).json(newShirt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/shirts', async (req, res) => {
  try {
    const shirts = await Shirt.find({});
    res.json(shirts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/shirt/:id', async (req, res) => {
  try {
    const shirt = await Shirt.findById(req.params.id);
    if (!shirt) {
      return res.status(404).json({ error: 'Shirt not found' });
    }
    res.json(shirt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/shirt/:id', async (req, res) => {
  try {
    const updatedShirt = await Shirt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShirt) {
      return res.status(404).json({ error: 'Shirt not found' });
    }
    res.json(updatedShirt);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/shirt/:id', async (req, res) => {
  try {
    const deletedShirt = await Shirt.findByIdAndDelete(req.params.id);
    if (!deletedShirt) {
      return res.status(404).json({ error: 'Shirt not found' });
    }
    res.json(deletedShirt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
