import React from "react";

const FilterCheckbox = () => {
  return (
    <div className=" flex flex-col gap-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-200 bg-gray-100 border-gray-300 rounded f"
        />
        <label className="ms-2 text-lg font-normal text-gray-900 ">
          Oldest
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-200 bg-gray-100 border-gray-300 rounded f"
        />
        <label className="ms-2 text-lg font-normal text-gray-900 ">
          Newest
        </label>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          value=""
          className="w-4 h-4 text-blue-200 bg-gray-100 border-gray-300 rounded f"
        />
        <label className="ms-2 text-lg font-normal text-gray-900 ">
          Most popular
        </label>
      </div>
    </div>
  );
};

export default FilterCheckbox;
