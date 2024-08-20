import React, { useState, useEffect } from "react";
import Search from "../components/search";
import Listing from "../components/listing";
import { inventoryInitData } from "./data";

export default function Page1() {
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [inventoryData, setInventoryData] = useState(inventoryInitData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newAdded, setNewAdded] = useState(null);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        if (newAdded) {
          // Add new item to the inventoryData array
          setInventoryData((prevData) => [newAdded, ...prevData]);
        } else {
          setInventoryData(inventoryInitData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
        setError("Failed to load inventory data.");
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [newAdded]);
  const [filteredInventoryData, setFilteredData] = useState([]);
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
  return (
    <div className="w-[90%] sm:w-[80%] lg:w-[70%] mx-auto py-5">
      <div className="flex w-full justify-between items-end">
        <Search setNewAdded={setNewAdded} setFilters={setFilters} />
      </div>
      <div>
        <Listing
          updateQuantity={updateQuantity}
          loading={loading}
          error={error}
          data={inventoryData}
          filters={filters}
          setFilteredData={setFilteredData}
        />
      </div>
    </div>
  );
}
