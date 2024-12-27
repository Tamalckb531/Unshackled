import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";

const NewsActionBar = () => {
  return (
    <div className="flex ml-[-16px] gap-5">
      <button className=" flex gap-2 text-xl items-center justify-center text-black bg-slate-200 rounded-xl p-3">
        <BiUpvote size={30} color="green" /> 25
      </button>
      <button className=" flex gap-2 text-xl items-center justify-center text-black bg-slate-200 rounded-xl p-3">
        <BiDownvote size={30} color="red" /> (10)
      </button>
      <button className=" flex gap-2 text-xl items-center justify-center text-black bg-slate-200 rounded-xl p-3">
        <CiBookmark size={30} color="blue" /> (5)
      </button>
    </div>
  );
};

export default NewsActionBar;
