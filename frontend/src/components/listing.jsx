import React, { useState, useEffect } from "react";
import Table from "../ui/table";

const columns = ["Item", "Cubic Feet", "Quantity"];

export default function Listing({ filters, data }) {
  const [inventoryData, setInventoryData] = useState(data);
  const [totals, setTotals] = useState({ items: 0, cubicFeet: 0, weight: 0 });

  useEffect(() => {
    const totalItems = inventoryData.reduce(
      (acc, item) => acc + (item.quantity > 0 ? 1 : 0),
      0
    );
    const totalCubicFeet = inventoryData.reduce(
      (acc, item) => acc + item.cubicFeet * item.quantity,
      0
    );
    const totalWeight = inventoryData.reduce(
      (acc, item) => acc + item.weight * item.quantity,
      0
    );

    setTotals({
      items: totalItems,
      cubicFeet: totalCubicFeet,
      weight: totalWeight,
    });
  }, [inventoryData]);

  useEffect(() => {
    setInventoryData(data); // Update inventory data when props change
  }, [data]);

  const updateQuantity = (index, delta) => {
    const newInventoryData = inventoryData.map((item, idx) => {
      if (idx === index) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setInventoryData(newInventoryData);
  };

  const filteredInventoryData = inventoryData.filter((item) => {
    return (
      (!filters.search ||
        item.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (!filters.category || item.category === filters.category)
    );
  });

  const mappedData = filteredInventoryData.map((item, index) => ({
    Item: item.name,
    "Cubic Feet": item.cubicFeet,
    Quantity: (
      <div className="flex items-center">
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-gray-100 hover:text-gray-100-foreground h-9 w-9"
          onClick={() => updateQuantity(index, -1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="M15 18L9 12L15 6"></path>
          </svg>
        </button>
        <span className="mx-2 w-8 text-center">{item.quantity}</span>
        <button
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-gray-100 hover:text-gray-100-foreground h-9 w-9"
          onClick={() => updateQuantity(index, 1)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="M9 18L15 12L9 6"></path>
          </svg>
        </button>
      </div>
    ),
  }));

  return (
    <div>
      <Table data={mappedData} columns={columns} loading={false} error={null} />
      <div className="mt-4 flex justify-between items-center">
        <div>
          Items: {totals.items} | Cubic Feet: {totals.cubicFeet.toFixed(2)} |
          Weight: {totals.weight} lbs
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white text-gray-100-foreground shadow hover:bg-gray-900/90 h-9 px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-save mr-1"
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
