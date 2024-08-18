const Inventory = require("../models/inventoryModel");

// Get all inventory items
exports.getAllInventories = async (req, res) => {
  try {
    const inventories = await Inventory.find().sort({ createdAt: -1 });
    res.status(200).json(inventories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new inventory item
exports.createInventory = async (req, res) => {
  try {
    const newInventory = new Inventory(req.body);
    const savedInventory = await newInventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single inventory item by ID
exports.getInventoryById = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);
    if (!inventory)
      return res.status(404).json({ message: "Inventory item not found" });
    res.status(200).json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an inventory item by ID
exports.updateInventory = async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInventory)
      return res.status(404).json({ message: "Inventory item not found" });
    res.status(200).json(updatedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an inventory item by ID
exports.deleteInventory = async (req, res) => {
  try {
    const deletedInventory = await Inventory.findByIdAndDelete(req.params.id);
    if (!deletedInventory)
      return res.status(404).json({ message: "Inventory item not found" });
    res.status(200).json({ message: "Inventory item deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
