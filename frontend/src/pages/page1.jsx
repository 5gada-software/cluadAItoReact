import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "../components/search";
import Listing from "../components/listing";
import { API_URL } from "../constants/url";

export default function Page1() {
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newAdded, setNewAdded] = useState(false);
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get(`${API_URL}`);
        setInventoryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
        setError("Failed to load inventory data.");
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, [newAdded]);

  return (
    <div className="w-[90%] sm:w-[80%] lg:w-[70%] mx-auto py-5">
      <div className="flex w-full justify-between items-end">
        <Search setNewAdded={setNewAdded} setFilters={setFilters} />
      </div>
      <div>
        <Listing
          loading={loading}
          error={error}
          data={inventoryData}
          filters={filters}
        />
      </div>
    </div>
  );
}
