import React from "react";
import AddCustomItemForm from "./AddCustomItemForm";

export default function Search({ data }) {
  return (
    <div className="w-full">
      <h1 class="text-2xl font-bold mb-4">Select inventories</h1>
      <div class="flex items-center mb-4">
        <input
          class="border-input placeholder:text-muted-foreground focus-visible:ring-black flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 mr-2"
          placeholder="Search inventories..."
          type="text"
          value=""
        />
        <select class="mr-2 p-2 border rounded">
          <option value="All">All Categories</option>
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
        <AddCustomItemForm />
      </div>
    </div>
  );
}
