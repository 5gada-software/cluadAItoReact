import React, { useState, useEffect } from "react";
import Table from "../ui/table";
import Modal from "../ui/modal";

const columns = ["Item", "Cubic Feet", "Quantity"];

export default function Listing({ filters, data, loading, error }) {
  const [inventoryData, setInventoryData] = useState(data);
  const [totals, setTotals] = useState({ items: 0, cubicFeet: 0, weight: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const totalItems = inventoryData.reduce(
      (acc, item) => acc + (item.quantity > 0 ? 1 : 0),
      0
    );
    const totalCubicFeet = inventoryData.reduce(
      (acc, item) => acc + item.cubicFeet * item.quantity,
      0
    );
    const totalWeight = totalCubicFeet * 7; // Convert cubic feet to weight

    setTotals({
      items: totalItems,
      cubicFeet: totalCubicFeet,
      weight: totalWeight,
    });
  }, [inventoryData]);

  useEffect(() => {
    setInventoryData(data);
  }, [data]);

  const updateQuantity = async (filteredIndex, delta) => {
    // Find the actual item in inventoryData that corresponds to the filtered item
    const originalIndex = inventoryData.findIndex(
      (item) => item === filteredInventoryData[filteredIndex]
    );

    if (originalIndex >= 0) {
      const item = inventoryData[originalIndex];
      const newQuantity = Math.max(0, item.quantity + delta);

      const newInventoryData = inventoryData.map((item, idx) => {
        if (idx === originalIndex) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      setInventoryData(newInventoryData);
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
      `Total volume: ${totals.cubicFeet.toFixed(2)} ft³`,
      `Total weight: ${totals.weight} lbs`,
      "",
      ...Object.keys(groupedItems).map(
        (category) => `${category}:\n${groupedItems[category].join("\n")}`
      ),
    ].join("\n");

    return summary;
  };

  const copyToClipboard = () => {
    const summary = generateSummary();
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Revert button text after 2 seconds
    });
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
    <div className="w-full">
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
          </svg>
          Save inventory
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-8 w-[95vw] sm:w-[500px]">
          <h2 className="text-lg font-semibold mb-2">Inventory Summary</h2>
          <pre>{generateSummary()}</pre>
          <div className="flex mt-4 flex-col-reverse gap-2 sm:flex-row sm:justify-end ">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gray-900 text-white text-gray-900-foreground shadow hover:bg-gray-900/90 h-9 px-4 py-2 mr-2"
            >
              {copied ? (
                <span className="inline-flex items-center">
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
                    className="lucide lucide-check mr-1"
                  >
                    <path d="M20 6L9 17L4 12"></path>
                  </svg>
                  Copied!
                </span>
              ) : (
                <span className="inline-flex items-center">
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
                    className="lucide lucide-copy mr-1"
                  >
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy to Clipboard
                </span>
              )}
            </button>
            <button
              onClick={closeModal}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background  bg-gray-900 text-white text-gray-900-foreground shadow hover:bg-gray-900/90 px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
