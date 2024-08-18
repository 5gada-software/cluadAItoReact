import React, { useState } from "react";
import axios from "axios";
import Modal from "../ui/modal";
import { API_URL } from "../constants/url";

const AddCustomItemForm = ({ setNewAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [cubicFeet, setCubicFeet] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(API_URL, {
        name: itemName,
        cubicFeet: parseFloat(cubicFeet),
        category,
      });
      console.log("Item added successfully:", response.data);
      setSuccess("Item added successfully!");
      setNewAdded(true);
      setItemName("");
      setCubicFeet("");
      setCategory("");
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      console.error("Error adding item:", error);
      setError("Error adding item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-max">
      <button
        onClick={openModal}
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
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
          className="lucide lucide-plus mr-1"
        >
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </svg>{" "}
        Add Custom Item
      </button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add Custom Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                required
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="number"
                min={0}
                required
                placeholder="Cubic Feet"
                value={cubicFeet}
                onChange={(e) => setCubicFeet(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <select
                className="mr-2 p-2 border rounded"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Appliances">Appliances</option>
                <option value="Bedroom">Bedroom</option>
                <option value="Den">Den</option>
                <option value="Dining Room">Dining Room</option>
                <option value="Exercise">Exercise</option>
                <option value="Foyer">Foyer</option>
                <option value="Garage">Garage</option>
                <option value="Home Office">Home Office</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Living/Family Room">Living/Family Room</option>
              </select>
            </div>
            {loading && <p className="text-blue-500 mt-2">Loading...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Item"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddCustomItemForm;
