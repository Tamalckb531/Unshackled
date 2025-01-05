import { userState } from "@/store/atom";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  BiDownvote,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { useRecoilState } from "recoil";
import Swal from "sweetalert2";

interface NewsAction {
  newsId: string;
  upvotes: number;
  downvotes: number;
  bookmarkCount: number;
  isUserUpvoted: boolean;
  isUserDownvoted: boolean;
  isUserBookmarked: boolean;
}

const NewsActionBar = ({
  newsId,
  upvotes,
  downvotes,
  bookmarkCount,
  isUserUpvoted,
  isUserDownvoted,
  isUserBookmarked,
}: NewsAction) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(isUserBookmarked);
  const [isUpvoted, setIsUpvote] = useState<boolean>(isUserUpvoted);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(isUserDownvoted);
  const [bookmarkCountState, setBookmarkCountState] =
    useState<number>(bookmarkCount);
  const [upvotesState, setUpvotesState] = useState<number>(upvotes);
  const [downvotesState, setDownvotesState] = useState<number>(downvotes);

  const user = useRecoilState(userState)[0];
  console.log(user);

  const router = useRouter();

  const goToSignIn = (param: string) => {
    Swal.fire({
      title: `You have to log in for ${param}`,
      showCancelButton: true,
      confirmButtonText: "Log-in",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/login");
      }
    });
  };

  const handleUpvote = async () => {
    if (!user) {
      goToSignIn("upvote");
      return;
    }
    try {
      if (isDownvoted) {
        const downvoteRes = await fetch(
          `http://localhost:3000/api/news/posts/downvote/${newsId}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );

        if (!downvoteRes.ok) throw new Error("Failed to remove downvote");

        setDownvotesState((prev) => prev - 1);
        setIsDownvoted(false);
      }

      const res = await fetch(
        `http://localhost:3000/api/news/posts/upvote/${newsId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to toggle upvote");

      setUpvotesState((prev) => (isUpvoted ? prev - 1 : prev + 1));
      setIsUpvote((prev) => !prev);
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
    if (!user) {
      goToSignIn("downvote");
      return;
    }
    try {
      if (isUpvoted) {
        const upvoteRes = await fetch(
          `http://localhost:3000/api/news/posts/upvote/${newsId}`,
          {
            method: "PUT",
            credentials: "include",
          }
        );

        if (!upvoteRes.ok) throw new Error("Failed to remove downvote");

        setUpvotesState((prev) => prev - 1);
        setIsUpvote(false);
      }

      const res = await fetch(
        `http://localhost:3000/api/news/posts/downvote/${newsId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to toggle downvote");

      setDownvotesState((prev) => (isDownvoted ? prev - 1 : prev + 1));
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

  const handleBookmarked = async () => {
    if (!user) {
      goToSignIn("bookmark");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/api/news/posts/bookmark/${newsId}`,
        {
          method: "PUT",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to toggle bookmark");

      setBookmarkCountState((prev) => (isBookmarked ? prev - 1 : prev + 1));
      setIsBookmarked((prev) => !prev);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `<p>${error.message}</p>`,
      });
    }
  };

  return (
    <div className="flex ml-[-16px] gap-5">
      {/*//? upvote */}
      <button
        className=" flex gap-2 text-xl items-center justify-center text-black bg-slate-200 rounded-xl p-3"
        onClick={handleUpvote}
      >
        {isUpvoted ? (
          <BiSolidUpvote size={30} color="green" />
        ) : (
          <BiUpvote size={30} color="green" />
        )}{" "}
        {upvotesState}
      </button>

      {/*//? downvote  */}
      <button
        className=" flex gap-2 text-xl items-center justify-center text-black bg-slate-200 rounded-xl p-3"
        onClick={handleDownvote}
      >
        {isDownvoted ? (
          <BiSolidDownvote size={30} color="red" />
        ) : (
          <BiDownvote size={30} color="red" />
        )}{" "}
        {downvotesState}
      </button>

      {/*//? bookmark */}
      <button
        className=" flex gap-2 text-xl items-center justify-center text-black bg-slate-200 rounded-xl p-3"
        onClick={handleBookmarked}
      >
        {isBookmarked ? (
          <FaBookmark size={30} color="blue" />
        ) : (
          <CiBookmark size={30} color="blue" />
        )}{" "}
        {bookmarkCountState}
      </button>
    </div>
  );
};

export default NewsActionBar;
