// routes/routes.js
const express = require("express");
const router = express.Router();

const {
  getAllInventories,
  createInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

// Routes
router.get("/", getAllInventories);
router.post("/", createInventory);
router.get("/:id", getInventoryById);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);

module.exports = router;
