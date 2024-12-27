import React from "react";
import CommentCard from "./CommentCard";

const NewsComment = () => {
  return (
    <div className=" ml-5 mt-16 w-[60vw]">
      {/* comments writing area  */}
      <div>
        <label className="block mb-5 text-lg font-medium text-gray-900 ">
          <span className=" underline text-xl mr-2 italic">Comments</span> (25)
        </label>
        <textarea
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 "
          placeholder="Write your thoughts here..."
        ></textarea>
        <button className=" bg-blue-600 rounded-lg mt-2 p-2 text-lg text-white">
          Send
        </button>
      </div>
      {/* comments fetching area  */}
      <CommentCard />
    </div>
  );
};

export default NewsComment;
