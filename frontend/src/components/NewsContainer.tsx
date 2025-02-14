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
  const sanitizedContent = DOMPurify.sanitize(content.slice(0, 250));

  return (
    <div
      className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm h-full cursor-pointer"
      onClick={() => {
        router.push(`/newsfeed/${id}`);
      }}
    >
      <img
        className="rounded-t-lg object-cover h-[20vh]"
        src={posterImage}
        alt={title}
      />
      <div className="p-5">
        <p>
          <h5 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </p>
        <div
          className="mb-6 font-normal text-gray-700 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        <div className="flex justify-around gap-10">
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
