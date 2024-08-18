import React, { useState, useEffect } from "react";
import Table from "../ui/table";
import { FaAngleLeft } from "react-icons/fa";

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
        Quantity: (
          <div className="flex items-center">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-left"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>

            <span class="mx-2 w-8 text-center">{item.quantity}</span>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-chevron-right"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        ),
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
      <Table
        data={mappedData}
        columns={columns}
        loading={loading}
        error={error}
      />
    </div>
  );
}
