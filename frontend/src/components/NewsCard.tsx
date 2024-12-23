import timeAgo from "@/helper/timeAgo";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";

interface Author {
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string;
}

interface NewsData {
  id: string;
  title: string;
  content: string;
  posterImage: string;
  flare: string;
  is_Author_Anonymous: boolean;
  postingTime: string;
  upvotes: number;
  downvotes: number;
  bookmarkCount: number;
  authorId: string;
  author: Author;
  comments: any[];
  _count: {
    comments: number;
  };
}

const NewsCard = ({ data }: { data: NewsData }) => {
  return (
    <div className="flex w-full h-[270px] items-center rounded-lg hover:bg-gray-100 ">
      <img
        className="min-w-[40%] max-w-[40%] h-full rounded-lg object-cover"
        src={data.posterImage}
        alt={data.title}
      />
      <div className="flex flex-col h-[270px] items-start justify-between px-4 py-1">
        <h1 className="text-3xl font-bold tracking-wide text-gray-900 ">
          {data.title}
        </h1>
        <h2 className=" text-xs text-gray-400">
          Written by{" "}
          <span className=" italic text-sky-700">{data.author.firstName}</span>{" "}
          on <span className=" italic text-sky-700">{data.flare}</span>{" "}
          <span className=" italic ml-5">{timeAgo(data.postingTime)}</span>
        </h2>
        <p className="mb-3 font-light text-sm text-gray-700 ">
          {data.content.slice(0, 250)}
          ...........
        </p>
        <p className=" mb-3 text-sm text-blue-700 underline cursor-pointer">
          read more
        </p>
        <div className="flex justify-around gap-16">
          <span className=" flex items-center gap-3 bg-slate-300 rounded py-1 px-6">
            <BiUpvote /> {data.upvotes}
          </span>
          <span className="flex items-center gap-3 bg-slate-300 rounded  py-1 px-6">
            <BiDownvote /> {data.downvotes}
          </span>
          <span className=" flex items-center gap-3 bg-slate-300 rounded  py-1 px-6">
            <CiBookmark /> {data.bookmarkCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
