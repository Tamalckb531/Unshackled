"use client";
import React, { useEffect, useState } from "react";
import NewsHeading from "./NewsHeading";
import NewsContent from "./NewsContent";
import NewsActionBar from "./NewsActionBar";
import NewsAuthor from "./NewsAuthor";
import NewsComment from "./NewsComment";
import { useParams } from "next/navigation";
import { userState } from "@/store/atom";
import { useRecoilState } from "recoil";
import { NewsData } from "@tamaldip/common";

const SpecificNews = () => {
  const { slug } = useParams();
  const [data, setData] = useState<NewsData | null>(null);
  const [isUserUpvoted, setIsUserUpvoted] = useState<boolean>(false);
  const [isUserDownvoted, setIsUserDownvoted] = useState<boolean>(false);
  const [isUserBookmarked, setIsUserBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const user = useRecoilState(userState)[0];

  if (!slug) return <p>Loading....</p>;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/news/posts/${slug}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch news");

        const data = await res.json();
        setData(data);
        setIsUserUpvoted(data.upvotedBy?.length > 0);
        setIsUserDownvoted(data.downvotedBy?.length > 0);
        setIsUserBookmarked(data.bookmarkedBy?.length > 0);
      } catch (error: any) {
        console.error("Error fetching news: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchNews();
  }, [slug, user]);

  if (loading) return <p>Loading.....</p>;
  if (!data) return <p>News don't exist!</p>;

  return (
    <div className=" bg-slate-200 text-black p-16">
      <NewsHeading
        posterImage={data.posterImage || ""}
        title={data.title || ""}
        authorName={data.author.firstName || ""}
        flare={data.flare || ""}
        is_Author_Anonymous={data.is_Author_Anonymous || false}
        postingTime={data.postingTime || ""}
      />
      <div className=" w-[85vw] flex gap-10 justify-between ml-6">
        <div className=" flex flex-col gap-5">
          <NewsContent content={data.content || ""} />
          <NewsActionBar
            newsId={data.id}
            upvotes={data.upvotes}
            downvotes={data.downvotes}
            bookmarkCount={data.bookmarkCount}
            isUserUpvoted={isUserUpvoted}
            isUserDownvoted={isUserDownvoted}
            isUserBookmarked={isUserBookmarked}
          />
          <NewsComment id={data.id} comments={data.comments} />
        </div>
        <NewsAuthor
          id={data.author.id}
          firstName={data.author.firstName}
          lastName={data.author.lastName}
          userName={data.author.userName}
          photoUrl={data.author.photoURL || ""}
          bio={data.author.bio}
          email={data.author.email}
          is_Author_Anonymous={data.is_Author_Anonymous}
        />
      </div>
    </div>
  );
};

export default SpecificNews;
