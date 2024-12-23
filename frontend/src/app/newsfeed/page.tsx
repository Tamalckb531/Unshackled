"use client";

import FilterCheckbox from "@/components/FilterCheckbox";
import FlareDropdown from "@/components/FlareDropdown";
import NewsCard from "@/components/NewsCard";
import SearchBox from "@/components/SearchBox";
import React, { useEffect, useState } from "react";

const page = () => {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/news/posts");
        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        setNews(data.news);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchNews();
  }, []);

  console.log(news);

  return (
    <div className=" w-full h-full bg-white text-black p-10">
      <h1 className=" flex items-center justify-center text-4xl font-[200] tracking-wide italic mb-5">
        Suggesting news according to your preference
      </h1>
      <div className="flex flex-1 shadow-lg p-2">
        <div className="flex flex-col gap-4 w-[70%]">
          {news.length > 0 ? (
            news.map((newsItem) => (
              <NewsCard key={newsItem.id} data={newsItem} />
            ))
          ) : (
            <p>No new available</p>
          )}
        </div>
        <div className="filter flex flex-col flex-1 items-center p-5 gap-5 fixed right-16">
          <div className="search w-[270px]">
            <h1 className=" text-lg mb-2">Search</h1>
            <SearchBox />
          </div>
          <div className="flare w-[270px] mt-3">
            <FlareDropdown />
          </div>
          <div className="time w-[270px]">
            <h1 className=" text-lg mb-2">Filter</h1>
            <FilterCheckbox />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
