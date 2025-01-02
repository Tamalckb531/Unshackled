import React, { useState } from "react";
import CommentCard from "./CommentCard";
import { CommentBodyTypes, NewsData } from "@tamaldip/common";
import CommentEditor from "./CommentEditor";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

type NewsWithComments = Pick<NewsData, "id" | "comments">;

//? this is array of comment -> needs to store all the comment to fetch
type AllCommentsProps = NewsData["comments"];

//? This is just a single comment -> needs to get the new comment from editor
type SingleComment = AllCommentsProps[number];

const NewsComment = ({ id, comments }: NewsWithComments) => {
  const [allComment, setAllComment] = useState<AllCommentsProps>(comments);
  const [collapsedComments, setCollapsedComments] = useState<
    Record<string, boolean>
  >({});

  //? Steps -> check if newComment a reply -> add this into it's parent reply section with other replies -> get all other comment from prev -> all together create a updatedComments -> add the updatedComments  with newComment inside the state -> just add the prev with newComment if newComment a top order comment

  const handleAllCommentState = (newComment: SingleComment) => {
    setAllComment((prev) => {
      //? handle reply
      if (newComment.parent) {
        //? store updated state where newsComment insider replies
        const updatedComments = prev.map((comment) => {
          if (comment.id === newComment.parent!.id) {
            return {
              ...comment,
              replies: comment.replies
                ? [...comment.replies, newComment]
                : [newComment], //? storing replies in parent with other replies
            };
          }
          return comment; //? return other comments
        });

        //? adding newComment in top order
        return [...updatedComments, newComment];
      }

      //? handle top order
      return [newComment, ...prev];
    });
  };

  const toggleCollapse = (commentId: string) => {
    setCollapsedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // Toggle only the specific comment
    }));
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
                collapsedComments,
                toggleCollapse,
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
  collapsedComments: Record<string, boolean>;
  toggleCollapse: (commentId: string) => void;
};

const renderCommentCard = ({
  comment,
  id,
  handleAllCommentState,
  allComment,
  collapsedComments,
  toggleCollapse,
}: CommentCardProps) => {
  const isCollapsed = collapsedComments[comment.id] || false;
  let ReplySection = null;

  if (!isCollapsed && comment.replies && comment.replies.length > 0) {
    ReplySection = comment.replies.map((rep) => {
      const replyComment: SingleComment =
        allComment.find((cmt) => cmt.id === rep.id) || ({} as SingleComment);

      return renderCommentCard({
        comment: replyComment,
        id,
        handleAllCommentState,
        allComment,
        collapsedComments,
        toggleCollapse,
      });
    });
  }

  return (
    <div key={comment.id} className="pl-6 ">
      <div className="flex items-center space-x-1 -mb-6">
        {comment.replies.length > 0 && (
          <button
            onClick={() => toggleCollapse(comment.id)}
            className=" text-gray-500 hover:text-black items-center"
          >
            {isCollapsed ? (
              <CiCirclePlus size={25} />
            ) : (
              <CiCircleMinus size={25} />
            )}
          </button>
        )}
        <CommentCard
          key={comment.id}
          newsId={id}
          comment={comment}
          onCommentAdd={handleAllCommentState}
        />
      </div>

      <div className=" pl-8 mt-2"> {ReplySection}</div>
    </div>
  );
};
