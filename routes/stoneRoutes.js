const express = require('express');
const router = express.Router();
const Stone = require('../models/Stone');

router.post('/stone', async (req, res) => {
  try {
    const newStone = await Stone.create(req.body);
    res.status(201).json(newStone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/stones', async (req, res) => {
  try {
    const stones = await Stone.find({});
    res.json(stones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/stone/:id', async (req, res) => {
  try {
    const stone = await Stone.findById(req.params.id);
    if (!stone) {
      return res.status(404).json({ error: 'Stone not found' });
    }
    res.json(stone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/stone/:id', async (req, res) => {
  try {
    const updatedStone = await Stone.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStone) {
      return res.status(404).json({ error: 'Stone not found' });
    }
    res.json(updatedStone);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/stone/:id', async (req, res) => {
  try {
    const deletedStone = await Stone.findByIdAndDelete(req.params.id);
    if (!deletedStone) {
      return res.status(404).json({ error: 'Stone not found' });
    }
    res.json(deletedStone);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
