"use client";
import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FlareDropdown = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <div>
      <button
        className="w-full text-white bg-gray-400 font-medium rounded-lg text-xl px-5 py-2.5 text-center inline-flex items-center justify-center gap-3 "
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        flare
        {toggle ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {toggle && (
        <div className="z-10 w-full bg-slate-50 divide-y divide-gray-100 rounded-lg shadow">
          <ul className="py-2 text-lg text-gray-700 cursor-pointer ">
            <li className="block px-4 py-2 ">Sports</li>
            <li className="block px-4 py-2 ">Crime</li>
            <li className="block px-4 py-2 ">Business</li>
            <li className="block px-4 py-2 ">Social</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlareDropdown;
