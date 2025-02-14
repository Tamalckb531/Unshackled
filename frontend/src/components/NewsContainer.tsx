import { useRouter } from "next/navigation";
import React from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import DOMPurify from "dompurify";

interface News {
  id: string;
  title: string;
  content: string;
  posterImage?: string;
  flare: string;
  is_Author_Anonymous: boolean;
  postingTime: string;
  upvotes: number;
  downvotes: number;
  bookmarkCount: number;
}

const NewsContainer = ({
  id,
  title,
  content,
  posterImage,
  flare,
  is_Author_Anonymous,
  postingTime,
  upvotes,
  downvotes,
  bookmarkCount,
}: News) => {
  const router = useRouter();
  const sanitizedContent = DOMPurify.sanitize(content.slice(0, 200)) + "....";

  return (
    <div
      className="max-w-sm max-h-md bg-white border border-gray-200 rounded-lg shadow-sm h-[52vh] cursor-pointer"
      onClick={() => {
        router.push(`/newsfeed/${id}`);
      }}
    >
      <img
        className="rounded-t-lg object-cover h-[20vh] w-full"
        src={posterImage}
        alt={title}
      />
      <div className="h-[32vh] p-3 flex flex-col justify-between items-center">
        <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 w-full">
          {title}
        </h5>
        <div
          className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-full"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <div className="flex justify-around gap-5 w-full">
          <span className=" flex items-center gap-3 bg-slate-300 rounded py-1 px-6">
            <BiUpvote /> {upvotes}
          </span>
          <span className="flex items-center gap-3 bg-slate-300 rounded  py-1 px-6">
            <BiDownvote /> {downvotes}
          </span>
          <span className=" flex items-center gap-3 bg-slate-300 rounded  py-1 px-6">
            <CiBookmark /> {bookmarkCount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
