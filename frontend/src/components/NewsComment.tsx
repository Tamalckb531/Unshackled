import React, { useState } from "react";
import CommentCard from "./CommentCard";
import { CommentBodyTypes, NewsData } from "@tamaldip/common";
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
          allComment.map((comment) => {
            if (!comment.parent) {
              return renderCommentCard({
                comment,
                id,
                handleAllCommentState,
                allComment,
              });
            }
          })
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

type CommentCardProps = {
  id: string;
  comment: SingleComment;
  handleAllCommentState: (comment: SingleComment) => void;
  allComment: AllCommentsProps;
};

const renderCommentCard = ({
  comment,
  id,
  handleAllCommentState,
  allComment,
}: CommentCardProps) => {
  let ReplySection = null;

  if (comment.replies && comment.replies.length > 0) {
    ReplySection = comment.replies.map((rep) => {
      const replyComment: SingleComment =
        allComment.find((cmt) => cmt.id === rep.id) || ({} as SingleComment);

      return renderCommentCard({
        comment: replyComment,
        id,
        handleAllCommentState,
        allComment,
      });
    });
  }

  return (
    <div key={comment.id}>
      <CommentCard
        key={comment.id}
        newsId={id}
        comment={comment}
        onCommentAdd={handleAllCommentState}
      />
      <div className=" pl-8"> {ReplySection}</div>
    </div>
  );
};
