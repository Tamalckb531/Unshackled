import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineFeaturedPlayList } from "react-icons/md";

const NewsAuthor = () => {
  return (
    <div className=" mt-2">
      <div className="w-[14vw] border border-slate-500 p-5 rounded-2xl">
        <h1 className="text-lg font-bold text-center mb-5">Author </h1>
        <div className=" flex flex-col items-center justify-center my-4 gap-1">
          <img
            className="w-10 h-10 rounded-full"
            src="https://avatars.githubusercontent.com/u/72490279"
            alt="Rounded avatar"
          />
          <h2 className=" text-nowrap text-lg">Animesh Mitra</h2>
          <h3 className=" text-sm font-thin cursor-pointer">@animeshM123</h3>
        </div>
        <p className=" font-light text-sm ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic nulla
        </p>
      </div>
      <div className=" flex flex-col gap-2 mt-20 ml-7 text-lg cursor-pointer">
        <h1 className="text-lg font-bold mb-6">Action </h1>
        <p className=" flex items-center gap-2 text-emerald-700">
          <MdOutlineFeaturedPlayList size={25} /> Feature this post
        </p>
        <p className=" flex items-center gap-2 text-blue-700">
          <CiEdit size={25} /> Edit this post
        </p>
        <p className=" flex items-center gap-2 text-red-500">
          <MdDeleteOutline size={25} /> Delete this post
        </p>
      </div>
    </div>
  );
};

export default NewsAuthor;
