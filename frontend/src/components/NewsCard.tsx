import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";

const NewsCard = () => {
  return (
    <div className="flex w-full h-[270px] items-center rounded-lg hover:bg-gray-100 ">
      <img
        className="w-[40%] h-full rounded-lg "
        src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmV3c3xlbnwwfHwwfHx8MA%3D%3D"
        alt=""
      />
      <div className="flex flex-col h-[270px] items-start justify-between px-4 py-1">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900 ">
          Lorem ipsum dolor sit amet consectetur adipisicing.
        </h1>
        <h2 className=" text-xs text-gray-400">
          Written by <span className=" italic text-sky-700">john</span> on{" "}
          <span className=" italic text-sky-700">sports</span>{" "}
          <span className=" italic ml-5">3 hours ago</span>
        </h2>
        <p className="mb-3 font-light text-sm text-gray-700 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla illum
          rerum ex explicabo aut aliquam nihil, iure natus, est aliquid omnis
          numquam! Tempore nobis doloribus, velit quaerat quas dolorum qui
          nulla. Ipsa quae, eum quibusdam deleniti illo fugit voluptatibus sint!
          ...........
        </p>
        <p className=" mb-3 text-sm text-blue-700 underline cursor-pointer">
          read more
        </p>
        <div className="flex justify-around gap-16">
          <span className=" flex items-center gap-3 bg-slate-300 rounded py-1 px-6">
            <BiUpvote /> 5
          </span>
          <span className="flex items-center gap-3 bg-slate-300 rounded  py-1 px-6">
            <BiDownvote /> 5
          </span>
          <span className=" flex items-center gap-3 bg-slate-300 rounded  py-1 px-6">
            <CiBookmark /> 5
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
