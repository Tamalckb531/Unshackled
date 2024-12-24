"use client";
import { log } from "console";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type childProps = {
  changeFlare: (newFlare: string) => void;
};

const FlareDropdown = ({ changeFlare }: childProps) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const [flares, setFlares] = useState<string[]>([]);

  useEffect(() => {
    const fetchFlare = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/news/posts/flares"
        );
        const data = await response.json();
        setFlares(data.flares);
      } catch (error: any) {
        console.log(error);
      }
    };
    if (toggle) {
      fetchFlare();
    }
  }, [toggle]);

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
            {flares.map((flare) => (
              <li
                key={flare}
                className="block px-4 py-2"
                onClick={() => changeFlare(flare)}
              >
                {flare}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlareDropdown;
