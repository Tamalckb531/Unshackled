import React from "react";
import NewsHeading from "./NewsHeading";
import NewsContent from "./NewsContent";
import NewsActionBar from "./NewsActionBar";
import NewsAuthor from "./NewsAuthor";
import NewsComment from "./NewsComment";

const SpecificNews = () => {
  return (
    <div className=" bg-slate-200 text-black p-16">
      <NewsHeading />
      <div className=" w-[85vw] flex gap-10 justify-between ml-6">
        <div className=" flex flex-col gap-5">
          <NewsContent />
          <NewsActionBar />
        </div>
        <NewsAuthor />
      </div>
      <NewsComment />
    </div>
  );
};

export default SpecificNews;
