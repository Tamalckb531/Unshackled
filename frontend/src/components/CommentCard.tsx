import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { MdOutlineModeComment } from "react-icons/md";

const CommentCard = () => {
  return (
    <div className="my-5 bg-white py-2 px-4 rounded-lg">
      <div className=" flex items-center gap-5 my-5">
        <img
          className="w-8 h-8 rounded-full"
          src="https://avatars.githubusercontent.com/u/72490279"
          alt="Rounded avatar"
        />
        <h1 className="font-bold tracking-wider cursor-pointer">Madhobi</h1>
        <p className=" font-thin text-sm">2 hours ago</p>
        <p className=" font-thin text-xs text-red-700 cursor-pointer">delete</p>
      </div>
      <div className=" mb-2">
        {" "}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est amet
        necessitatibus optio minima, aspernatur in veniam sequi iusto laborum
        recusandae.
      </div>
      <div className="flex ml-[-16px] gap-5">
        <button className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3">
          <BiUpvote size={20} color="green" /> 25
        </button>
        <button className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3">
          <BiDownvote size={20} color="red" /> (10)
        </button>
        <button className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3">
          <MdOutlineModeComment size={20} color="blue" />{" "}
          <span className=" underline font-bold">reply</span>
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
