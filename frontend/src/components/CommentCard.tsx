import { NewsData } from "@tamaldip/common";
import React, { useState } from "react";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeComment } from "react-icons/md";
import CommentEditor from "./CommentEditor";
import timeAgo from "@/helper/timeAgo";
import { useRecoilState } from "recoil";
import { userState } from "@/store/atom";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type SingleComment = NewsData["comments"][number];

type CommentCardProps = {
  newsId: string;
  comment: SingleComment;
  onCommentAdd: (comment: SingleComment) => void;
  handleDelete: (commentId: string) => void;
};
const CommentCard = ({
  newsId,
  comment,
  onCommentAdd,
  handleDelete,
}: CommentCardProps) => {
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(
    comment.upvotedBy?.length > 0
  );
  const [isDownvoted, setIsDownvoted] = useState<boolean>(
    comment.downvotedBy?.length > 0
  );
  const [upvoteState, setUpvotesState] = useState<number>(comment.upvotes);
  const [downvoteState, setDownvoteState] = useState<number>(comment.downvotes);
  const user = useRecoilState(userState)[0];

  // console.log(comment);

  const handleUpvote = async () => {
    try {
      if (isDownvoted) {
        const downvoteResponse = await fetch(
          `http://localhost:3000/api/comments/downvote/${comment.id}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );

        if (!downvoteResponse.ok)
          throw new Error("Couldn't remove the downvote");

        setDownvoteState((prev) => prev - 1);
        setIsDownvoted(false);
      }

      const res = await fetch(
        `http://localhost:3000/api/comments/upvote/${comment.id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Upvote operation failed");

      setUpvotesState((prev) => (isUpvoted ? prev - 1 : prev + 1));
      setIsUpvoted((prev) => !prev);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `<p>${error.message}</p>`,
      });
    }
  };

  const handleDownvote = async () => {
    try {
      if (isUpvoted) {
        const upvotedResponse = await fetch(
          `http://localhost:3000/api/comments/upvote/${comment.id}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );

        if (!upvotedResponse.ok) throw new Error("Failed to remove upvote");

        setUpvotesState((prev) => prev - 1);
        setIsUpvoted(false);
      }

      const res = await fetch(
        `http://localhost:3000/api/comments/downvote/${comment.id}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Downvote operation failed");

      setDownvoteState((prev) => (isDownvoted ? prev - 1 : prev + 1));
      setIsDownvoted((prev) => !prev);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `<p>${error.message}</p>`,
      });
    }
  };

  if (!comment) {
    return <div>Loading...</div>;
  }
  if (!comment.author) {
    return <div>Author data is missing</div>;
  }

  return (
    <div className="my-5 w-full bg-white py-2 px-4 rounded-lg">
      <div className=" flex items-center gap-5 my-5">
        <img
          className="w-8 h-8 rounded-full"
          src={comment.author.photoURL}
          alt={comment.author.userName}
        />
        <h1 className="font-bold tracking-wider cursor-pointer">
          {comment.author?.userName}
        </h1>
        <p className=" font-thin text-sm">{timeAgo(comment.timePosted)}</p>
        {user.id === comment.author.id && (
          <p
            className=" font-thin text-xs text-red-700 cursor-pointer"
            onClick={() => handleDelete(comment.id)}
          >
            delete
          </p>
        )}
      </div>
      <div className=" mb-2">{comment.content}</div>
      {user && (
        <div className="flex ml-[-16px] gap-5">
          <button
            className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3"
            onClick={handleUpvote}
          >
            {isUpvoted ? (
              <BiSolidUpvote size={20} color="green" />
            ) : (
              <BiUpvote size={20} color="green" />
            )}{" "}
            {upvoteState}
          </button>
          <button
            className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3"
            onClick={handleDownvote}
          >
            {isDownvoted ? (
              <BiSolidDownvote size={20} color="red" />
            ) : (
              <BiDownvote size={20} color="red" />
            )}{" "}
            {downvoteState}
          </button>
          <button
            className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3"
            onClick={() => {
              setShowEditor(!showEditor);
            }}
          >
            <MdOutlineModeComment size={20} color="blue" />{" "}
            <span className=" underline font-bold">
              {showEditor ? "close" : "reply"}
            </span>
          </button>
          {user.id === comment.author.id && (
            <button className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3">
              <CiEdit size={20} color="blue" />{" "}
              <span className=" font-bold">Edit</span>
            </button>
          )}
        </div>
      )}
      {showEditor && (
        <CommentEditor
          newsId={newsId}
          parentId={comment.id}
          onCommentAdd={onCommentAdd}
        />
      )}
    </div>
  );
};

export default CommentCard;
