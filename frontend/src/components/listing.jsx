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
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-gray-100 hover:text-gray-100-foreground h-9 w-9">
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
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-gray-100 hover:text-gray-100-foreground h-9 w-9">
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
      <div class="mt-4 flex justify-between items-center">
        <div>Items: 0 | Cubic Feet: 0.00 | Weight: 0 lbs</div>
        <button class="inline-flex items-center text-white justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-primary-foreground shadow hover:bg-gray-900/90 h-9 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-save mr-1"
          >
            <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
            <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
            <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
          </svg>{" "}
          Save inventory
        </button>
      </div>
    </div>
  );
}
