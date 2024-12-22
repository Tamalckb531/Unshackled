import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBox = () => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <BsSearch />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
      />
    </div>
  );
};

export default SearchBox;
