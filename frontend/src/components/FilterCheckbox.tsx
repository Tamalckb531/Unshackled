import React, { useState } from "react";

type ChildProps = {
  changeFilter: (newFlare: string) => void;
};

const filterList = [
  { label: "Oldest", value: "old" },
  { label: "Newest", value: "new" },
  { label: "Most popular", value: "popular" },
];

const FilterCheckbox = ({ changeFilter }: ChildProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("new");

  const handleFilterChange = (filter: string) => {
    if (selectedFilter !== filter) {
      setSelectedFilter(filter);
      changeFilter(filter);
    }
  };

  return (
    <div className=" flex flex-col gap-2">
      {filterList.map((option) => (
        <div className="flex items-center" key={option.value}>
          <input
            type="checkbox"
            checked={selectedFilter === option.value}
            onChange={() => handleFilterChange(option.value)}
            className="w-4 h-4 text-blue-200 bg-gray-100 border-gray-300 rounded"
          />
          <label className="ms-2 text-lg font-normal text-gray-900">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FilterCheckbox;
