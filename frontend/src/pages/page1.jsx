import React, { useState } from "react";
import Search from "../components/search";
import Listing from "../components/listing";

export default function Page1() {
  const [filters, setFilters] = useState({ search: "", category: "" });

  return (
    <div className="w-[90%] sm:w-[80%] lg:w-[70%] mx-auto py-5">
      <div className="flex w-full justify-between items-end">
        <Search setFilters={setFilters} />
      </div>
      <div>
        <Listing filters={filters} />
      </div>
    </div>
  );
}
