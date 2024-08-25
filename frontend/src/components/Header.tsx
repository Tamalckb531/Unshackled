"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <h1
        className="flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3b82f6] via-[#9333ea] to-[#f472b6]">
          Unshackled
        </span>
        <div className="ml-auto flex items-center gap-4"></div>
      </h1>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <button
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
          aria-label="Toggle theme"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </button>
        <div
          className="w-fit whitespace-nowrap rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 px-2 py-1 text-xs font-medium flex items-center gap-1"
          data-v0-t="badge"
        >
          <img
            className="w-10 h-10 rounded-full"
            src="https://randomuser.me/api/portraits/women/80.jpg"
            alt="Rounded avatar"
          ></img>
        </div>
      </nav>
    </header>
  );
};

export default Header;
