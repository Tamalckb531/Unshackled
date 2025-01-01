import React, { useState } from "react";
import CommentCard from "./CommentCard";
import { NewsData } from "@tamaldip/common";
import CommentEditor from "./CommentEditor";

type NewsWithComments = Pick<NewsData, "id" | "comments">;

//? this is array of comment -> needs to store all the comment to fetch
type AllCommentsProps = NewsData["comments"];

//? This is just a single comment -> needs to get the new comment from editor
type SingleComment = AllCommentsProps[number];

const NewsComment = ({ id, comments }: NewsWithComments) => {
  const [allComment, setAllComment] = useState<AllCommentsProps>(comments);

  const handleAllCommentState = (newComment: SingleComment) => {
    setAllComment((prev) => [newComment, ...prev]);
  };

  return (
    <div className=" ml-5 mt-16 w-[60vw]">
      {/* comments writing area  */}
      <label className="block mb-5 text-lg font-medium text-gray-900 ">
        <span className=" underline text-xl mr-2 italic">Comments</span>{" "}
        {allComment.length}
      </label>
      <CommentEditor newsId={id} onCommentAdd={handleAllCommentState} />
      {/* comments fetching area  */}
      <div>
        {allComment.length > 0 ? (
          allComment.map((comment) => (
            <CommentCard key={comment.id} id={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500 mt-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default NewsComment;
