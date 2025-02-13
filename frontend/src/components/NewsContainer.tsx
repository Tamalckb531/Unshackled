import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";

const NewsContainer = () => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm h-full">
      <img
        className="rounded-t-lg object-cover h-[15vh]"
        src="https://loremflickr.com/2272/223?lock=6176318523910789"
        alt=""
      />
      <div className="p-5">
        <p>
          <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
            Noteworthy technology acquisitions 2021
          </h5>
        </p>
        <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order......
        </p>
        <div className="flex justify-around gap-10">
          <span className=" flex items-center gap-3 bg-slate-300 rounded py-1 px-6">
            <BiUpvote /> 12
          </span>
          <span className="flex items-center gap-3 bg-slate-300 rounded  py-1 px-6">
            <BiDownvote /> 3
          </span>
          <span className=" flex items-center gap-3 bg-slate-300 rounded  py-1 px-6">
            <CiBookmark /> 5
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
