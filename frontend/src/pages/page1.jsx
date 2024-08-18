import React from "react";
import Search from "../components/search";
import AddCustomItemForm from "../components/AddCustomItemForm";
import Listing from "../components/listing";

export default function Page1() {
  return (
    <div className="w-[90%] sm:w-[80%] lg:w-[70%] mx-auto py-5">
      <div className="flex justify-between items-end">
        <Search />
        <AddCustomItemForm />
      </div>
      <div>
        <Listing />
      </div>
    </div>
  );
}
