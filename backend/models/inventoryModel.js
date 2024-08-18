const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    cubicFeet: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: [
        "Appliances",
        "Bedroom",
        "Den",
        "Dining Room",
        "Exercise",
        "Foyer",
        "Garage",
        "Home Office",
        "Kitchen",
        "Living/Family Room",
      ],
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Inventory", inventorySchema);
