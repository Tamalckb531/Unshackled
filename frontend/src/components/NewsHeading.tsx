import timeAgo from "@/helper/timeAgo";
import React from "react";

interface Heading {
  posterImage: string;
  title: string;
  authorName: string;
  flare: string;
  is_Author_Anonymous: boolean;
  postingTime: string;
}

const NewsHeading = ({
  title,
  authorName,
  flare,
  is_Author_Anonymous,
  posterImage,
  postingTime,
}: Heading) => {
  return (
    <div className=" flex flex-col gap-12 mb-12">
      {/* news image  */}
      <div className="flex items-center justify-center w-full h-[40vh] overflow-hidden rounded-lg">
        <img
          src={posterImage}
          className="w-[70vw] h-full rounded-2xl object-cover"
          alt={title}
        />
      </div>

      {/* news heading content  */}
      <div className=" ml-6">
        <h1 className=" text-4xl mb-2 font-bold tracking-wide">{title}</h1>
        <p className=" text-sm text-slate-400 tracking-wider">
          Written by{" "}
          <span className=" text-purple-400 italic font-semibold">
            {is_Author_Anonymous ? "Anonymous" : authorName}
          </span>{" "}
          on{" "}
          <span className=" text-purple-400 italic font-semibold">{flare}</span>{" "}
          <span className=" ml-12 text-base italic">
            {timeAgo(postingTime)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default NewsHeading;
