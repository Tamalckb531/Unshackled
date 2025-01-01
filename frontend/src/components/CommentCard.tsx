import { NewsData } from "@tamaldip/common";
import React, { useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeComment } from "react-icons/md";
import CommentEditor from "./CommentEditor";
import timeAgo from "@/helper/timeAgo";

type SingleComment = NewsData["comments"][number];

type CommentCardProps = {
  id: string;
  comment: SingleComment;
};
const CommentCard = ({ id, comment }: CommentCardProps) => {
  const [showEditor, setShowEditor] = useState<boolean>(true);

  if (!comment) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-5 bg-white py-2 px-4 rounded-lg">
      <div className=" flex items-center gap-5 my-5">
        <img
          className="w-8 h-8 rounded-full"
          src={comment.author.photoURL}
          alt={comment.author.userName}
        />
        <h1 className="font-bold tracking-wider cursor-pointer">
          {comment.author.userName}
        </h1>
        <p className=" font-thin text-sm">{timeAgo(comment.timePosted)}</p>
        <p className=" font-thin text-xs text-red-700 cursor-pointer">delete</p>
      </div>
      <div className=" mb-2">{comment.content}</div>
      <div className="flex ml-[-16px] gap-5">
        <button className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3">
          <BiUpvote size={20} color="green" /> {comment.upvotes}
        </button>
        <button className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3">
          <BiDownvote size={20} color="red" /> {comment.downvotes}
        </button>
        <button className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3">
          <MdOutlineModeComment size={20} color="blue" />{" "}
          <span className=" underline font-bold">reply</span>
        </button>
        <button className=" flex gap-2 text-sm items-center justify-center text-black  rounded-xl p-3">
          <CiEdit size={20} color="blue" />{" "}
          <span className=" font-bold">Edit</span>
        </button>
      </div>
      {/* {showEditor && (
        <CommentEditor
          newsId={comment?.id}
          parentId={comment?.replies[0].id}
          onCommentAdd={hsjkhds}
        />
      )} */}
    </div>
  );
};

export default CommentCard;
