import React, { useState } from "react";
import Search from "../components/search";
import Listing from "../components/listing";
const initialInventoryData = [
  {
    name: "AC, Large",
    cubicFeet: 20,
    category: "Appliances",
    quantity: 0,
    weight: 150,
  },
  {
    name: "Bed, Queen",
    cubicFeet: 65,
    category: "Bedroom",
    quantity: 0,
    weight: 200,
  },
  {
    name: "Pool Table",
    cubicFeet: 60,
    category: "Den",
    quantity: 0,
    weight: 350,
  },
  {
    name: "Table, Dining",
    cubicFeet: 30,
    category: "Dining Room",
    quantity: 0,
    weight: 120,
  },
  {
    name: "Treadmill",
    cubicFeet: 25,
    category: "Exercise",
    quantity: 0,
    weight: 220,
  },
  {
    name: "Entry Table",
    cubicFeet: 10,
    category: "Foyer",
    quantity: 0,
    weight: 50,
  },
  {
    name: "Lawn Mower, Power",
    cubicFeet: 10,
    category: "Garage",
    quantity: 0,
    weight: 80,
  },
  {
    name: "Desk, Executive",
    cubicFeet: 50,
    category: "Home Office",
    quantity: 0,
    weight: 160,
  },
  {
    name: "Refrigerator, Small",
    cubicFeet: 20,
    category: "Kitchen",
    quantity: 0,
    weight: 120,
  },
  {
    name: "Sofa, 3 Cushion",
    cubicFeet: 50,
    category: "Living/Family Room",
    quantity: 0,
    weight: 180,
  },
];
export default function Page1() {
  const [filters, setFilters] = useState({ search: "", category: "" });

  return (
    <div className="w-[90%] sm:w-[80%] lg:w-[70%] mx-auto py-5">
      <div className="flex w-full justify-between items-end">
        <Search setFilters={setFilters} />
      </div>
      <div>
        <Listing data={initialInventoryData} filters={filters} />
      </div>
    </div>
  );
}
