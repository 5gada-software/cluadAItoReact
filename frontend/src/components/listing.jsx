import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../ui/table";
import Modal from "../ui/modal";
import { API_URL } from "../constants/url";

const columns = ["Item", "Cubic Feet", "Quantity"];

export default function Listing({ filters, data, loading, error }) {
  const [inventoryData, setInventoryData] = useState(data);
  const [totals, setTotals] = useState({ items: 0, cubicFeet: 0, weight: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setInventoryData(data);
  }, [data]);

  const updateQuantity = async (index, delta) => {
    const item = inventoryData[index];
    const newQuantity = Math.max(0, item.quantity + delta);

    try {
      const newInventoryData = inventoryData.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setInventoryData(newInventoryData);
      await axios.put(`${API_URL}/${item._id}`, { quantity: newQuantity });
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const generateSummary = () => {
    const groupedItems = inventoryData.reduce((acc, item) => {
      if (item.quantity > 0) {
        if (!acc[item.category]) {
          acc[item.category] = [];
        }
        acc[item.category].push(`${item.quantity} x ${item.name}`);
      }
      return acc;
    }, {});

    const summary = [
      `**Inventory**`,
      `Total items: ${totals.items}`,
      `Total volume: ${totals.cubicFeet.toFixed(2)}`,
      `Total weight: ${totals.weight}`,
      "",
      ...Object.keys(groupedItems).map(
        (category) => `${category}:\n${groupedItems[category].join("\n")}`
      ),
    ].join("\n");

    return summary;
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
    "Cubic Feet": <span>{item.cubicFeet} ft³</span>,
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
      <Table
        data={mappedData}
        columns={columns}
        loading={loading}
        error={error}
      />
      <div className="mt-4 flex justify-between items-center">
        <div>
          Items: {totals.items} | Cubic Feet: {totals.cubicFeet.toFixed(2)} |
          Weight: {totals.weight} lbs
        </div>
        <button
          onClick={openModal}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white text-gray-100-foreground shadow hover:bg-gray-900/90 h-9 px-4 py-2"
        >
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

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-8 bg-white rounded-lg w-[500px]">
          <h2 className="text-lg font-semibold mb-2">Inventory Summary</h2>
          <pre>{generateSummary()}</pre>
          <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white text-gray-900-foreground shadow hover:bg-gray-900/90 h-9 px-4 py-2 mr-2">
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
                class="lucide lucide-copy mr-1"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
              Copy to Clipboard
            </button>
            <button onClick={closeModal} class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-gray-900-foreground shadow hover:bg-gray-900/90 h-9 px-4 py-2">
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
                class="lucide lucide-x mr-1"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
