const express = require("express");
const router = express.Router();
const stoneController = require("../controllers/stoneController");
const stoneUpload = require("../middleware/stoneUpload");

router.post("/stone", stoneUpload, stoneController.createStone);
router.get("/stones", stoneController.getStones);
router.get("/stone/:id", stoneController.getStone);
router.delete("/stone/:id", stoneController.removeStone);

module.exports = router;
