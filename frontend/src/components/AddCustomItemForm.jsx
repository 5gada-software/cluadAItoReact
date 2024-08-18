import React, { useState } from "react";
import Modal from "../ui/modal";

const AddCustomItemForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [cubicFeet, setCubicFeet] = useState("");
  const [category, setCategory] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ itemName, cubicFeet, category });
    closeModal(); // Close the modal after submission
  };

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        + Add Custom Item
      </button>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add Custom Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
                placeholder="Cubic Feet"
                value={cubicFeet}
                onChange={(e) => setCubicFeet(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="text"
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
