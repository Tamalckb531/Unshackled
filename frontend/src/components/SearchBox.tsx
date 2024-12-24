import useDebounce from "@/hooks/useDebounce";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

type childProps = {
  changeSearchTerm: (newSearchTerm: string) => void;
};

const SearchBox = ({ changeSearchTerm }: childProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const debouncedInput: string = useDebounce(inputValue, 500);

  useEffect(() => {
    changeSearchTerm(debouncedInput);
  }, [debouncedInput, changeSearchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <BsSearch />
      </div>
      <input
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
      />
    </div>
  );
};

export default SearchBox;
