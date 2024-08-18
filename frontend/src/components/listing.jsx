import React, { useState, useEffect } from "react";
import Table from "../ui/table";

const columns = ["Item", "Cubic Feet", "Quantity"];
const inventoryData = [
  { name: "AC, Large", cubicFeet: 20, category: "Appliances", quantity: 0 },
  { name: "Bed, Queen", cubicFeet: 65, category: "Bedroom", quantity: 0 },
  { name: "Pool Table", cubicFeet: 60, category: "Den", quantity: 0 },
  {
    name: "Table, Dining",
    cubicFeet: 30,
    category: "Dining Room",
    quantity: 0,
  },
  { name: "Treadmill", cubicFeet: 25, category: "Exercise", quantity: 0 },
  { name: "Entry Table", cubicFeet: 10, category: "Foyer", quantity: 0 },
  { name: "Lawn Mower, Power", cubicFeet: 10, category: "Garage", quantity: 0 },
  {
    name: "Desk, Executive",
    cubicFeet: 50,
    category: "Home Office",
    quantity: 0,
  },
  {
    name: "Refrigerator, Small",
    cubicFeet: 20,
    category: "Kitchen",
    quantity: 0,
  },
  {
    name: "Sofa, 3 Cushion",
    cubicFeet: 50,
    category: "Living/Family Room",
    quantity: 0,
  },
];

export default function Listing() {
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const mapped = inventoryData.map((item) => ({
        Item: item.name,
        "Cubic Feet": item.cubicFeet,
        Quantity: item.quantity,
      }));
      setMappedData(mapped);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <Table data={mappedData} columns={columns} loading={loading} error={error} />
    </div>
  );
}
