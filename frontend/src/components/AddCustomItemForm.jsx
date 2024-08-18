import React, { useState } from "react";
import axios from "axios";
import Modal from "../ui/modal";
import { API_URL } from "../constants/url";

const AddCustomItemForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [cubicFeet, setCubicFeet] = useState("");
  const [category, setCategory] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_URL, {
        name: itemName,
        cubicFeet: parseFloat(cubicFeet),
        category,
      });
      console.log("Item added successfully:", response.data);
      // Optionally, clear form fields
      setItemName("");
      setCubicFeet("");
      setCategory("");
      closeModal(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding item:", error);
      // Handle error (e.g., show a notification)
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
              <input
                type="text"
                required
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded"
              >
                Add Item
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AddCustomItemForm;
