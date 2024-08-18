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
router.get("/inventories", getAllInventories);
router.post("/inventories", createInventory);
router.get("/inventories/:id", getInventoryById);
router.put("/inventories/:id", updateInventory);
router.delete("/inventories/:id", deleteInventory);

module.exports = router;
